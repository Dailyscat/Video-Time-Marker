import React, { Component, Fragment } from 'react';
import { List, Button, Icon, Segment } from 'semantic-ui-react'
import './Post.css';


function FileComp(props) {
    return (
            <List.Item>
            <List.Icon name='file' />
                <List.Content>
                    <input  className = "editInput none" defaultValue = {props.data.name} onKeyDown = {props.pushEnterFunction} onBlur = {props.inputBlur} /> 
                    <List.Header data-id = {props.data.id} onMouseEnter = {props.onHover} onMouseLeave = {props.offHover} >
                        {props.data.name}
                            <div className="replace"></div>
                            <Fragment>                           
                                <Button icon className = "hidden" color="white" data-id = {props.data.id} > 
                                    <Icon size="small" name="ellipsis horizontal" onClick = {props.folderEditBtn} data-id = {props.data.id}/>
                                        <Segment.Group compact className = "hidden"  >
                                            <Segment textAlign="center" >Copy URL</Segment>
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
                    <List.Icon name='folder' />
                    <List.Content>
                        <input  className = "editInput none" defaultValue= {props.data.name} onKeyDown = {props.pushEnterFunction} onBlur = {props.inputBlur} /> 
                        <List.Header data-id = {props.data.id} onClick = {props.selectedFolder} onMouseEnter = {props.onHover} onMouseLeave = {props.offHover} onDoubleClick = {props.hideList}>
                            {props.data.name}
                            {Number(props.selectedFolderId) === props.data.id ? <Icon name = "checkmark" size= "small" data-id = {props.data.id}/> : <div className="replace"></div>}
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
                            (<List.List>
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
                                />
                            </List.List>)
                        }
                    </List.Content>
                </List.Item>
    );
}

function Tree (props){
    if(props.data !== null){
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



class Post extends Component {

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
        if(ev.target.dataset){
            this.setState({
                selected: ev.target.dataset.id
            });

            this.props.selectedFolder(ev.target.dataset.id);
        }else{
            return "";
        }
    }

    onHover(ev){

        if(ev.target.className === "checkmark small icon"){
            return ""
        }else if(ev.target.className === "ui center aligned segment"){
            return ""
        }else if(!ev.target.children[1]){
            ev.target.children[0].classList.remove("hidden");
        }else{
            ev.target.children[1].classList.remove("hidden")                
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
    }

    hideList (ev) {
        console.log(ev.target)
        console.log(ev.target.nextElementSibling);
        ev.target.nextElementSibling.classList.toggle("none");
    }

    render() {
        return (
            <div className="Post">
                <List >
                <List.Item>
                    <List.Icon name='folder' />
                    <List.Content>
                        <input  className = "editInput none" defaultValue = {this.props.defaultFolderName} onKeyDown = {this.pushEnterFunction.bind(this)} onBlur = {this.inputBlur.bind(this)} /> 
                        <List.Header className="topOfTopFolder" data-id = {"top"} onClick = {this.selectedFolder.bind(this)} onMouseEnter = {this.onHover.bind(this)} onMouseLeave = {this.offHover.bind(this)} onDoubleClick = {this.hideList.bind(this)}>
                            {this.props.defaultFolderName}
                            {this.props.selectedFolderId === this.state.defaultSelected ? <Icon name = "checkmark" size= "small" data-id = "top"/> : <div className="replace"></div>}
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
