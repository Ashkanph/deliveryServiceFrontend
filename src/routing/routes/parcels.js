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
  List
} from "semantic-ui-react";
import DatePicker from "react-datepicker";

class Parcels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datetimes: {},
      statusFilter:{
        WAITING: true, 
        ASSIGNED: true, 
        PICKED_UP: true, 
        DELIVERED: true
      }
    };

    this.createRows         = this.createRows.bind(this);
    this.saveDatetime       = this.saveDatetime.bind(this);
    this.handleDatetimeChange = this.handleDatetimeChange.bind(this);
    this.saveDatetime       = this.saveDatetime.bind(this);
    this.handleStatusFilter = this.handleStatusFilter.bind(this);
    this.filterParcels      = this.filterParcels.bind(this);
  }

  componentDidMount(){
    let bikerID = userInfo().id;
    ajaxQS(restAPIS.parcels + "/" + bikerID, "GET", null, parcelsCB);
  }

  handleStatusFilter(status){
    let state = this.state;
    state.statusFilter[status] = !state.statusFilter[status];
    this.setState(state);
  }

  filterParcels(){
    let { parcels } = this.props,
        {statusFilter} = this.state,
        filteredParcels = [];

    if(parcels != null){
      filteredParcels = parcels.filter(item => {
        return statusFilter[item.status]
      } );
    }
    
    return filteredParcels;
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
        </React.Fragment>
      );
  }

  createRows(){
      let rows = <Table.Row/>,
          filteredData = this.filterParcels();
 
      if (filteredData != null && filteredData.length > 0) {
        rows = 
          filteredData
          .map((item, index) => {
            let icon          = statusIcon(item.status),
                pickupTime    = this.datetimeElements(item, "pickup"),
                whichone      = getPropertyValue(item, "pickup") != "" ?
                                  "delivery" : "pickup",
                disableSaveBtn = getPropertyValue(item, "pickup") != "" &&
                                 getPropertyValue(item, "delivery") != "",
                deliveryTime  = getPropertyValue(item, "pickup") != "" ? 
                                  this.datetimeElements(item, "delivery") : "";
                
            return (
                <Table.Row textAlign="center" key={index}>
                  <Table.Cell collapsing>
                    <Icon name={ icon.icon}
                          size="big" 
                          color={icon.color != null ? icon.color : "grey"}
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
                  <Table.Cell>
                    <Button icon="save"
                        shipment_id={item.id}
                        whichone={whichone}
                        title={"Save " + whichone + " time"}
                        onClick={this.saveDatetime}  
                        disabled = {disableSaveBtn} />
                  </Table.Cell>
                </Table.Row>
              );
            }
          );
      } else {
        rows = (
          <Table.Row >
            <Table.Cell colSpan="5">
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
    let tableRow = this.createRows(),
        { WAITING, ASSIGNED, PICKED_UP, DELIVERED } = this.state.statusFilter;


    return (
        <React.Fragment>
          
          <Myheader pageTitle="Parcels"/>
          <Container>

            <Table  stackable striped
                    style={{ marginTop: "4rem" }}
                    textAlign="center">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan={5} width={16}>
                    <Button floated="right"
                            onClick={() => this.handleStatusFilter('DELIVERED')}
                            className="filter-status-btn"
                            title="Filter delivered"
                            color={ DELIVERED ? "teal" : "grey" }
                            icon circular>
                      <Icon name="check" />
                    </Button>
                    <Button floated="right"
                            onClick={() => this.handleStatusFilter('PICKED_UP')}
                            className="filter-status-btn"
                            title="Filter pickedup"
                            color={ PICKED_UP ? "teal" : "grey" }
                            icon circular>
                      <Icon name="motorcycle" />
                    </Button>
                    <Button floated="right"
                            onClick={() => this.handleStatusFilter('ASSIGNED')}
                            className="filter-status-btn"
                            title="Filter assigned"
                            color={ ASSIGNED ? "teal" : "grey" }
                            icon circular>
                      <Icon name="tag" />
                    </Button>
                    <Button floated="right"
                            onClick={() => this.handleStatusFilter('WAITING')}
                            className="filter-status-btn"
                            title="Filter waiting"
                            color={ WAITING ? "teal" : "grey" }
                            icon circular>
                      <Icon name="wait" />
                    </Button>
                  </Table.HeaderCell>
                  <Divider  hidden/>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {tableRow}
              </Table.Body>

              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan={5} textAlign="center">
                    {/* Icons' legend */}
                    <List divided horizontal 
                          size="small" 
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
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>

            </Table>

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