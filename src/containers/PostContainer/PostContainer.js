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
                    currentAddFolder = {this.props.currentAddFolder}
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
                        currentAddFolder = {this.props.currentAddFolder}
                    />
                }
            </PostWrapper>
        );
    }
}

export default PostContainer;