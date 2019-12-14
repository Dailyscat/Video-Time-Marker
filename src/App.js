import React, { Component } from "react";
import "./App.css";
import { Header, SettingPage } from "./components";
import { PostContainer } from "./containers";
import chromeService from "./services/chromeService";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      defaultFolder: {
        folderName: "Youtube Time Marker",
        folderId: "top",
        children: [],
        newTabOpen: true
      },
      folder: {
        category: "folder",
        id: Date.now(),
        name: "New Folder",
        children: [],
        open: false
      },
      file: {
        category: "file",
        id: null,
        name: null,
        url: null
      },
      currentTime: 0,
      selectedFolderId: "top",
      inYoutube: false,
      category: null,
      videoId: null,
      settingPageOpen: false,
      filteredArr: [],
      addView: true,
      currentAddThing: null,
      searchInputValForState: ""
    };

    chromeService.initialDB(result => {
      if (result === 0) {
        chromeService.set(this.state.defaultFolder);
      }
      chromeService.get(result => {
        this.setState({
          defaultFolder: {
            ...this.state.defaultFolder,
            folderName: result.folderName,
            children: result.children,
            newTabOpen: result.newTabOpen
          }
        });
      });
    });

    chromeService.currentTime(result => {
      if (result) {
        this.setState({
          currentTime: result[0]
        });
      }
    });

    chromeService.videoId(result => {
      if (result[0]) {
        this.setState({
          videoId: result[0],
          inYoutube: true
        });
      }
    });

    chromeService.get(result => {
      function closeFolder(result) {
        if (result.children) {
          result.children.map((currentVal, idx, arr) => {
            if (currentVal.category === "folder") {
              currentVal.open = false;
              if (currentVal.children.length > 0) {
                closeFolder.call(this, currentVal);
              } else {
                return;
              }
            } else {
              return "";
            }
          });
        }
      }
      closeFolder(result);
      this.setState({
        defaultFolder: {
          ...this.state.defaultFolder,
          children: result.children
        }
      });
      chromeService.set({ children: result.children });
    });
  }

  componentDidMount() {
    chromeService.onLoadHandler((tabId, changeInfo, tab) => {
      if (changeInfo.status === "loading") {
        window.close();
      }
    });
  }

  receiveEditedName(editedName, currentId) {
    chromeService.get(result => {
      if (currentId === "top") {
        result.folderName = editedName;
      } else {
        function findFile(result) {
          result.children.map((currentVal, idx, arr) => {
            if (Number(currentId) === currentVal.id) {
              currentVal.name = editedName;
              return;
            } else {
              if (currentVal.category === "folder") {
                if (currentVal.children.length > 0) {
                  findFile.call(this, currentVal);
                } else {
                  return "";
                }
              } else {
                return "";
              }
            }
          });
        }
        findFile.call(this, result);
      }
      this.setState({
        defaultFolder: {
          ...this.state.defaultFolder,
          folderName: result.folderName,
          children: result.children
        }
      });
      chromeService.set({
        folderName: result.folderName,
        children: result.children
      });
    });
  }

  selectedFolder(folderId) {
    this.setState({
      selectedFolderId: folderId
    });
  }

  addFolder(selectedFolderId) {
    chromeService.get(result => {
      const folderCopy = Object.assign({}, this.state.folder);
      if (selectedFolderId === "top") {
        folderCopy.id = Date.now();
        result.children.push(folderCopy);
      } else {
        function makeDownFolder(result) {
          result.children.map((currentVal, idx, arr) => {
            if (currentVal.category === "folder") {
              if (Number(selectedFolderId) === currentVal.id) {
                folderCopy.id = Date.now();
                currentVal.children.push(folderCopy);
                currentVal.open = true;
                return;
              } else {
                if (currentVal.children.length > 0) {
                  makeDownFolder.call(this, currentVal);
                } else {
                  return "";
                }
              }
            } else {
              return "";
            }
          });
        }
        makeDownFolder.call(this, result);
      }
      this.setState({
        defaultFolder: {
          ...this.state.defaultFolder,
          children: result.children
        },
        currentAddThing: folderCopy.id
      });

      chromeService.set({ children: result.children }, () => {
        if (!this.state.addView)
          this.searchInputVal(this.state.searchInputValForState);
      });
    });
  }

  setTimeMarker(name) {
    var currentFolderId = this.state.selectedFolderId;

    chromeService.get(result => {
      const fileCopy = Object.assign({}, this.state.file);
      fileCopy.id = Date.now();
      fileCopy.name = name;
      fileCopy.url =
        `https://youtu.be/` +
        this.state.videoId +
        `?t=` +
        this.state.currentTime;
      if (currentFolderId === "top") {
        result.children.push(fileCopy);
      } else {
        function makeDownFile(result) {
          result.children.map((currentVal, idx, arr) => {
            if (currentVal.category === "folder") {
              if (Number(this.state.selectedFolderId) === currentVal.id) {
                currentVal.children.push(fileCopy);
                currentVal.open = true;
                return;
              } else {
                if (currentVal.children.length > 0) {
                  makeDownFile.call(this, currentVal);
                } else {
                  return "";
                }
              }
            } else {
              return "";
            }
          });
        }
        makeDownFile.call(this, result);
      }
      chromeService.set({ children: result.children });
      this.setState({
        defaultFolder: {
          ...this.state.defaultFolder,
          children: result.children
        },
        currentAddThing: fileCopy.id
      });
    });
  }

  delete(currentId) {
    chromeService.get(result => {
      var deleteParentFolder;
      function deleteChildren(result) {
        result.children.map((currentVal, idx, arr) => {
          if (Number(currentId) === currentVal.id) {
            if (result.folderId) {
              deleteParentFolder = result.folderId;
            } else {
              deleteParentFolder = result.id;
            }
            arr.splice(idx, 1);
            return;
          } else {
            if (currentVal.category === "folder") {
              if (currentVal.children.length > 0) {
                deleteChildren.call(this, currentVal);
              } else {
                return "";
              }
            } else {
              return "";
            }
          }
        });
      }
      deleteChildren.call(this, result);
      this.setState({
        defaultFolder: {
          ...this.state.defaultFolder,
          children: result.children
        },
        selectedFolderId: deleteParentFolder
      });

      chromeService.set({ children: result.children }, () => {
        if (!this.state.addView)
          this.searchInputVal(this.state.searchInputValForState);
      });
    });
  }

  openSettingPage(settingBtn) {
    settingBtn.parentElement.nextElementSibling.classList.toggle("none");
    settingBtn.parentElement.nextElementSibling.nextElementSibling.classList.toggle(
      "none"
    );
  }

  userSetting(judge) {
    chromeService.set({ newTabOpen: judge });
    this.setState({
      defaultFolder: {
        ...this.state.defaultFolder,
        newTabOpen: judge
      }
    });
  }

  moveToUrl(url) {
    chromeService.get(result => {
      if (result.newTabOpen) {
        chromeService.newTab({ url: url });
      } else {
        chromeService.currentTab({ url: url });
      }
    });
  }

  changeView(bool) {
    this.setState({
      addView: bool
    });
  }

  searchInputVal(value) {
    var filteredArr = [];
    if (value !== "") {
      chromeService.get(result => {
        function find(result) {
          result.children.map((currentVal, idx, arr) => {
            var initName = currentVal.name.toLowerCase();
            if (initName.indexOf(value.toLowerCase()) > -1) {
              filteredArr.push(currentVal);
              if (currentVal.children) {
                if (currentVal.children.length > 0) {
                  find(currentVal);
                }
              }
            } else {
              if (currentVal.category === "file") {
                return;
              } else {
                if (currentVal.children.length === 0) {
                  return;
                } else {
                  find(currentVal);
                }
              }
            }
          });
        }
        find(result);
        this.setState({
          filteredArr: filteredArr,
          searchInputValForState: value
        });
      });
    } else {
      this.setState({
        filteredArr: []
      });
    }
  }

  dragStart = (ev, id) => {
    if (id) {
      ev.target.style.opacity = 0.2;
      ev.dataTransfer.effectAllowed = "move";
      this.dragStartId = id;
      this.dragStartNode = ev.target;
    }
  };

  dragEnter = (ev, category) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (ev.currentTarget === this.dragStartNode) return;
    if (ev.target.className === "header" && category === "folder") {
      ev.target.parentElement.parentElement.style.background = "#ffbdbd";
    }
    if (ev.target.className === "item") {
      this.over = ev.target;
      var relY = ev.clientY - this.over.getBoundingClientRect().y;
      var height = this.over.offsetHeight / 2;

      if (relY > height) {
        ev.target.style.borderBottom = "2px #a99696 dashed";
      } else if (relY < height) {
        ev.target.style.borderTop = "2px #a99696 dashed";
      }
    }
  };

  dragLeave = (ev, category) => {
    ev.preventDefault();
    ev.stopPropagation();

    if (ev.target === this.dragStartNode) return;

    if (ev.target.className === "header" && category === "folder") {
      ev.target.parentElement.parentElement.style.background = "";
    }
    if (ev.target.className === "item") {
      var relY = ev.clientY - this.over.getBoundingClientRect().y;
      var height = this.over.offsetHeight / 2;

      if (relY > height) {
        ev.target.style.borderBottom = "";
        ev.target.style.borderTop = "";
      } else if (relY < height) {
        ev.target.style.borderBottom = "";
        ev.target.style.borderTop = "";
      }
    }
  };

  dragOver = ev => {
    ev.preventDefault();
  };

  dragEnd = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.dragStartNode) {
      this.dragStartNode.style.opacity = 1;
    }
    if (this.over) {
      this.over.style.borderBottom = "";
      this.over.style.borderTop = "";
      this.over.parentElement.parentElement.style.background = "";
    }
  };

  drop = (ev, category) => {
    ev.stopPropagation();

    let dragStartId = this.dragStartId;
    let dragStartObj;
    let dragDropArr;
    let dropIdx;
    let dragDropId;
    let target = ev.target.className;
    let up = false;

    if (
      dragStartId ===
      ev.currentTarget.lastElementChild.lastElementChild.dataset.id
    )
      return;

    if (target === "header" && category === "folder") {
      ev.target.parentElement.parentElement.style.background = "";
      dragDropId = ev.target.dataset.id;
      this.setState({
        selectedFolderId: ev.target.dataset.id
      });
    }

    if (target === "item") {
      dragDropId = ev.target.childNodes[1].childNodes[1].dataset.id;
      var relY = ev.clientY - this.over.getBoundingClientRect().y;
      var height = this.over.offsetHeight / 2;

      if (relY > height) {
        ev.target.style.borderBottom = "";
      } else if (relY < height) {
        ev.target.style.borderTop = "";
        up = true;
      }
      this.setState({
        selectedFolderId: ev.target.parentElement.previousSibling.dataset.id
      });
    }

    chromeService.get(result => {
      findDragStart(result);
      findDragDrop(result);

      if (dragDropArr === undefined) return;

      if (target === "header") {
        dragDropArr.push(dragStartObj);
      } else if (target === "item") {
        if (up) {
          dragDropArr.splice(dropIdx, 0, dragStartObj);
          up = false;
        } else {
          if (dragDropArr.length - 1 === dropIdx) {
            dragDropArr.push(dragStartObj);
          } else {
            dragDropArr.splice(dropIdx + 1, 0, dragStartObj);
          }
        }
      }

      chromeService.set({ children: result.children });
      this.setState({
        defaultFolder: {
          ...this.state.defaultFolder,
          children: result.children
        }
      });
    });

    function findDragStart(result) {
      result.children.map((currentVal, idx, arr) => {
        if (currentVal.id === Number(dragStartId)) {
          dragStartObj = currentVal;
          arr.splice(idx, 1);
          if (arr.length) {
            result.open = true;
          } else {
            result.open = false;
          }
          return;
        } else {
          if (currentVal.category === "folder") {
            if (currentVal.children.length > 0) {
              findDragStart.call(this, currentVal);
            } else {
              return "";
            }
          } else {
            return "";
          }
        }
      });
    }

    function findDragDrop(result) {
      result.children.map((currentVal, idx, arr) => {
        if (currentVal.id === Number(dragDropId)) {
          if (target === "header") {
            dragDropArr = currentVal.children;
          } else {
            dragDropArr = arr;
            dropIdx = idx;
            result.open = true;
          }
          return;
        } else {
          if (currentVal.category === "folder") {
            if (currentVal.children.length > 0) {
              findDragDrop.call(this, currentVal);
            } else {
              return "";
            }
          } else {
            return "";
          }
        }
      });
    }
  };

  render() {
    return (
      <div className="App" onDragEnd={this.dragEnd.bind(this)}>
        <Header openSettingPage={this.openSettingPage.bind(this)} />
        <PostContainer
          data={this.state.defaultFolder.children}
          defaultFolderName={this.state.defaultFolder.folderName}
          setTimeMarker={this.setTimeMarker.bind(this)}
          addFolder={this.addFolder.bind(this)}
          selectedFolder={this.selectedFolder.bind(this)}
          receiveEditedName={this.receiveEditedName.bind(this)}
          selectedFolderId={this.state.selectedFolderId}
          delete={this.delete.bind(this)}
          moveToUrl={this.moveToUrl.bind(this)}
          inYoutube={this.state.inYoutube}
          searchInputVal={this.searchInputVal.bind(this)}
          filteredArr={this.state.filteredArr}
          changeView={this.changeView.bind(this)}
          changePostView={this.state.addView}
          currentAddThing={this.state.currentAddThing}
          dragStart={this.dragStart.bind(this)}
          dragOver={this.dragOver.bind(this)}
          drop={this.drop.bind(this)}
          dragLeave={this.dragLeave.bind(this)}
          dragEnter={this.dragEnter.bind(this)}
        />
        <SettingPage
          userSetting={this.userSetting.bind(this)}
          newTabOpen={this.state.defaultFolder.newTabOpen}
        />
      </div>
    );
  }
}

export default App;
