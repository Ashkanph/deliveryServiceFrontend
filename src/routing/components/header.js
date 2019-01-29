import React, {Component} from 'react'
import {
    Header,
    Grid,
    Button,
    Icon
} from "semantic-ui-react";
import { logout } from "../../store/actions/data";

// import ThemeSelector from "../../frontend-3rdparties/React/semanticui/themeSelector/themeSelector";

class MyHeader extends Component {

    render() {
        var { pageTitle } = this.props
        return (
            <div className="myheader">
                <Header floated="left">
                    {pageTitle}
                </Header>
                <Button icon color="red"
                        floated="right"
                        onClick={e => {
                            logout();
                        }}
                        title="Logout">
                    <Icon   name="log out" 
                            size="large" 
                            className="white-color"
                            style={{fontSize: '1.2rem'}}/>
                </Button>
                {/* <Grid> 
                    <Grid.Column
                        floated="left"
                        verticalAlign="middle">
                        <Header>
                            {pageTitle}
                        </Header>
                    </Grid.Column>
                    <Grid.Column
                        floated="right"
                        verticalAlign="middle">
                        <Button icon color="red"
                                onClick={e => {
                                    logout();
                                }}
                                title="Logout">
                            <Icon   name="log out" 
                                    size="large" 
                                    className="white-color"
                                    style={{fontSize: '1.2rem'}}/>
                        </Button>
                        <ThemeSelector />
                    </Grid.Column>
                </Grid> */}
            </div>
        )
    }
}

export default MyHeader;