import { List, Button, Icon, Segment } from 'semantic-ui-react'
import React, { Fragment } from 'react';

function File(props) {
    var dragStart = (ev) => {

        props.dragStart(ev,ev.target.lastElementChild.lastElementChild.dataset.id);
    }

    var dragOver = (ev) => {
        ev.preventDefault();
        props.dragOver(ev);
    }

    var drop = (ev, cat) => {
            props.drop(ev);
    }

    var dragLeave = (ev) => {
        props.dragLeave(ev);
    }

    var dragEnter = (ev) => {
        props.dragEnter(ev);
    }
    return (
            <List.Item draggable onDragStart = {dragStart} onDragOver = {dragOver} onDragLeave = {dragLeave} onDragEnter = {dragEnter}>
            <List.Icon name='file video ' color = "black" />
                <List.Content>
                    <input  className = "editInput none" defaultValue = {props.data.name} onKeyDown = {props.pushEnterFunction} onBlur = {props.inputBlur} autoFocus  /> 
                    <List.Header data-id = {props.data.id} data-url = {props.data.url} onMouseEnter = {props.onHover} onMouseLeave = {props.offHover} onDoubleClick = {props.moveToUrl}>
                        {props.data.name}
                            <div className="replace"></div>
                            <Fragment>                           
                                <Button icon className = "none" color="white" data-id = {props.data.id} > 
                                    <Icon size="small" name="ellipsis horizontal" onClick = {props.folderEditBtn} data-id = {props.data.id}/>
                                        <Segment.Group compact className = "none"  >
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

export default File;