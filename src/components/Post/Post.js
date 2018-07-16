import React, { Component, Fragment } from 'react';
import { List, Button, Icon, Segment, Input } from 'semantic-ui-react'
import './Post.css';


function FileComp(props) {
    return (
            <List.Item>
            <List.Icon name='file' />
                <List.Content>
                    <Input focus size="mini" className = "none" /> 
                    <List.Header data-id = {props.data.id} onMouseEnter = {props.onHover} onMouseLeave = {props.offHover} >
                        {props.data.name}
                            <div className="replace"></div>
                            <Fragment>                           
                                <Button icon className = "hidden" color="white" > 
                                    <Icon size="small" name="ellipsis horizontal" onClick = {props.folderEditBtn}/>
                                        <Segment.Group compact className = "hidden"  >
                                            <Segment textAlign="center" >Copy URL</Segment>
                                            <Segment textAlign="center" onClick = {props.editName}>Edit Name</Segment>
                                            <Segment textAlign="center" >Delete</Segment>
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
                        <Input focus size="mini" className = "none" /> 
                        <List.Header data-id = {props.data.id} onClick = {props.selectedFolder} onMouseEnter = {props.onHover} onMouseLeave = {props.offHover}>
                            {props.data.name}
                            {Number(props.selectedFolderId) === props.data.id ? <Icon name = "checkmark" size= "small" data-id = {props.data.id}/> : <div className="replace"></div>}
                                    <Fragment>                           
                                        <Button icon className = "hidden" color="white" data-id = {props.data.id}> 
                                            <Icon size="small" name="ellipsis horizontal" onClick = {props.folderEditBtn} data-id = {props.data.id}/>
                                                <Segment.Group compact className = "hidden"  >
                                                    <Segment textAlign="center" onClick = {props.addFolder}>Add Folder</Segment>
                                                    <Segment textAlign="center" onClick = {props.editName}>Edit Name</Segment>
                                                    <Segment textAlign="center" >Delete</Segment>
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
            if(ev.target.tagName === "BUTTON"){
                ev.target.classList.add("hidden");
                if(!ev.target.children[1].classList.contains("hidden")){
                    ev.target.children[1].classList.add("hidden");
                }
            }else if(ev.target.className === "ellipsis horizontal small icon"){
                ev.target.parentElement.classList.add("hidden");
                if(!ev.target.nextElementSibling.classList.contains("hidden")){
                    ev.target.nextElementSibling.classList.add("hidden");
                }
            }else if(ev.target.className == "checkmark small icon"){
                ev.target.nextElementSibling.classList.add("hidden");
                if(!ev.target.nextElementSibling.children[1].classList.contains("hidden")){
                    ev.target.nextElementSibling.children[1].classList.add("hidden");
                }
            }else if(ev.target.className === "ui center aligned segment"){
                ev.target.parentElement.classList.add("hidden");
                ev.target.parentElement.parentElement.classList.add("hidden");
            }else if(ev.target.className === "ui compact segments"){
                ev.target.classList.add("hidden");
                ev.target.parentElement.classList.add("hidden");
            }else{
                if(!ev.target.children[1].classList.contains("hidden")){
                    ev.target.children[1].classList.add("hidden");
                    if(!ev.target.children[1].children[1].classList.contains("hidden")){
                        ev.target.children[1].children[1].classList.add("hidden");
                    }
                }
            }
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

    render() {
        return (
            <div className="Post">
                <List >
                <List.Item>
                    <List.Icon name='folder' />
                    <List.Content>
                        <Input focus size="mini" className = "none" /> 
                        <List.Header className="topOfTopFolder" data-id = {"top"} onClick = {this.selectedFolder.bind(this)} onMouseEnter = {this.onHover.bind(this)} onMouseLeave = {this.offHover.bind(this)}>
                            YouTube Time Marker
                            {this.props.selectedFolderId === this.state.defaultSelected ? <Icon name = "checkmark" size= "small" data-id = "top"/> : <div className="replace"></div>}
                                <Fragment>                           
                                    <Button icon  color="white" className = "hidden" > 
                                        <Icon size="small" name="ellipsis horizontal" onClick = {this.folderEditBtn.bind(this)}/>
                                            <Segment.Group compact className = "hidden" >
                                                <Segment textAlign="center" onClick = {this.addFolder.bind(this)}>Add Folder</Segment>
                                                <Segment textAlign="center" onClick = {this.editName.bind(this)}>Edit Name</Segment>
                                                <Segment textAlign="center" >Delete</Segment>
                                                <Segment textAlign="center" >experiment</Segment>
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
