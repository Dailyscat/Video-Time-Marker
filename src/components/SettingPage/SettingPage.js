import React,{Component} from 'react';
import { Form, Checkbox } from 'semantic-ui-react'
import './SettingPage.css' 

class SettingPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            value: "New Tab"
        }
    }


    componentWillReceiveProps(nextProps){
        this.setState({
            value: nextProps.newTabOpen ? "New Tab" : "Current Tab"
        })
    }
    

    handleChange = (e, { value }) => {
        this.setState({ value },(result)=> {
            let judge;
            if(this.state.value === "New Tab"){
                judge = true;
            }else{
                judge = false;
            }
            
            this.setState({
                value: judge ? "New Tab" : "Current Tab"
            })

            this.props.userSetting(judge);
        })}
    
    render() {
        return (
            <div className="SettingPage none">
            <Form>
                <Form.Field>
                    Selected value: <b>{this.state.value}</b>
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label='New Tab'
                        name='checkboxRadioGroup'
                        value='New Tab'
                        checked={this.state.value === 'New Tab'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label='Current Tab'
                        name='checkboxRadioGroup'
                        value='Current Tab'
                        checked={this.state.value === 'Current Tab'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
            </Form>
            </div>
        );
    }
}

export default SettingPage;