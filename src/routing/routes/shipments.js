import React, {Component} from "react";
import {setShipments, setBikers, userInfo} from "../../store/actions/data";
import {ajaxQS} from "../../functions/ajax";
import { showErrorMessage, 
          showErrorStatusMessage } from "../../functions/notificationHandling";

class Shipments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: {
      },
    };
  }

  componentDidMount(){
    ajaxQS("shipments", "GET", null, 
          {
            authorization: "JWT " + userInfo().token
          }, (result)=>{
              if(result.status === 0){
                  setShipments(result.shipments);
              }else
                  showErrorStatusMessage(result.status);
          });
    ajaxQS("bikers", "GET", null, 
          {
            authorization: "JWT " + userInfo().token
          }, (result)=>{
              if(result.status === 0){
                  setBikers(result.bikers);
              }else
                  showErrorStatusMessage(result.status);
          });
  }


  render() {

    let state = this.state;
    return (
        <div>
            Shipments
        </div>
    );
  }
}

export default Shipments;