import React, { Component, Fragment } from 'react';
import { List, Button, Icon, Segment } from 'semantic-ui-react'
import './Search.css';


function FileComp(props) {
    return (
            <List.Item>
            <List.Icon name='file video outline' color="red" />
                <List.Content>
                    <input  className = "editInput none" defaultValue = {props.data.name} onKeyDown = {props.pushEnterFunction} onBlur = {props.inputBlur} autoFocus /> 
                    <List.Header data-id = {props.data.id} data-url = {props.data.url} onMouseEnter = {props.onHover} onMouseLeave = {props.offHover} onDoubleClick = {props.moveToUrl}>
                        {props.data.name}
                            <div className="replace"></div>
                            <Fragment>                           
                                <Button icon className = "hidden" color="white" data-id = {props.data.id} > 
                                    <Icon size="small" name="ellipsis horizontal" onClick = {props.folderEditBtn} data-id = {props.data.id}/>
                                        <Segment.Group compact className = "hidden"  >
                                            <input className = "none" value = {props.data.url}/>
                                            <Segment textAlign="center" onClick = {props.copyUrl} >Copy URL</Segment>
                                            <Segment textAlign="center" onClick = {props.editName}>Edit Name</Segment>
                                            <Segment textAlign="center" onClick = {props.delete}>Delete</Segment>
                                        </Segment.Group>
                                </Button>
                            </Fragment>
                    </List.Header>
                </List.Content>
            </List.Item>
    );
}

function FolderComp(props) {
    return (
                <List.Item>
                    <List.Icon name = 'folder outline' />
                    <List.Content>
                        <input  className = "editInput none" defaultValue= {props.data.name} onKeyDown = {props.pushEnterFunction} onBlur = {props.inputBlur} autoFocus/> 
                        <List.Header data-id = {props.data.id} onClick = {props.selectedFolder} onMouseEnter = {props.onHover} onMouseLeave = {props.offHover} onDoubleClick = {props.hideList}>
                            {props.data.name}
                            {Number(props.selectedFolderId) === props.data.id ? <Icon color = "red" name = "check circle" size= "small" data-id = {props.data.id}/> : <Icon name = "check circle" size= "small" data-id = {props.data.id}/>}
                                    <Fragment>                           
                                        <Button icon className = "hidden" color="white" data-id = {props.data.id}> 
                                            <Icon size="small" name="ellipsis horizontal" onClick = {props.folderEditBtn} data-id = {props.data.id}/>
                                                <Segment.Group compact className = "hidden"  >
                                                    <Segment textAlign="center" onClick = {props.addFolder}>Add Folder</Segment>
                                                    <Segment textAlign="center" onClick = {props.editName}>Edit Name</Segment>
                                                    <Segment textAlign="center" onClick = {props.delete}>Delete</Segment>
                                                </Segment.Group>
                                        </Button>
                                    </Fragment>
                        </List.Header>
                        {
                            props.data.children.length === 0 
                            ? ""
                            : 
                            (<List.List className = {props.currentAddFolder !== null ? "" : "none"}>
                                <Tree 
                                    data = {props.data.children} 
                                    selectedFolderId = {props.selectedFolderId}
                                    selectedFolder = {props.selectedFolder}
                                    onHover = {props.onHover}
                                    offHover = {props.offHover}
                                    folderEditBtn = {props.folderEditBtn}
                                    addFolder = {props.addFolder}
                                    editName = {props.editName}
                                    pushEnterFunction = {props.pushEnterFunction}
                                    inputBlur = {props.inputBlur}
                                    delete = {props.delete}
                                    hideList = {props.hideList}
                                    moveToUrl = {props.moveToUrl}
                                    copyUrl = {props.copyUrl}
                                    currentAddFolder = {props.currentAddFolder}
                                />
                            </List.List>)
                        }
                    </List.Content>
                </List.Item>
    );
}

function Tree (props){
    if(props.data){
        return (
            <Fragment>  
                { 
                    props.data.map((currentVal, idx, arr)=> {
                        if(currentVal.category === "file"){
                            return (<FileComp 
                                        data = {currentVal} 
                                        selectedFolderId = {props.selectedFolderId}
                                        selectedFolder = {props.selectedFolder}
                                        onHover = {props.onHover}
                                        offHover = {props.offHover}
                                        folderEditBtn = {props.folderEditBtn}
                                        addFolder = {props.addFolder}
                                        editName = {props.editName}
                                        pushEnterFunction = {props.pushEnterFunction}
                                        inputBlur = {props.inputBlur}
                                        delete = {props.delete}
                                        moveToUrl = {props.moveToUrl}
                                        copyUrl = {props.copyUrl}
                                    />);
                        }
                        if(currentVal.category === "folder"){
                            return (<FolderComp 
                                data = {currentVal} 
                                selectedFolderId = {props.selectedFolderId}
                                selectedFolder = {props.selectedFolder}
                                onHover = {props.onHover}
                                offHover = {props.offHover}
                                folderEditBtn = {props.folderEditBtn}
                                addFolder = {props.addFolder}
                                editName = {props.editName}
                                pushEnterFunction = {props.pushEnterFunction}
                                inputBlur = {props.inputBlur}
                                delete = {props.delete}
                                hideList = {props.hideList}
                                moveToUrl = {props.moveToUrl}
                                copyUrl = {props.copyUrl}
                                currentAddFolder = {props.currentAddFolder}
                            />);
                        }
                    })
                } 
            </Fragment>
        );
    }else{
        return null;
    }
}


class Search extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            folderSettingBtnOpen: false,
            defaultSelected: "top",
            selected: "top",
            hover: false,
            folderEditList:false,
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
        var selectedFolderId = ev.target.parentElement.parentElement.parentElement.dataset.id;
        this.props.addFolder(selectedFolderId);
    }

    editName (ev){
        
        ev.target.parentElement.parentElement.parentElement.previousElementSibling.classList.remove("none")
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
        ev.target.nextElementSibling.classList.toggle("none");
        ev.currentTarget.parentElement.previousElementSibling.classList.toggle("open")
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
                    />
                </List>
            </div>
        );
    }
}

export default Search;