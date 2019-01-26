
import { userInfo }   from "../store/actions/data";

const pageAccess = {
    orders:          ['manager'],
};

/**
 * A function to check the access of the current user to the page
 * 
 * @param {string} page 
 */
export function checkAccess(page) {
    let userRole = userInfo().role;

    if(pageAccess[page].indexOf(userRole) > -1)
        return true;

    return false;
}