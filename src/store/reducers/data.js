
export default function reducer(
    state = {
      user: null,
      shipments: [],
      bikers: [],
      parcels: [],
    },
    action) {
      switch (action.type) {
        case "user": {
          return Object.assign({}, state, { user: action.data });
        }
        case "shipments": {
          return Object.assign({}, state, { shipments: action.data });
        }
        case "bikers": {
          return Object.assign({}, state, { bikers: action.data });
        }
        case "parcels": {
          return Object.assign({}, state, { parcels: action.data });
        }
        default: {
          return state;
        }
      }
    };