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
                    addFolder = {this.props.addFolder.bind(this)}
                    selectedFolder = {this.props.selectedFolder.bind(this)}
                    selectedFolderId = {this.props.selectedFolderId}
                />
            </PostWrapper>
        );
    }
}

export default PostContainer;