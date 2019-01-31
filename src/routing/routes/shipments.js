import React, {Component} from "react";
import {connect} from "react-redux";
import {ajaxQS, shipmentsCB, bikersCB} from "../../functions/ajax";
import {statusIcon, getPropertyValue} from "../../functions/common";
import {  showErrorMessage,
          showSuccessMessage,
          showErrorStatusMessage } from "../../functions/notificationHandling";
import Myheader from "../components/myheader";
import {restAPIS} from "../../consts";
import { humanizeTimestamp } from "../../functions/datetime";
import {
  Container,
  Dropdown,
  Table,
  Button,
  Divider,
  Icon,
  Header,
  List,
  Label,
} from "semantic-ui-react";

class Shipments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changedAssignee: {},
      statusFilter:{
        WAITING: true, 
        ASSIGNED: true, 
        PICKED_UP: true, 
        DELIVERED: true
      }
    };

    this.createRows           = this.createRows.bind(this);
    this.changeAssignee       = this.changeAssignee.bind(this);
    this.handleAssigneeChange = this.handleAssigneeChange.bind(this);
    this.assigneeElements     = this.assigneeElements.bind(this);
    this.handleStatusFilter   = this.handleStatusFilter.bind(this);
    this.filterShipments      = this.filterShipments.bind(this);
  }

  componentDidMount(){
    ajaxQS("shipments", "GET", null, shipmentsCB);
    ajaxQS("bikers", "GET", null, bikersCB);
  }

  handleAssigneeChange(e, {shipment_id, value}) {
    let changedAssignee = this.state.changedAssignee;
    changedAssignee[shipment_id] = value;
    this.setState({changedAssignee});
  }

  changeAssignee(e, {shipment_id}) {
    if(this.state.changedAssignee[shipment_id] == null){
      showErrorMessage("noAssigneeSelected");
      return;
    }

    let state = this.state,
        queryAddress = restAPIS.shipments + "/" + shipment_id + 
                        "?newAssigneeID=" + state.changedAssignee[shipment_id];

    ajaxQS(queryAddress, "POST", null, 
            function(result){
              if(result.status === 0){
                showSuccessMessage("assigneeChangedSuccessfully");
                delete state.changedAssignee[shipment_id];

                //Set the state, and refresh the list
                this.setState(state, ajaxQS("shipments", "GET", null, shipmentsCB));
              }else
                showErrorStatusMessage(result.status);
            }.bind(this));
  }

  handleStatusFilter(status){
    let state = this.state;
    state.statusFilter[status] = !state.statusFilter[status];
    this.setState(state);
  }

  filterShipments(){
    let { shipments } = this.props,
        {statusFilter} = this.state,
        filteredShipments = [];

    if(shipments != null){
      filteredShipments = shipments.filter(item => {
        return statusFilter[item.status]
      } );
    }
    
    return filteredShipments;
  }

  assigneeElements(item){
      let {bikers} = this.props;
      if(bikers == null || bikers.length === 0)
        return "";

      let assigneeID = getPropertyValue(item, "assigneeID");
      if(assigneeID != ""){
        let index = bikers.findIndex((item)=>item.id === assigneeID);

        return bikers[index].name;
      }

      let bikersOption = bikers != "" ? 
                    bikers.map((item)=>{
                      return { key: item.id, value: item.id, text: item.name };
                    }) : [];

      if(bikersOption.length > 0)
         bikersOption.unshift({ key: null, value: null, text: "Select an assignee" });
          
      return (
        <React.Fragment>
            <Dropdown search selection
                placeholder='Select assignee'
                onChange={this.handleAssigneeChange}
                shipment_id={item.id}
                closeOnChange
                title="Assignee"
                options={bikersOption}/>
        </React.Fragment>
      );
  }

  createRows(){
      let rows = <Table.Row/>,
          filteredData = this.filterShipments();
 
      if (filteredData != null && filteredData.length > 0) {
        rows = 
        filteredData
          .map((item, index) => {
            let icon      = statusIcon(item.status),
                assignee  = this.assigneeElements(item);
                
            return (
                <Table.Row textAlign="center" key={index}>
                  <Table.Cell collapsing>
                    <Icon name={ icon.icon}
                          size="big" 
                          color={icon.color != null ? icon.color : "grey"}
                          title={icon.title} />
                  </Table.Cell>
                  <Table.Cell>
                    <Label title="Origin">
                      Origin
                    </Label>
                      <small>{ item.origin }</small>
                    <Divider className="shortdivider" />
                    <Label title="Destination">
                      Dest.
                    </Label>
                      <small>{ item.destination }</small>
                  </Table.Cell>
                  <Table.Cell>
                    { assignee }
                  </Table.Cell>
                  <Table.Cell>
                    <span title="Pickup time">
                      { humanizeTimestamp(getPropertyValue(item, "pickup")) }
                    </span>
                    <Divider className="shortdivider" />
                   <span title="Delivery time">
                      { humanizeTimestamp(getPropertyValue(item, "delivery")) }
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Button icon="save"
                            shipment_id={item.id}
                            onClick={this.changeAssignee}  
                            disabled={getPropertyValue(item, "assigneeID") != ""}
                            title={ getPropertyValue(item, "assigneeID") == "" ?
                                    "Save selected assignee" : "" }/>
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
                No shipments available!
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
          
          <Myheader pageTitle="Shipments"/>
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
    shipments: getPropertyValue(store, 'data.shipments'),
    bikers: getPropertyValue(store, 'data.bikers')
  };
}

export default connect(setProps)(Shipments);