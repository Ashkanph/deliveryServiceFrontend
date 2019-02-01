
import { restAPIS } from '../consts';
import {setShipments, setBikers, setParcels, userInfo} from "../store/actions/data";


export function bikersCB(result){
    if(result.status === 0)
        setBikers(result.bikers);
}

export function shipmentsCB(result){
    if(result.status === 0)
        setShipments(result.shipments);
}

export function parcelsCB(result){
    if(result.status === 0)
        setParcels(result.parcels);
}

/**
 * Send a http request with query string
 * 
 * @param {string} name 
 * @param {string} requestType 
 * @param {object} inputs 
 * @param {function} cb 
 */
export function ajaxQS(name, requestType, inputs, cb) {
    if (name == "") {
        console.log('error! Name is empty.');
        return;
    }

    let xhttp       = new XMLHttpRequest(),
        addr        = restAPIS[name];
    
    if(addr == null)
        addr = name;
    
    if(inputs != null){
            addr += "?";
        let inputKeys = Object.keys(inputs); 
        for (let i=0; i<inputKeys.length; i++) {
            if(i > 0)
                addr += "&";
            let q = inputKeys[i] + "=" + inputs[inputKeys[i]];
            addr += q;
        }
    }

    xhttp.open(requestType, addr);
    if(name != "login"){
        if(userInfo() == null)
            return;
        xhttp.setRequestHeader("authorization", "JWT " + userInfo().token);
    }

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
    xhttp.send(null);
}