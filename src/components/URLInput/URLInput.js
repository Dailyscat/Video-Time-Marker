import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
import _ from 'lodash';
import './URLInput.css'




class URLInput extends Component {

    constructor(props){
        super(props);

        this.state = {
            markName : '',
            searchText: '',
            addView: true,
        };
    }   

    updateMarkName(ev) {
        this.setState({
            markName: ev.target.value,
        });
    }

    setTimeMarker(){
        if(this.state.markName)this.props.setTimeMarker(this.state.markName);
        this.setState({
            markName: ''
        });
    }

    pushEnterFunction (ev) {
        if (ev.keyCode === 13) {
            this.setTimeMarker.call(this);
        }
    }

    updateSearchInput(ev) {
        if(ev.target){
            this.setState({
                searchText: ev.target.value,
            });
            this.props.searchInputVal(ev.target.value);
        }
    }

    searchInputVal(){
        this.props.searchInputVal(this.state.searchText);
        this.setState({
            searchText: ''
        })
    }

    pushEnterFunctionSearch (ev) {
        if (ev.keyCode == 13) {
            this.searchInputVal.call(this);
        }
    }

    changeView (ev) {
        if(ev.currentTarget.innerText === "Search"){
            ev.target.innerText = "Add";
            this.setState({
                addView: false,
            },() => {this.props.changeView(this.state.addView)})

        }else{
            ev.target.innerText = "Search";
            this.setState({
                addView: true,
            },() => {this.props.changeView(this.state.addView)})
        }
    }

    render() {
        
        return (
            <div className="URLInput">
                <div className = "buttonCase" onClick = {this.changeView.bind(this)} ><a href="#" class="myButton">Search</a></div>
                <Input
                    className = {this.state.addView ? "" : "none"}
                    icon='tags'
                    iconPosition='left'
                    value={this.state.markName}
                    label={{ tag: true, content: 'Add', onClick: this.props.inYoutube ? this.setTimeMarker.bind(this) : ""} }
                    labelPosition='right'
                    placeholder={this.props.inYoutube ? 'Mark Name...' : "Use in VideoPage..." }
                    onChange={this.updateMarkName.bind(this)}
                    onKeyDown = {this.pushEnterFunction.bind(this)}
                    disabled ={!this.props.inYoutube}
                />
                <Input
                    className = {this.state.addView ? "none" : ""}
                    icon='tags'
                    iconPosition='left'
                    value={this.state.searchText}
                    label={{ tag: true, content: 'Search', onClick: this.searchInputVal.bind(this)}}
                    labelPosition='right'
                    placeholder= "Search..."
                    onChange = {this.updateSearchInput.bind(this)}
                    onKeyDown = {this.pushEnterFunctionSearch.bind(this)}
                />
            </div>
        );
    }
}

export default URLInput;
