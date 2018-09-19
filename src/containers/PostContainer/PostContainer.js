import React, {Component} from 'react';
import { PostWrapper, URLInput, Post, Search } from '../../components';



class PostContainer extends Component {

    render() {
        return (
            <PostWrapper>
                <URLInput 
                    setTimeMarker = {this.props.setTimeMarker.bind(this)}
                    inYoutube = {this.props.inYoutube}
                    searchInputVal = {this.props.searchInputVal}
                    changeView = {this.props.changeView.bind(this)}
                    />
                {this.props.changePostView 
                ? 
                    <Post
                    data = {this.props.data} 
                    defaultFolderName = {this.props.defaultFolderName}
                    addFolder = {this.props.addFolder.bind(this)}
                    selectedFolder = {this.props.selectedFolder.bind(this)}
                    selectedFolderId = {this.props.selectedFolderId}
                    receiveEditedName = {this.props.receiveEditedName.bind(this)}
                    delete = {this.props.delete.bind(this)}
                    moveToUrl = {this.props.moveToUrl.bind(this)}
                    currentAddThing = {this.props.currentAddThing}
                    dragStart = {this.props.dragStart.bind(this)}
                    dragOver = {this.props.dragOver.bind(this)}
                    drop = {this.props.drop.bind(this)}
                    dragLeave = {this.props.dragLeave.bind(this)}
                    dragEnter = {this.props.dragEnter.bind(this)}
                />
                :
                    <Search
                        data = {this.props.filteredArr} 
                        defaultFolderName = {this.props.defaultFolderName}
                        addFolder = {this.props.addFolder.bind(this)}
                        selectedFolder = {this.props.selectedFolder.bind(this)}
                        selectedFolderId = {this.props.selectedFolderId}
                        receiveEditedName = {this.props.receiveEditedName.bind(this)}
                        delete = {this.props.delete.bind(this)}
                        moveToUrl = {this.props.moveToUrl.bind(this)}
                        currentAddThing = {this.props.currentAddThing}
                        dragStart = {this.props.dragStart.bind(this)}
                        dragOver = {this.props.dragOver.bind(this)}
                        drop = {this.props.drop.bind(this)}
                        dragLeave = {this.props.dragLeave.bind(this)}
                        dragEnter = {this.props.dragEnter.bind(this)}
                    />
                }
            </PostWrapper>
        );
    }
}

export default PostContainer;