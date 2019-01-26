import React, {Component} from "react";
import {connect} from "react-redux";

import { getPropertyValue } from "../../functions/common";

class APP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: {
        un: "",
        pw: "",
        rememberMe: false
      },
      avatar: null,
      newUser: true
    };
    this.requiredInputs = ["un", "pw"];
  }

  render() {

    let state     = this.state;
    return (
        <h1>
            Salaaaaaaaaaaaaam
        </h1>
    );
  }
}

function setProps(store) {
  return {
    data: store.data,
    loggedIn: getPropertyValue(store, 'data.loggedIn')
  };
}

export default connect(setProps)(APP);