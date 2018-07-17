import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import './URLInput.css'




class URLInput extends Component {

    constructor(props){
        super(props);

        this.state = {
            markName : ''
        };
    }   

    updateMarkName(ev) {
        this.setState({
            markName: ev.target.value
        });
    }

    setTimeMarker(){
        this.props.setTimeMarker(this.state.markName);
        this.setState({
            markName: ''
        });
    }

    pushEnterFunction (ev) {
        if (ev.keyCode === 13) {
            this.setTimeMarker.call(this);
        }
    }

    render() {
        
        return (
            <div className="URLInput">
                <Input
                    icon='tags'
                    iconPosition='left'
                    value={this.state.markName}
                    label={{ tag: true, content: 'Add', onClick: this.setTimeMarker.bind(this)}}
                    labelPosition='right'
                    placeholder='Mark Name...'
                    onChange={this.updateMarkName.bind(this)}
                    onKeyDown = {this.pushEnterFunction.bind(this)}
                />
            </div>
        );
    }
}

export default URLInput;
