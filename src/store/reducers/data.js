
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
        case "loggedIn": {
          return Object.assign({}, state, { loggedIn: action.data });
        }
        default: {
          return state;
        }
      }
    };