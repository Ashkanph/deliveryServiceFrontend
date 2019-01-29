import React, {Component} from "react";
import { getPropertyValue } from "../../functions/common";
import { requiredInputsChecker } from "../../functions/form-validation";
import { ajaxQS } from "../../functions/ajax";
import { showErrorMessage, 
         showErrorStatusMessage } from "../../functions/notificationHandling";
import { setUser } from "../../store/actions/data";
import history from "../components/history";
import {pages} from "../../consts";

import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: {
        un: "",
        pw: ""
      },
    };
    this.requiredInputs = ["un", "pw"];

    this.handleChangeInputValue = this
      .handleChangeInputValue
      .bind(this);
    this.loginSubmit = this
      .loginSubmit
      .bind(this);
  }

  handleChangeInputValue(e, {name, value}) {
    let inputValue = this.state.inputValue;
    inputValue[name] = value;
    this.setState({inputValue});
  }

  loginSubmit() {
    let input = this.state.inputValue;

    if (requiredInputsChecker(this.requiredInputs, input, showErrorMessage))
      return;
      
    ajaxQS("login", "POST", {username: input.un, password: input.pw}, 
           (result)=>{
                if(result.status === 0){
                    setUser({
                        name: result.name,
                        username: result.username,
                        role: result.role,
                        id: result.id,
                        token: result.token
                    });
                    
                    history.push(pages[result.role + "DefaultPage"].hash);
                }else
                    showErrorStatusMessage(result.status);
            });
  }

  render() {

    let state = this.state;
    return (
        <div className='login-form'>
            <style>{
                `body > div,
                body > div > div,
                body > div > div > div.login-form {
                    height: 100%;
                }
            `}</style>
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450, margin: "0 10px" }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Delivery Service
                    </Header>
                    <Form onSubmit={this.loginSubmit} size='large'>
                        <Segment stacked>
                            <Form.Input 
                                fluid 
                                icon='user' 
                                iconPosition='left' 
                                name="un"
                                onChange={this.handleChangeInputValue}
                                placeholder='Username' />
                            <Form.Input
                                fluid
                                icon='lock'
                                name="pw"
                                onChange={this.handleChangeInputValue}
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                />

                            <Button color='teal' fluid size='large'>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    );
  }
}

export default Login;