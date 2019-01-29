
export default function reducer(
    state = {
      theme: "dark"
    },
    action) {
      switch (action.type) {
        case "theme": {
          return Object.assign({}, state, { theme: action.data });
        }
        default: {
          return state;
        }
      }
    };