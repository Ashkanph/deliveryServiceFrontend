import React, {Component} from "react";
import {connect} from "react-redux";
import {userInfo} from "../../store/actions/data";
import {ajaxQS, parcelsCB} from "../../functions/ajax";
import { humanizeTimestamp } from "../../functions/datetime";
import {statusIcon, getPropertyValue} from "../../functions/common";
import { showErrorMessage, showSuccessMessage,
          showErrorStatusMessage } from "../../functions/notificationHandling";
import Myheader from "../components/myheader";
import {restAPIS} from "../../consts";
import {
  Container,
  Table,
  Button,
  Divider,
  Icon,
  Header,
  Input,
  List
} from "semantic-ui-react";
import DatePicker from "react-datepicker";

class Parcels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datetimes: {},
    };

    this.createRows         = this.createRows.bind(this);
    this.saveDatetime       = this.saveDatetime.bind(this);
    this.handleDatetimeChange = this.handleDatetimeChange.bind(this);
    this.saveDatetime       = this.saveDatetime.bind(this);
  }

  componentDidMount(){
    let bikerID = userInfo().id;
    ajaxQS(restAPIS.parcels + "/" + bikerID, "GET", null, parcelsCB);
  }

  handleDatetimeChange(date, shipment_id, whichone) {
    let datetimes = this.state.datetimes;
    if(datetimes[shipment_id] == null)
        datetimes[shipment_id] = {};
    datetimes[shipment_id][whichone] = date;
    this.setState({datetimes});
  }

  saveDatetime(e, {shipment_id, whichone}) {
    let state = this.state,
        selectedDate = this.state.datetimes[shipment_id] != null ?
                        this.state.datetimes[shipment_id][whichone] : null;

    if(selectedDate == null){
      showErrorMessage("noDatetimeSelected");
      return;
    }

    // Convert selected datetime to milliseconds
    selectedDate = new Date(selectedDate).getTime();

    let queryAddress = restAPIS.shipments + "/" + shipment_id + 
                       "?new" + whichone + "=" + selectedDate;

    ajaxQS(queryAddress, "POST", null, 
            function(result){
              if(result.status === 0){
                showSuccessMessage("datetimeChangedSuccessfully");
                
                // Refresh the list
                let bikerID = userInfo().id;
                ajaxQS(restAPIS.parcels + "/" + bikerID, "GET", null, parcelsCB);
              }else
                showErrorStatusMessage(result.status);
            }.bind(this));
  }

  datetimeElements(item, whichone){
      let datetime = getPropertyValue(item, whichone);
      if(datetime != ""){
        return humanizeTimestamp(datetime);
      }

      let selectedDate = this.state.datetimes[item.id] != null ?
                          this.state.datetimes[item.id][whichone] : null;

      return (
        <React.Fragment>
            <DatePicker
                selected={ selectedDate }
                onChange={date => this.handleDatetimeChange(date, item.id, whichone)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="time"
                placeholderText= { whichone == "pickup" ? "Pickup time" : "Delivery time" }
            />
            <Button icon="save"
                shipment_id={item.id}
                whichone={whichone}
                onClick={this.saveDatetime}  />
        </React.Fragment>
      );
  }

  createRows(){
      let rows = <Table.Row/>,
          {parcels} = this.props,
          filteredData = parcels; //this.filterUsers();
 
      if (filteredData != null && filteredData.length > 0) {
        rows = 
          filteredData
          .map((item, index) => {
            let icon          = statusIcon(item.status),
                pickupTime    = this.datetimeElements(item, "pickup"),
                deliveryTime  = getPropertyValue(item, "pickup") != "" ? 
                                  this.datetimeElements(item, "delivery") : "";
                
            return (
                <Table.Row textAlign="center" key={index}>
                  <Table.Cell collapsing>
                    <Icon bordered name={ icon.icon}
                                   size="big" 
                                   color={icon.color}
                                   title={icon.title} />
                  </Table.Cell>
                  <Table.Cell>
                    <span title="Origin">
                      { item.origin }
                    </span>
                    <Divider className="shortdivider" />
                    <span title="Destination">
                      { item.destination }
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    { pickupTime }
                  </Table.Cell>
                  <Table.Cell>
                    { deliveryTime }
                  </Table.Cell>
                </Table.Row>
              );
            }
          );
      } else {
        rows = (
          <Table.Row >
            <Table.Cell colSpan="4">
              <Header textAlign="center" size='medium'>
                No parcels available!
              </Header>
            </Table.Cell>
          </Table.Row>
        )
      }
      return rows;
  }


  render() {
    let state = this.state,
        tableRow = this.createRows();

    return (
        <React.Fragment>
          
          <Myheader pageTitle="Parcels"/>
          <Container className="text-centered">

            <Table  sortable striped
                    className="parcels-table"
                    style={{ marginTop: "3rem" }}
                    textAlign="left">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan={4} width={10}>
                    <Input icon='search' 
                      placeholder="Search"
                      className="light-color search"
                      name = "usernameSearch" 
                      onChange={this.handleChangeInputValue}/>
                    <Button 
                            onClick={() => this.handleSort('username')}
                            className="secondary-button" 
                            title="Sort"
                            icon circular>
                      <Icon name="sort amount down" />
                    </Button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {tableRow}
              </Table.Body>
            </Table>

            <Divider />

            {/* Icon legend */}
            <List divided horizontal 
                  size="miny" 
                  className="users-legend">
              <List.Item>
                <Icon name="wait" />
                <List.Content>
                  <List.Header>Waiting</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name="tag" />
                <List.Content>
                  <List.Header>Assigned</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <Icon name="motorcycle" />
                <List.Content>
                  <List.Header>Picked up</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
              <Icon name="check" /> 
                <List.Content>
                  <List.Header>Delivered</List.Header>
                </List.Content>
              </List.Item>
            </List>
          </Container>
      
      </React.Fragment>
    );
  }
}

function setProps(store) {
  return {
    parcels: getPropertyValue(store, 'data.parcels')
  };
}

export default connect(setProps)(Parcels);