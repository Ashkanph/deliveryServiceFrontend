
/**
 * To get nested properties of an object without error when the value object in undefined
 * for example: getPropertyValue(Ashkan, "loneliness.degree") 
 * 
 * @param {Object} object 
 * @param {String} path 
 */
export function getPropertyValue(object, path) {
    if (path == null || object == null) return "";
  
    let stack = path.split("."),
      temp = "";
  
    while (stack.length > 1) {
      temp = object[stack.shift()];
      if (temp == null) return "";
      object = temp;
    }
  
    temp = object[stack.shift()];
  
    if (temp == null) return "";
  
    return temp;
  }

export function statusIcon(status) {
  let result = {
    icon: "",
    color: "",
    title: ""
  };
  if(status == null || status == "")
    return result;
  
  switch (status) {
    case "WAITING":
      result.icon = "wait";
      result.color = "red";
      result.title = "Waiting";
      break;
    case "ASSIGNED":
      result.icon = "tag";
      result.title = "Assigned";
      break;
    case "PICKED_UP":
      result.icon = "motorcycle";
      result.title = "Picked up";
      break;
    case "DELIVERED":
      result.icon = "check circle";
      result.color = "green";
      result.title = "Delivered";
      break;
  
    default:
      return result;
  }

  return result;
}
  