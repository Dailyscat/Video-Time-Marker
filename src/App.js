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
        folderId: 1,
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
  }   

  componentDidMount() {
    chromeService.get(result => {
      this.setState({
        defaultFolder: {
          ...this.state.defaultFolder,
          children : result.children,
        }
      })
    });

  };

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
        if(currentFolderId > 1){
        } else {

    
          var obj = result.children.concat([
            this.state.file
          ])
          this.setState({
            defaultFolder: {
              ...this.state.defaultFolder,
              children:obj,
            }
          })
          chromeService.remove("children");
          chromeService.set({children: obj});
        }
        this.setState({
          defaultFolder: {
            ...this.state.defaultFolder,
            children : obj,
          }
        })
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <PostContainer 
          data = {this.state.defaultFolder.children}
          setTimeMarker= {this.setTimeMarker.bind(this)}
          addFolder = {this.addFolder.bind(this)} 
          selectedFolder = {this.selectedFolder.bind(this)}
          selectedFolderId = {this.state.selectedFolderId}
        />
      </div>
    );
  }
}

export default App;
