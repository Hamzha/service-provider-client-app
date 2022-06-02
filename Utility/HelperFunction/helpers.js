export function diff_minutes(t2, t1) {
    var diff = (t2 - t1) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}

export function object_to_string(obj) {
    var str = '';
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            str += key + '=' + obj[key] + '&';
        }
    }
    return str;
}