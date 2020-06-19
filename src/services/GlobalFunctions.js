

const arrToString = (data) => {
    var result = '[';
    data.forEach((el) => {
        var re = '';
        if (typeof el === 'string' || typeof el === 'number') {
            if (typeof el === 'string' && el !== "") {
                re = '"' + el + '"' + ',';
            } else {
                re = el + ',';
            }
        } else {
            re = objectToString(el) + ',';
        }
        result += re;
    });

    result += ']';
    if (result.charAt(result.length - 2) === ',')
        result = result.substr(0, result.length - 2) + result.charAt(result.length - 1);
    return result;
}

const obToString = (data) => {
    var result = '{';
    for (let [key, value] of Object.entries(data)) {
        if (Object.prototype.toString.call(value) === '[object Array]') {
            result += key + ':' + arrToString(value) + ',';
        } else if (Object.prototype.toString.call(value) !== '[object Array]' && typeof value === 'object') {
            result += key + ':' + obToString(value) + ',';
        } else {
            if (value.charAt(0) === '[' || value.charAt(0) === '{' || value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
                result += key + ':' + value + ',';
            }
            else {
                result += key + ':' + '"' + value + '"' + ',';
            }
        }
    }
    result += '}';
    if (result.charAt(result.length - 2) === ',')
        result = result.substr(0, result.length - 2) + result.charAt(result.length - 1);
    return result;
}

export const objectToString = (data) => {
    var result = '';
    if (Object.prototype.toString.call(data) === '[object Array]') {

        result += arrToString(data);
    }

    if (Object.prototype.toString.call(data) !== '[object Array]' && typeof data === 'object') {

        result += obToString(data);
    }
    return result;
}


const setScrollPosition = (elID) => {
    var target = document.getElementById(elID);
    if (target)
        window.scrollTo(0, target.offsetTop - 100);
}

export const scrollToFirstPriorityWar = (warMap, exposedWar) => {

    var firstWar = '';
    if (exposedWar.length === 1) {
        firstWar = exposedWar[0];

    } else if (exposedWar.length === Object.keys(warMap).length) {
        firstWar = Object.keys(warMap)[0];
    } else {
        var resultMap = { Targeting: 10 };
        for (var el of exposedWar) {
            if (warMap[el] < Object.values(resultMap)[0]) {
                const temp = {}
                temp[el] = warMap[el];
                resultMap = Object.assign({}, temp);
            }
        }
        firstWar = Object.keys(resultMap)[0];
    }
    setScrollPosition(firstWar);
}