import React, { Component } from 'react';
import './App.css';
import { Header, SettingPage } from './components';
import {PostContainer} from './containers';
import chromeService from './services/chromeService';


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      data : [],
      defaultFolder : {
        folderName : "Youtube Time Marker",
        folderId: "top",
        children: [],
        newTabOpen : true,
      },
      folder: {
        category: "folder",
        id: Date.now(),
        name: "New Folder",
        children: [],
        open: false,
      },
      file: {
        category: "file",
        id: null,
        name: null,
        url: null,
      },
      selectedFolderId : "top",
      inYoutube: false,
      category : null,
      videoId : null,
      settingPageOpen : false,
      filteredArr: [],
      addView: true,
      currentAddFolder:null,
    };

  }

  componentDidMount(){

    chromeService.initialDB(result => { 
      if(result === 0){
        chromeService.set(this.state.defaultFolder);
      }
      chromeService.get(result => {
        this.setState({
          defaultFolder: {
            ...this.state.defaultFolder,
            folderName: result.folderName,
            children : result.children,
            newTabOpen: result.newTabOpen
          }
        })
      });
    });

    chromeService.onLoadHandler((tabId, changeInfo, tab) =>{
        if(changeInfo.status == "loading") {
                window.close();
        }
    })

  chromeService.videoId((result) => {
    if(result[0]){
      this.setState({
        videoId : result[0],
        inYoutube: true,
      })
    }
  });  


}   


  receiveEditedName (editedName, currentId) {
    chromeService.get(result => {
      if(currentId === "top") {
        result.folderName = editedName;
      }else{
        function findFile(result) {
          result.children.map((currentVal, idx, arr) => {

              if(Number(currentId) === currentVal.id){
                currentVal.name = editedName;
                return;
              }else{
                if(currentVal.category === "folder"){
                  if(currentVal.children.length > 0){
                    findFile.call(this,currentVal);
                  }else{
                    return "";
                  }
                }else{
                  return "";
                }
              }
          })  
        }
        findFile.call(this,result);
      }
      this.setState({
        defaultFolder: {
          ...this.state.defaultFolder,
          folderName: result.folderName,
          children:result.children,
        }
      });
      chromeService.set({folderName: result.folderName, children: result.children})
    })
  }

  selectedFolder(folderId){
    this.setState({
      selectedFolderId: folderId,
    })  
  }

  addFolder(selectedFolderId){
    chromeService.get(result => {
      if(selectedFolderId === "top") {
        const folderCopy = Object.assign({}, this.state.folder);
        folderCopy.id = Date.now();
        result.children.push(folderCopy);
      }else{
        function makeDownFolder(result) {
          result.children.map((currentVal, idx, arr) => {
            if(currentVal.category === "folder"){
              if(Number(selectedFolderId) === currentVal.id){
                const folderCopy = Object.assign({}, this.state.folder);
                folderCopy.id = Date.now();
                this.setState({currentAddFolder:folderCopy.id});
                currentVal.children.push(folderCopy);
                currentVal.children.sort(function(a, b) {
                  var a = a.category;
                  var b = b.category;
                  if (a > b) {
                    return -1;
                  }
                  if (a < b) {
                    return 1;
                  }
                  return 0;
                })
                return;
              }else{
                if(currentVal.children.length > 0){
                  makeDownFolder.call(this,currentVal);
                }else{
                  return "";
                }
              }
            }else{
              return "";
            }
          })  
        }
        makeDownFolder.call(this,result);
      }
      this.setState({
        defaultFolder: {
          ...this.state.defaultFolder,
          children:result.children,
        }
      });
      chromeService.set({children: result.children})
    })
  }

  setTimeMarker(name){
    chromeService.currentTime((result) => {
      this.setState({
        file: {
          ...this.state.file,
          id: Date.now(),
          name:name,
          url:`https://youtu.be/`+ this.state.videoId + `?t=`+ result[0],
        }
      })

      var currentFolderId = this.state.selectedFolderId;
      var currentCategory = this.state.category;
      chromeService.get(result => {      
        if(currentFolderId === "top"){
          result.children.push(
            this.state.file
          )
        } else {
          function makeDownFile(result) {
            result.children.map((currentVal, idx, arr) => {
              if(currentVal.category === "folder"){
                if(Number(this.state.selectedFolderId) === currentVal.id){
                  currentVal.children.push(this.state.file);
                  currentVal.children.sort(function(a, b) {
                    var a = a.category;
                    var b = b.category;
                    if (a > b) {
                      return -1;
                    }
                    if (a < b) {
                      return 1;
                    }
                    return 0;
                  })
                  return;
                }else{
                  if(currentVal.children.length > 0){
                    makeDownFile.call(this,currentVal);
                  }else{
                    return "";
                  }
                }
              }else{
                return "";
              }
            })  
          }
          makeDownFile.call(this,result);
        }
        chromeService.set({children: result.children});
        this.setState({
          defaultFolder: {
            ...this.state.defaultFolder,
            children : result.children,
          }
        })
      });
    });
  }

  delete(currentId){
    chromeService.get(result => {
      function deleteChildren (result) {
          result.children.map((currentVal, idx, arr) => {
              if(Number(currentId) === currentVal.id){
                arr.splice(idx, 1);
                return;
              }else{
                if(currentVal.category === "folder"){
                  if(currentVal.children.length > 0){
                    deleteChildren.call(this,currentVal);
                  }else{
                    return "";
                  }
                }else{
                  return "";
                }
              }
          })  
      }
      deleteChildren.call(this,result);
      this.setState({
        defaultFolder: {
          ...this.state.defaultFolder,
          children:result.children,
        }
      });
      chromeService.set({children: result.children})
    })
  }

  openSettingPage(settingBtn) {
    settingBtn.parentElement.nextElementSibling.classList.toggle("none");
    settingBtn.parentElement.nextElementSibling.nextElementSibling.classList.toggle("none");
  }

  userSetting(judge){
    chromeService.set({newTabOpen: judge});
    this.setState({
      defaultFolder: {
        ...this.state.defaultFolder,
        newTabOpen: judge,
      }
    })
  }

  moveToUrl(url){
    chromeService.get((result)=>{
      if(result.newTabOpen){
        chromeService.newTab({url:url});
      }else{
        chromeService.currentTab({url:url});
      }
    })
  }

  changeView(bool){
    this.setState({
      addView: bool
    })
  }

  searchInputVal (value) {
    var filteredArr = [];
    if(value !== ""){
      chromeService.get(result => {
        function find (result) {
          result.children.map((currentVal, idx, arr) => {
            var initName = currentVal.name.toLowerCase();
            if(initName.indexOf(value.toLowerCase()) > -1){
              filteredArr.push(currentVal);
              if(currentVal.children){
                if(currentVal.children.length > 0){
                  find(currentVal);
                }
              }
            }else{
              if(currentVal.category === "file"){
                return;
              }else{
                if(currentVal.children.length === 0){
                  return;
                }else{
                  find(currentVal);
                }
              }
            }
          })
        }
        find(result);
        this.setState({
          filteredArr: filteredArr,
        })
      })
    }else{
      this.setState({
        filteredArr: [],
      })
    }

  }


  render() {
    return (
      <div className="App">
        <Header openSettingPage = {this.openSettingPage.bind(this)}/>
        <PostContainer 
          data = {this.state.defaultFolder.children}
          defaultFolderName = {this.state.defaultFolder.folderName}
          setTimeMarker= {this.setTimeMarker.bind(this)}
          addFolder = {this.addFolder.bind(this)} 
          selectedFolder = {this.selectedFolder.bind(this)}
          receiveEditedName = {this.receiveEditedName.bind(this)}
          selectedFolderId = {this.state.selectedFolderId}
          delete = {this.delete.bind(this)}
          moveToUrl = {this.moveToUrl.bind(this)}
          inYoutube = {this.state.inYoutube}
          searchInputVal = {this.searchInputVal.bind(this)}
          filteredArr = {this.state.filteredArr}
          changeView = {this.changeView.bind(this)}
          changePostView = {this.state.addView}
          currentAddFolder = {this.state.currentAddFolder}
        />
        <SettingPage
          userSetting = {this.userSetting.bind(this)}
          newTabOpen = {this.state.defaultFolder.newTabOpen}
          />
      </div>
    );
  }
}

export default App;
