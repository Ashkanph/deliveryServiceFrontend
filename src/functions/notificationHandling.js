

import { toast } from 'react-toastify';
import messages from '../assets/messages';

export function showSuccessMessage(which) {
    if(which != null)
        toast.success(getMsgText(which), 
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
    if(status == null || messages.errStatusMsg[status] == null)
        status = "default";

    toast.error(messages.errStatusMsg[status].en, 
        {   
            position: "bottom-right",
            rtl: false
        });
}

function getMsgText(which) {
    return messages[which].en;
}