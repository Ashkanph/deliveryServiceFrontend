
import { userInfo }   from "../store/actions/data";

const pageAccess = {
    shipments:          ["manager"],
    parcels:            ["biker"],
};

/**
 * A function to check the access of the current user to the page
 * 
 * @param {string} page 
 */
export function checkAccess(page) {
    let userRole = userInfo() != null ?
                    userInfo().role : null;

    if(userRole != null && pageAccess[page].indexOf(userRole) > -1)
        return true;

    return false;
}