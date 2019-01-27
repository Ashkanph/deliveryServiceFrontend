
export default function reducer(
    state = {
      user: null,
      loggedIn: false
    },
    action) {
      switch (action.type) {
        case "user": {
          return Object.assign({}, state, { user: action.data });
        }
        case "shipments": {
          return Object.assign({}, state, { shipments: action.data });
        }
        default: {
          return state;
        }
      }
    };