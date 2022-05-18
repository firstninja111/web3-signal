const convertDateStringToDateTime = (datestr)=>{ // ex: Sun May 22 2022 00:00:00 GMT+0900 (Japan Standard Time)
    let _date = new Date(datestr);
    let year = _date.getFullYear();
    let mm = _date.getMonth() + 1;
    let dd = _date.getDate();
    let hh = _date.getHours();
    let mins = _date.getMinutes();
    let secs = _date.getSeconds();
    let mm_str = mm > 9 ? `${mm}`: `0${mm}`;
    return year + "-" + (mm > 9 ? `${mm}`: `0${mm}`) 
    + "-" + (dd > 9 ? `${dd}`: `0${dd}`) + " " 
    + (hh > 9 ? `${hh}`: `0${hh}`) + ":"
    + (mins > 9 ? `${mins}`: `0${mins}`) + ":"
    + (secs > 9 ? `${secs}`: `0${secs}`)
}

export {
    convertDateStringToDateTime
}