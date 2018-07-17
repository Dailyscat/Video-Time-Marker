import React, {Component} from 'react';
import { PostWrapper, URLInput, Post } from '../../components/index';



class PostContainer extends Component {
    render() {
        return (
            <PostWrapper>
                <URLInput 
                    setTimeMarker = {this.props.setTimeMarker.bind(this)}
                     />
                <Post
                    data = {this.props.data} 
                    defaultFolderName = {this.props.defaultFolderName}
                    addFolder = {this.props.addFolder.bind(this)}
                    selectedFolder = {this.props.selectedFolder.bind(this)}
                    selectedFolderId = {this.props.selectedFolderId}
                    receiveEditedName = {this.props.receiveEditedName.bind(this)}
                    delete = {this.props.delete.bind(this)}
                />
            </PostWrapper>
        );
    }
}

export default PostContainer;