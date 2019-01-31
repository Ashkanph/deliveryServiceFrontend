
export function humanizeTimestamp(ts, dateDelimeter, timeDelimeter) {
    if (ts == null || ts === '') 
        return '-';
    
    dateDelimeter = dateDelimeter || setting.dateDelimeter;
    timeDelimeter = timeDelimeter || setting.timeDelimeter;

    ts = new Date(ts);

	let year    = ts.getFullYear(),
		month   = addZero(ts.getMonth() + 1),
		day     = addZero(ts.getDate()),
		hour    = addZero(ts.getHours()),
        min     = addZero(ts.getMinutes());
        
	let result =
		year + dateDelimeter + month + dateDelimeter + day + ' ' +
		hour + timeDelimeter + min;

	return result;
}

function addZero(number) {
	return number < 10 ? '0' + number : number;
}