import React, {Component} from "react";
import {connect} from "react-redux";
import {ajaxQS, shipmentsCB, bikersCB} from "../../functions/ajax";
import {statusIcon, getPropertyValue} from "../../functions/common";
import { showSuccessMessage,
         showErrorStatusMessage } from "../../functions/notificationHandling";
import Header from "../components/header";
import {restAPIS} from "../../consts";
import {
  Container,
  Dropdown,
  Table,
  Button,
  Divider,
  Icon,
  Input,
  List
} from "semantic-ui-react";

class Shipments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changedAssignee: {}
    };

    this.createRows           = this.createRows.bind(this);
    this.changeAssignee       = this.changeAssignee.bind(this);
    this.handleAssigneeChange = this.handleAssigneeChange.bind(this);
    this.assigneeElements     = this.assigneeElements.bind(this);
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
    let state = this.state,
        queryAddress = restAPIS.shipments + "/" + shipment_id + 
                        "?newAssigneeID=" + state.changedAssignee[shipment_id];

    ajaxQS(queryAddress, "POST", null, 
            function(result){
              if(result.status === 0){
                showSuccessMessage("assigneeChangedSuccessfully");
                delete state.changedAssignee[shipment_id];
                this.setState(state, ajaxQS("shipments", "GET", null, shipmentsCB));
              }else
                showErrorStatusMessage(result.status);
            }.bind(this));
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
            <Button icon="save"
                shipment_id={item.id}
                onClick={this.changeAssignee}  />
        </React.Fragment>
      );
  }

  createRows(){
      let rows = <Table.Row/>,
          {shipments, bikers} = this.props,
          filteredData = shipments; //this.filterUsers();
 
      if (filteredData != null && filteredData.length > 0) {
        rows = 
        this.props.shipments
          .map((item, index) => {
            let icon      = statusIcon(item.status),
                assignee  = this.assigneeElements(item);
                
            return (
                <Table.Row textAlign="center" key={index}>
                  <Table.Cell>
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
                    { assignee }
                  </Table.Cell>
                  <Table.Cell>
                    <span title="Pickup time">
                      { getPropertyValue(item, "pickup") }
                    </span>
                    <Divider className="shortdivider" />
                   <span title="Delivery time">
                      { getPropertyValue(item, "delivery") }
                    </span>
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
                No shipments available!
              </Header>
            </Table.Cell>
          </Table.Row>
        )
      }
      return rows;
  }


  render() {
    let state = this.state,
        { shipments, bikers } = this.props,
        tableRow = this.createRows();

    return (
        <React.Fragment>
          
          <Header pageTitle="Shipments"/>
          <Container className="text-centered">

            <Table  sortable striped
                    className="shipments-table"
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
    shipments: getPropertyValue(store, 'data.shipments'),
    bikers: getPropertyValue(store, 'data.bikers')
  };
}

export default connect(setProps)(Shipments);