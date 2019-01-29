
import { store } from "../store";

export function changeTheme(data) {
  store.dispatch({
    type: "theme",
    data: data
  });
}