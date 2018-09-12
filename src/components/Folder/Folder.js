import { List, Button, Icon, Segment } from 'semantic-ui-react'
import React, { Fragment } from 'react';
import Tree from '../Tree/Tree';

function Folder(props) {

    var dragStart = (ev) => {
        props.dragStart(ev, ev.target.lastElementChild.children[1].dataset.id);
    }

    var dragOver = (ev) => {
        ev.preventDefault();
        props.dragOver(ev);
    }

    var drop = (ev, cat) => {
            props.drop(ev,"folder");
    }

    var dragLeave = (ev) => {
        props.dragLeave(ev,"folder");
    }

    var dragEnter = (ev) => {
        props.dragEnter(ev,"folder");
    }
    return (
                <List.Item draggable onDragStart = {dragStart} onDragOver = {dragOver} onDrop = {drop}  onDragLeave = {dragLeave} onDragEnter = {dragEnter} >
                    <List.Icon name= {props.data.open ?'folder outline open' :'folder outline ' } />
                    <List.Content>
                        <input  className = "editInput none" defaultValue= {props.data.name} onKeyDown = {props.pushEnterFunction} onBlur = {props.inputBlur} autoFocus /> 
                        <List.Header data-id = {props.data.id} onMouseEnter = {props.onHover} onMouseLeave = {props.offHover} onClick = {props.hideList}>
                            {props.data.name}
                            
                            {Number(props.selectedFolderId) === props.data.id ? (<Icon color = "red" name = "check circle" size= "small" data-id = {props.data.id}/>) : (<Icon name = "check circle" size= "small" data-id = {props.data.id}/>)}
                                    <Fragment>                           
                                        <Button icon className = "none" color="white" data-id = {props.data.id}> 
                                            <Icon size="small" name="ellipsis horizontal" onClick = {props.folderEditBtn} data-id = {props.data.id}/>
                                                <Segment.Group compact className = "none"  >
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
                            (<List.List className = {props.data.open || props.openedFolder.includes(props.data.id) ?"" :"none" }>
                                <Tree 
                                    data = {props.data.children} 
                                    selectedFolderId = {props.selectedFolderId}
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
                                    currentAddThing = {props.currentAddThing}
                                    openedFolder = {props.openedFolder}
                                    dragStart = {props.dragStart}
                                    dragOver = {props.dragOver}
                                    drop = {props.drop}
                                    dragLeave = {props.dragLeave}
                                    dragEnter = {props.dragEnter}
                                />
                            </List.List>)
                        }
                    </List.Content>
                </List.Item>
    );
}

export default Folder;