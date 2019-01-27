
export const pages = {
    'managerDefaultPage' : {
        'hash': '/shipments',
    },
    'bikerDefaultPage' : {
        'hash': '/parcels',
    },
    'DefaultPage' : {
        'hash': '/login',
    },
    'login' : {
        'hash': '/login',
    },
    'parcels' : {
        'hash': '/parcels',
    },
    'shipments' : {
        'hash': '/shipments',
    },
};

const restAPIS = {
      "mainAddress": "http://127.0.0.1:3000/"
    };

restAPIS.queryAddress   = restAPIS.mainAddress  + "api/v1.0.0/";
restAPIS.login          = restAPIS.queryAddress + "login";
restAPIS.shipments      = restAPIS.queryAddress + "shipments";
restAPIS.bikers         = restAPIS.queryAddress + "bikers";

export {restAPIS};