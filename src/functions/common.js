
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
  