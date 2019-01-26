
/**
 * Check the inputs of a form and show an error message when a required field is not there
 * 
 * @param {array} requiredInputs 
 * @param {object} formInput 
 * @param {function} showErrorMessage 
 */
export function requiredInputsChecker(requiredInputs, formInput, showErrorMessage) {
    for (var i = 0; i < requiredInputs.length; i++) {
        if (formInput[requiredInputs[i]] === undefined || formInput[requiredInputs[i]] === ''){
            
            console.log('Fill the "' + requiredInputs[i] + '" input');
            showErrorMessage('fillTheForm');

            return true;
        }
    }
    return false;
}