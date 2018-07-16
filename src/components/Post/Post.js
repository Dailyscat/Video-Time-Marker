import React, { Component, Fragment } from 'react';
import { List, Button, Icon, Segment, Input } from 'semantic-ui-react'
import './Post.css';


function FileComp(props) {
    return (
            <List.Item>
            <List.Icon name='file' />
                <List.Content>
                    <List.Header data-id = {props.data.id} onClick = {props.selectedFolder} onMouseEnter = {props.onHover} onMouseLeave = {props.offHover} >
                        {props.data.name}
                        {Number(props.selectedFolderId)=== props.data.id ? <Icon name = "checkmark" size= "small"/> : <div className="replace"></div>}
                            <Fragment>                           
                                <Button icon className = "none" color="white" > 
                                    <Icon size="small" name="ellipsis horizontal" onClick = {props.folderEditBtn}/>
                                            <Segment.Group compact className = "none"  >
                                                <Segment textAlign="center" onClick = {props.addFolder}>Add Folder</Segment>
                                                <Segment textAlign="center" >Delete</Segment>
                                                <Segment textAlign="center" >experiment</Segment>
                                                <Segment textAlign="center" >Edit Name</Segment>
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
            <List.List>
                <List.Item>
                    <List.Icon name='folder' />
                    <List.Content>
                        <List.Header data-id = {props.data.id} onClick = {props.selectedFolder} onMouseEnter = {props.onHover} onMouseLeave = {props.offHover}>
                            {props.data.name}
                            {Number(props.selectedFolderId) === props.data.id ? <Icon name = "checkmark" size= "small"/> : <div className="replace"></div>}
                                    <Fragment>                           
                                        <Button icon className = "none" color="white" > 
                                            <Icon size="small" name="ellipsis horizontal" onClick = {props.folderEditBtn}/>
                                                    <Segment.Group compact className = "none"  >
                                                        <Segment textAlign="center" onClick = {props.addFolder}>Add Folder</Segment>
                                                        <Segment textAlign="center" >Delete</Segment>
                                                        <Segment textAlign="center" >experiment</Segment>
                                                        <Segment textAlign="center" >Edit Name</Segment>
                                                    </Segment.Group>
                                        </Button>
                                    </Fragment>
                        </List.Header>
                    </List.Content>
                </List.Item>
                
            </List.List>  
    );
}

function Tree (props){
    if(props.data !== null){
        console.log(props.data);
        return (
            <Fragment>  
                { 
                    props.data.map((currentVal, idx, arr)=> {
                        if(currentVal.category === "file"){
                            return <FileComp 
                                        data = {currentVal} 
                                        selectedFolderId = {props.selectedFolderId}
                                        selectedFolder = {props.selectedFolder}
                                        onHover = {props.onHover}
                                        offHover = {props.offHover}
                                        folderEditBtn = {props.folderEditBtn}
                                        addFolder = {props.addFolder}
                                    />
                        }
                        if(currentVal.category === "folder"){
                            if(currentVal.children.length === 0){
                                return <FolderComp 
                                            data = {currentVal} 
                                            selectedFolderId = {props.selectedFolderId}
                                            selectedFolder = {props.selectedFolder}
                                            onHover = {props.onHover}
                                            offHover = {props.offHover}
                                            folderEditBtn = {props.folderEditBtn}
                                            addFolder = {props.addFolder}
                                        />
                            }else{
                                var current = currentVal.children;
                                
                                return (
                                    <Tree 
                                        data = {current} 
                                        selectedFolderId = {props.selectedFolderId}
                                        selectedFolder = {props.selectedFolder}
                                        onHover = {props.onHover}
                                        offHover = {props.offHover}
                                        folderEditBtn = {props.folderEditBtn}
                                        addFolder = {props.addFolder}
                                    />
                                );
                            }
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
            this.setState({
                selected: ev.target.dataset.id
            });

            this.props.selectedFolder(ev.target.dataset.id);
    }

    onHover(ev){
        ev.stopPropagation();
        if(ev.target.className === "checkmark small icon"){
            return ""
        }else if(ev.target.className === "ui center aligned segment"){
            return ""
        }else if(!ev.target.children[1]){
            ev.target.children[0].classList.remove("none");
        }else{
            ev.target.children[1].classList.remove("none")                
        }
    }

    offHover(ev){   
        ev.stopPropagation();
            if(ev.target.tagName === "BUTTON"){
                ev.target.classList.add("none");
                if(!ev.target.children[1].classList.contains("none")){
                    ev.target.children[1].classList.add("none");
                }
            }else if(ev.target.className === "ellipsis horizontal small icon"){
                ev.target.parentElement.classList.add("none");
                if(!ev.target.nextElementSibling.classList.contains("none")){
                    ev.target.nextElementSibling.classList.add("none");
                }
            }else if(ev.target.className == "checkmark small icon"){
                ev.target.nextElementSibling.classList.add("none");
                if(!ev.target.nextElementSibling.children[1].classList.contains("none")){
                    ev.target.nextElementSibling.children[1].classList.add("none");
                }
            }else if(ev.target.className === "ui center aligned segment"){
                ev.target.parentElement.classList.add("none");
                ev.target.parentElement.parentElement.classList.add("none");
            }else if(ev.target.className === "ui compact segments"){
                ev.target.classList.add("none");
                ev.target.parentElement.add("none");
            }else{
                if(!ev.target.children[1].classList.contains("none")){
                    ev.target.children[1].classList.add("none");
                    if(!ev.target.children[1].children[1].classList.contains("none")){
                        ev.target.children[1].children[1].classList.add("none");
                    }
                }
            }
        }


    folderEditBtn (ev){
        ev.target.nextElementSibling.classList.toggle("none");
    }

    addFolder (ev){
        var selectedFolderId = ev.target.parentElement.parentElement.parentElement.dataset.id;
        this.props.addFolder(selectedFolderId);
    }
    render() {
        return (
            <div className="Post">
                <List >
                <List.Item>
                    <List.Icon name='folder' />
                    <List.Content>
                        <List.Header className="topOfTopFolder" data-id = {"top"} onClick = {this.selectedFolder.bind(this)} onMouseEnter = {this.onHover.bind(this)} onMouseLeave = {this.offHover.bind(this)}>
                            YouTube Time Marker
                            {this.props.selectedFolderId === this.state.defaultSelected ? <Icon name = "checkmark" size= "small"/> : <div className="replace"></div>}
                                <Fragment>                           
                                    <Button icon  color="white" className = "none" > 
                                        <Icon size="small" name="ellipsis horizontal" onClick = {this.folderEditBtn.bind(this)}/>
                                            <Segment.Group compact className = "none" >
                                                <Segment textAlign="center" onClick = {this.addFolder.bind(this)}>Add Folder</Segment>
                                                <Segment textAlign="center" >Delete</Segment>
                                                <Segment textAlign="center" >experiment</Segment>
                                                <Segment textAlign="center" >Edit Name</Segment>
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
