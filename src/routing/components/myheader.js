import React, {Component} from 'react'
import {
    Header,
    Grid,
    Button,
    Icon
} from "semantic-ui-react";
import { logout, clearDataRefreshInterval } from "../../store/actions/data";
import { ajaxQS } from '../../functions/ajax';
import { pages } from '../../consts';
import history from './history';

class MyHeader extends Component {

    render() {
        var { pageTitle } = this.props
        return (
            <div className="myheader">
                <Header floated="left"
                        className="header-title">
                    {pageTitle}
                </Header>

                <Button icon color="red"
                        floated="right"
                        className="logout-btn"
                        onClick={e => {
                            ajaxQS("logout", "GET", null, (result) => {
                                logout();
                                history.push(pages.login.hash);
                                clearDataRefreshInterval();
                            })
                        }}
                        title="Logout">
                    <Icon   name="log out" 
                            size="small" 
                            className="white-color"
                            style={{fontSize: '1.2rem'}}/>
                </Button>
            </div>
        )
    }
}

export default MyHeader;