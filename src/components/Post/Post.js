import React, { Component, Fragment } from 'react';
import { List, Button, Icon, Segment } from 'semantic-ui-react';
import { Tree } from '../index';
import './Post.css';










class Post extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            folderSettingBtnOpen: false,
            defaultSelected: "top",
            selected: "top",
            hover: false,
            folderEditList:false,
            selectedFolderId:null,
            openedFolder:["top"],
        };
    }   


    
    selectedFolder(ev){
        if(ev.currentTarget.dataset){
            this.props.selectedFolder(ev.currentTarget.dataset.id);
        }else{
            return "";
        }
        this.setState({
            selected: ev.currentTarget.dataset.id,
            openedFolder:this.state.openedFolder.concat([ev.currentTarget.dataset.id])
        });
    }

    onHover(ev){
        if(ev.currentTarget.className.includes("header")){
            ev.currentTarget.children[1].classList.remove("hidden")
        }else{
            return ""
        }
    }

    offHover(ev){
        
        var button = ev.currentTarget.querySelector(".ui.icon.button");
        var segments = ev.currentTarget.querySelector(".ui.compact.segments");

        if (button == ev.target) {
            button.classList.add("hidden");
            return;
        }

        button.classList.add("hidden");
        segments.classList.add("hidden");
        }


    folderEditBtn (ev){
        ev.target.nextElementSibling.classList.toggle("hidden");
    }

    addFolder (ev){

        if(ev.target.innerHTML === "Add Folder"){
            var selectedFolderId = ev.target.parentElement.parentElement.parentElement.dataset.id;
            this.setState({
                selectedFolderId:selectedFolderId,
                openedFolder:this.state.openedFolder.concat([selectedFolderId]),
            })
            this.props.addFolder(selectedFolderId);
            if(!ev.currentTarget.parentElement.parentElement.parentElement.parentElement.previousElementSibling.classList.contains("open")){
                if(ev.currentTarget.parentElement.parentElement.parentElement.nextElementSibling){
                    ev.currentTarget.parentElement.parentElement.parentElement.nextElementSibling.classList.remove("none")
                    ev.currentTarget.parentElement.parentElement.parentElement.parentElement.previousElementSibling.classList.add("open")
                }else{
                    ev.currentTarget.parentElement.parentElement.parentElement.parentElement.previousElementSibling.classList.add("open")
                    
                }
            }
        }
    }

    editName (ev){
        
        ev.target.parentElement.parentElement.parentElement.previousElementSibling.classList.remove("none")
        ev.target.parentElement.parentElement.parentElement.previousElementSibling.select();
        ev.target.parentElement.parentElement.parentElement.classList.add("none");
    }

    pushEnterFunction (ev) {
        if (ev.keyCode === 13) {
            this.receiveEditedName(ev.target.value, ev.target.nextElementSibling.dataset.id,ev)
        }
    }

    inputBlur (ev) {

        this.receiveEditedName(ev.target.value, ev.target.nextElementSibling.dataset.id,ev)
    }

    receiveEditedName (editedName, currentId, ev){
        this.props.receiveEditedName(editedName, currentId);
        ev.target.classList.add("none")
        ev.target.nextElementSibling.classList.remove("none");
    }

    delete (ev) {
        this.props.delete(ev.target.parentElement.parentElement.dataset.id);
    }

    hideList (ev) {
        if(ev.target.className === "header"){
            if(ev.target.nextElementSibling){
                ev.target.nextElementSibling.classList.toggle("none");
                ev.target.parentElement.previousElementSibling.classList.toggle("open")
                
            }
            this.setState({openedFolder:this.state.openedFolder.concat([ev.currentTarget.dataset.id])})
        }
    }

    moveToUrl (ev) {
        this.props.moveToUrl(ev.currentTarget.dataset.url);
    }

    copyUrl (ev){
        ev.target.previousElementSibling.classList.remove("none");
        ev.target.previousElementSibling.select();
        document.execCommand("copy");
        ev.target.previousElementSibling.classList.add("none");
    }
    render() {
        return (
            <div className="Post">
                <List >
                <List.Item>
                    <List.Icon name='folder open' />
                    <List.Content>
                        <input  className = "editInput none" defaultValue = {this.props.defaultFolderName} onKeyDown = {this.pushEnterFunction.bind(this)} onBlur = {this.inputBlur.bind(this)} autoFocus/> 
                        <List.Header className="topOfTopFolder" data-id = {"top"} onClick = {this.selectedFolder.bind(this)} onMouseEnter = {this.onHover.bind(this)} onMouseLeave = {this.offHover.bind(this)} onDoubleClick = {this.hideList.bind(this)}>
                            {this.props.defaultFolderName}
                            {this.props.selectedFolderId === this.state.defaultSelected ? <Icon color = "red" name = "check circle" size= "small" data-id = "top"/> : <Icon name = "check circle" size= "small" data-id = "top"/>}
                                <Fragment>                           
                                    <Button icon  color="white" className = "hidden" data-id = "top" > 
                                        <Icon size="small" name="ellipsis horizontal" onClick = {this.folderEditBtn.bind(this)} data-id = "top"/>
                                            <Segment.Group compact className = "hidden" >
                                                <Segment textAlign="center" onClick = {this.addFolder.bind(this)}>Add Folder</Segment>
                                                <Segment textAlign="center" onClick = {this.editName.bind(this)}>Edit Name</Segment>
                                            </Segment.Group>
                                    </Button>
                                </Fragment>
                        </List.Header>
                        <List.List>
                        <Tree 
                        
                            data = {this.props.data}
                            selectedFolderId = {this.props.selectedFolderId}
                            selectedFolder = {this.selectedFolder.bind(this)}
                            onHover = {this.onHover.bind(this)}
                            offHover = {this.offHover.bind(this)}
                            folderEditBtn = {this.folderEditBtn.bind(this)}
                            addFolder = {this.addFolder.bind(this)}
                            editName = {this.editName.bind(this)}
                            pushEnterFunction = {this.pushEnterFunction.bind(this)}
                            inputBlur = {this.inputBlur.bind(this)}
                            delete = {this.delete.bind(this)}
                            hideList = {this.hideList.bind(this)}
                            moveToUrl = {this.moveToUrl.bind(this)}
                            copyUrl = {this.copyUrl.bind(this)}
                            currentAddFolder = {this.props.currentAddFolder}
                            openedFolder = {this.state.openedFolder}
                        />
                        </List.List>
                    </List.Content>  
                </List.Item>
                </List>
            </div>
        );
    }
}

export default Post;
