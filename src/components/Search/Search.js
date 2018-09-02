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
            openedFolder:[],
        };
    }   



    selectedFolder(ev){
        if(ev.currentTarget.dataset){
            this.setState({
                selected: ev.currentTarget.dataset.id
            });

            this.props.selectedFolder(ev.currentTarget.dataset.id);
        }else{
            return "";
        }
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
        
        ev.target.parentElement.parentElement.parentElement.previousElementSibling.classList.remove("none");
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
        ev.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add("none");
    }

    hideList (ev) {
        if(ev.target.className === "header"){
            if(ev.target.nextElementSibling){
                ev.target.nextElementSibling.classList.toggle("none");
                ev.target.parentElement.previousElementSibling.classList.toggle("open")
            }
            this.setState({openedFolder: this.state.openedFolder.concat([ev.currentTarget.dataset.id])})
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
            <div className="Search">
                <List >
                    {
                        this.props.data.length === 0
                        ? ""
                        :
                        (<Tree 
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
                        currentAddThing = {this.props.currentAddThing}
                        openedFolder = {this.state.openedFolder}
                    />)
                    }
                </List>
            </div>
        );
    }
}

export default Search;