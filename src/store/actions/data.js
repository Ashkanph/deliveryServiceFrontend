
import { store } from "../store";

export function setUser(data) {
  store.dispatch({
    type: "user",
    data: data
  });
}

export function userInfo() {
  if(store.getState().data.user == null){
    return null;
  }
  return store.getState().data.user;
}

export function setShipments(data) {
  store.dispatch({
    type: "shipments",
    data: data
  });
}

export function setParcels(data) {
  store.dispatch({
    type: "parcels",
    data: data
  });
}

export function setBikers(data) {
  store.dispatch({
    type: "bikers",
    data: data
  });
}

export function logout() {
  store.dispatch({
    type: "user",
    data: null
  });
}

export function setDataRefreshInterval(data) {
  store.dispatch({
    type: "dataRefreshInterval",
    data: data
  });
}

export function clearDataRefreshInterval(data) {
  let timeInt = store.getState().data.dataRefreshInterval 
  if( timeInt != null){
    clearInterval(timeInt);
  }
}