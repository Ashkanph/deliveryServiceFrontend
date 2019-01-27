
import { restAPIS } from '../consts'

/**
 * Send a http request with query string
 * 
 * @param {string} name 
 * @param {object} fromInput 
 * @param {function} cb 
 * @param {object} requestHeaders 
 */
export function ajaxQS(name, requestType, inputs, requestHeaders, cb) {
    if (name == "") {
        console.log('error! Name is empty.');
        return;
    }

    let xhttp       = new XMLHttpRequest(),
        addr        = restAPIS[name];
    
    if(inputs != null){
            addr += "?";
        let inputKeys = Object.keys(inputs); 
        for (let i=0; i<inputKeys.length; i++) {
            if(i > 0)
                addr += "&";
                let q = inputKeys[i] + "=" + inputs[inputKeys[i]];
                addr += q;
            }
        }

    xhttp.open(requestType, addr);
    if(requestHeaders != null)
        for (var key in requestHeaders) {
            xhttp.setRequestHeader(key, requestHeaders[key]);
        }

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
            // console.log(JSON.parse(this.responseText));
        }
    };
    xhttp.send(null);
}

/**
 * Send a put http request to add items
 * 
 * @param {string} name 
 * @param {object} fromInput 
 * @param {function} callback 
 * @param {object} requestHeaders 
 */
export function ajax(name, fromInput, callback, that, requestHeaders) {
    if (name == "") {
        console.log('error! Name is empty.');
        return;
    }
 
    console.log(fromInput);


    let xhttp       = new XMLHttpRequest(),
        addr        = restAPIS[name],
        formData    = new FormData();

    xhttp.open("put", addr, true);

    if(requestHeaders !== null)
        for (var key in requestHeaders) {
            xhttp.setRequestHeader(key, requestHeaders[key]);
        }

    for (var key in fromInput)
        // Must check the type too (===), because originality can be false
        if(fromInput[key] !== ""){            
            formData.append(key, fromInput[key]);
        }

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(this.responseText), that);
            console.log(JSON.parse(this.responseText));
        }else{
            that.setState({ simpleWait: false });
        }
    };
    xhttp.send(formData);
    // xhttp.send(JSON.stringify(fromInput));
}


/**
 * Send a Get http request to get items
 *
 * @param {string} name
 * @param {function} callback
 */
export function getAjax(name, callback, queryString) {
    let xhttp,
        addr = restAPIS[name] + queryString;
    if (name == "") {
        console.log('error! Name is empty.');
        return;
    }
    
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", addr, true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(this.responseText));
        }
    };
    xhttp.send(null);
}

// /**
//  * Send a put http request to add items
//  * 
//  * @param {string} name 
//  * @param {object} fromInput 
//  * @param {function} callback 
//  * @param {object} requestHeaders 
//  */
// export function getAjax(name, fromInput, callback, that, requestHeaders) {
//     if (name == "") {
//         console.log('error! Name is empty.');
//         return;
//     }
 
// console.log(fromInput);


//     let xhttp       = new XMLHttpRequest(),
//         addr        = restAPIS[name],
//         formData    = new FormData();

//     xhttp.open("PUT", addr, true);

//     if(requestHeaders != null)
//         for (var key in requestHeaders) {
//             xhttp.setRequestHeader(key, requestHeaders[key]);
//         }

//     for (var key in fromInput)
//         formData.append(key, fromInput[key]);

//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             callback(JSON.parse(this.responseText), that);
//             console.log(JSON.parse(this.responseText));
//         }
//     };
//     xhttp.send(formData);
//     // xhttp.send(JSON.stringify(fromInput));
// }