

import { toast } from 'react-toastify';
import messages from '../assets/messages';

export function showSuccessMessage(which) {
    toast.info(getMsgText(which), 
        {   
            position: "bottom-right" ,
            rtl: false
        });
}

export function showErrorMessage(which) {
    toast.error(getMsgText(which), 
        {   
            position: "bottom-right",
            rtl: false
        });
}

export function showErrorStatusMessage(status) {
    toast.error(messages.errStatusMsg[status], 
        {   
            position: "bottom-right",
            rtl: false
        });
}

function getMsgText(which) {
    return messages[which];
}