import React, { Component, Fragment } from 'react';
import { List, Button, Icon, Segment } from 'semantic-ui-react';
import { Tree } from '../index';
import './Search.css';



class Search extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            folderSettingBtnOpen: false,
            defaultSelected: "top",
            selected: "top",
            hover: false,
            folderEditList:false,
            openedFolder: [],
        };
    }   



    hideList (ev) {
        this.props.selectedFolder(ev.currentTarget.dataset.id);
        if(ev.target.className === "header"){
            if(ev.target.nextElementSibling){
                ev.target.nextElementSibling.classList.toggle("none");
                ev.target.parentElement.previousElementSibling.classList.toggle("open")
                
            }
        }
    }

    onHover(ev){
        if(ev.currentTarget.className.includes("header")){
            ev.currentTarget.children[1].classList.remove("none")
        }else{
            return ""
        }
    }

    offHover(ev){

        var button = ev.currentTarget.querySelector(".ui.icon.button");
        var segments = ev.currentTarget.querySelector(".ui.compact.segments");

        if (button === ev.target) {
            button.classList.add("none");
            return;
        }

        button.classList.add("none");
        segments.classList.add("none");
    }


    folderEditBtn (ev, category){
        ev.stopPropagation();
        ev.target.nextElementSibling.classList.toggle("none");
        if(category === "folder") this.props.selectedFolder(ev.currentTarget.dataset.id);

    }

    addFolder (ev){
        if(ev.target.innerHTML === "Add Folder"){
            var selectedFolderId = ev.target.parentElement.parentElement.parentElement.dataset.id;
            if(!this.state.openedFolder.includes(selectedFolderId)){
                this.setState({
                    selectedFolderId: selectedFolderId,
                })
            }else{
                this.setState({selectedFolderId: selectedFolderId});
            }
            this.props.addFolder(selectedFolderId);
        }
    }

    editName (ev) {
        ev.target.parentElement.parentElement.parentElement.previousElementSibling.classList.remove("none")
        ev.target.parentElement.parentElement.parentElement.previousElementSibling.select();
        ev.target.parentElement.parentElement.parentElement.classList.add("none");
    }

    pushEnterFunction (ev) {
        if (ev.keyCode === 13) {
            if(ev.target.value !== "" ){
                this.receiveEditedName(ev.target.value, ev.target.nextElementSibling.dataset.id,ev)
            }else{
                this.receiveEditedName(ev.target.defaultValue, ev.target.nextElementSibling.dataset.id,ev)
            }
        }
    }

    inputBlur (ev) {
        if(ev.target.value !== "" ){
            this.receiveEditedName(ev.target.value, ev.target.nextElementSibling.dataset.id,ev)
        }else{
            this.receiveEditedName(ev.target.defaultValue, ev.target.nextElementSibling.dataset.id,ev)
        }
    }

    receiveEditedName (editedName, currentId, ev){
        this.props.receiveEditedName(editedName, currentId);
        ev.target.classList.add("none")
        ev.target.nextElementSibling.classList.remove("none");
    }

    delete (ev) {
        this.props.delete(ev.target.parentElement.parentElement.dataset.id);
        if(ev.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children.length === 1){
            ev.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.classList.remove("open")
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
        ev.target.parentElement.classList.add("none");
        ev.target.parentElement.parentElement.classList.add("none");
    }

    dragOver = (ev) => {
        ev.preventDefault();
        return;
    }

    drop = (ev) => {
        return;
    }

    dragLeave = (ev) => {
        return;
    }

    dragEnter = (ev) => {
        return;
    }

    dragStart = (ev) => {
        return;
    }

    render() {
        return (
            <div className="Search">
                <List onDrop={this.drop.bind(this)} onDragLeave = {this.dragLeave.bind(this)}>
                    {
                        this.props.data.length === 0
                        ? ""
                        :
                        (<Tree 
                            data = {this.props.data}
                            selectedFolderId = {this.props.selectedFolderId}
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
                            currentAddThing = {this.props.currentAddThing}
                            openedFolder = {this.state.openedFolder}
                            dragStart = {this.dragStart.bind(this)}
                            dragOver = {this.dragOver.bind(this)}
                            drop = {this.drop.bind(this)}
                            dragLeave = {this.dragLeave.bind(this)}
                            dragEnter = {this.dragEnter.bind(this)}
                        />)
                    }
                </List>
            </div>
        );
    }
}

export default Search;