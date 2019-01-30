
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
      "mainAddress": setting.backendMainAddress
    };

restAPIS.queryAddress   = restAPIS.mainAddress  + "api/v1.0.0/";
restAPIS.login          = restAPIS.queryAddress + "login";
restAPIS.shipments      = restAPIS.queryAddress + "shipments";
restAPIS.bikers         = restAPIS.queryAddress + "bikers";
restAPIS.parcels        = restAPIS.queryAddress + "parcels";
restAPIS.changeAssignee = restAPIS.queryAddress + "shipments/";
restAPIS.logout         = restAPIS.queryAddress + "logout";

export {restAPIS};