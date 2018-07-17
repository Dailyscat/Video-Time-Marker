import React, { Component } from 'react';
import './App.css';
import { Header } from './components';
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
      },
      folder: {
        category: "folder",
        id: Date.now(),
        name: "New Folder",
        children: [],
      },
      file: {
        category: "file",
        id: null,
        name: null,
        url: null,
      },
      selectedFolderId : "top",
      category : null,
      videoId : null,
    };

    chromeService.initialDB(result => { 
      if(result === 0){
        chromeService.set(this.state.defaultFolder);
      }
    });

    chromeService.videoId((result) => {
        this.setState({
          videoId : result[0]
        })
    });

    chromeService.get(result => {
      this.setState({
        defaultFolder: {
          ...this.state.defaultFolder,
          folderName: result.folderName,
          children : result.children,
        }
      })
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
                currentVal.children.push(folderCopy);
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
        console.log(result.children);
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

  render() {
    return (
      <div className="App">
        <Header/>
        <PostContainer 
          data = {this.state.defaultFolder.children}
          defaultFolderName = {this.state.defaultFolder.folderName}
          setTimeMarker= {this.setTimeMarker.bind(this)}
          addFolder = {this.addFolder.bind(this)} 
          selectedFolder = {this.selectedFolder.bind(this)}
          receiveEditedName = {this.receiveEditedName.bind(this)}
          selectedFolderId = {this.state.selectedFolderId}
          delete = {this.delete.bind(this)}
        />
      </div>
    );
  }
}

export default App;
