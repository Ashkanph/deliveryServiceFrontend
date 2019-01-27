
import { store } from "../store";

export function setUser(data) {
  store.dispatch({
    type: "user",
    data: data
  });
}

export function userInfo() {
  if(store.getState().data.user == null){
    console.log('No user in store! userInfo.');
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

export function setBikers(data) {
  store.dispatch({
    type: "bikers",
    data: data
  });
}

export function logout() {
  if(store.getState().data.user == null){
    console.log('No user in store! logout.');
    return;
  }
  store.dispatch({
    type: "user",
    data: null
  });
}