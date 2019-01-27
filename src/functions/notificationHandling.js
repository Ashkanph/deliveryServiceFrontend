

import { toast } from 'react-toastify';
import messages from '../assets/messages';

export function showSuccessMessage(which) {
    if(which != null)
        toast.info(getMsgText(which), 
            {   
                position: "bottom-right" ,
                rtl: false
            });
}

export function showErrorMessage(which) {
    if(which != null)
        toast.error(getMsgText(which), 
        {   
            position: "bottom-right",
            rtl: false
        });
}

export function showErrorStatusMessage(status) {
    if(status != null)
        toast.error(messages.errStatusMsg[status].en, 
            {   
                position: "bottom-right",
                rtl: false
            });
}

function getMsgText(which) {
    return messages[which].en;
}