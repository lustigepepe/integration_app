import { bidder } from './Helpers';


//ROP

const rop = {
    "120x600": "2146125",
    "160x600": "2146128",
    "200x600": "2146127",
    "300x100": "3562558",
    "300x250": "2146130",
    "300x250": "3562949",
    "300x50": "3562561",
    "300x600": "2146129",
    "320x100": "3561911",
    "320x480": "3562349",
    "320x50": "3562953",
    "728x90": "3889479",
    "800x250": "3889481",
    "970x250": "2146124",
    "970x90": "2146126"
}



//news
const orNot = {
    "120x600": "2227039",
    "160x600": "2227040",
    "200x600": "2227038",
    "300x100": "3562555",
    "300x250": "2146133",
    "300x250": "3889480",
    "300x50": "3563072",
    "300x600": "3889482",
    "320x100": "2146134",
    "320x480": "3562552",
    "320x50": "3561904",
    "728x90": "2227036",
    "800x250": "2227037",
    "970x250": "2227035",
    "970x90": "2455011"
}

//criteo
var sizesInConfig = [{
    size: '300x250',
    pl: 'medrect1'
}, {
    size: '300x250',
    pl: 'medrect2'
}, {
    size: '728x90',
    pl: 'leader'
}, {
    size: '320x100',
    pl: 'leader'
}]


//hier slot Definitionen rein:
var slots = [
    {
        unit: "leaderboard",
        initiallyExpanded: true,
        size: [
            [728, 90], [300, 50], [300, 100], [320, 50], [320, 100]
        ],
        sizeMapping: [
            [[0, 0], [[300, 50], [300, 100], [320, 50], [320, 100]]],
            [[601, 0], [[1, 1], [728, 90]]]
        ],
        targeting: {
            pos: "ATF"
        }
    },
    {
        unit: "medrect1",
        initiallyExpanded: true,
        size: [
            [300, 250], 'fluid'
        ],
        sizeMapping: [
            [[0, 0], [[300, 50], [300, 250], [300, 100], [320, 50], [320, 100], 'fluid']],
            [[601, 0], [[1, 1], [300, 250]]]
        ]
    },
    {
        unit: "medrect2",
        initiallyExpanded: true,
        size: [
            [300, 250], 'fluid'
        ]
    },
    {
        unit: "post-site-ad",
        size: "out-of-page"
    },
    {
        unit: "medrect1-mobile",
        initiallyExpanded: true,
        size: [
            [300, 250]
        ],
        sizeMapping: [
            [[0, 0], [[300, 250]]],
            [[768, 0], []]
        ]
    }
]

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
}

const generateParamAttributes = (params, bidderName, pageName) => {

    params.placementnameing = '';
    params.addStringtocall = [];

    switch (bidderName) {

        case bidder.CRITEO:
            params.addStringtocall.push(['networkId', 3724], ['publisherSubId', pageName]);
            break;
        case bidder.YIELDLAB:
            params.placementnameing = 'adslotId';
            params.addStringtocall.push(['supplyId', 2117490], ['extId', pageName]);
            break;
    }
}
const createBidderConfigOb = (bidderName, sizes, pageName) => {

    var bidderConfObject = {};
    var params = {}
    params.sizes = sizes;
    generateParamAttributes(params, bidderName, pageName)
    bidderConfObject.bidder = bidderName;
    bidderConfObject.params = params;

    return bidderConfObject;
}

const criteoTrans = (config, pageName) => {
    config.forEach(el => {
        delete el.id;
    });

    return createBidderConfigOb(bidder.CRITEO, config, pageName);
}

const yieldlabTrans = (input, yieldlabIds) => {
    const { config, slots, pageName } = input;
    var sizes = [];

    config.forEach(function (item) {
        //console.log("checking " + item.pl)
        slots.forEach(
            function (elem) {
                var abort = false;
                if (elem.unit.indexOf(item.pl) > -1) {
                    //console.log("check for elem successful. checking sizes")
                    //console.log(elem)
                    //check for sizeMappings
                    if (elem.sizeMapping) {

                        for (var i = 0; i < elem.sizeMapping.length && !abort; i++) {
                            //console.log("checking row "+ (i+1)+" of "+elem.sizeMapping.length)
                            var row = elem.sizeMapping[i][1];

                            //eigene Funktion machen, wird sowohl bei SizeMapping ohne benutzt
                            for (var k = 0; k < row.length && !abort; k++) {
                                var currSize = row[k][0].toString() + "x" + row[k][1].toString();
                                if (currSize == item.size) {
                                    //console.log("configSize in row. pushing to variable and abort loop");

                                    var abort = true;
                                    var rowArr = []
                                    row.forEach(function (rowSize) {
                                        rowArr.push(rowSize[0].toString() + "x" + rowSize[1].toString())
                                    })

                                    for (var z = 0; z < rowArr.length; z++) {
                                        if (yieldlabIds[rowArr[z]]) {
                                            var newObj = {}
                                            newObj.size = item.size;
                                            newObj.pl = item.pl;
                                            newObj.id = yieldlabIds[rowArr[z]]
                                            newObj.bidderSize = rowArr[z]

                                            //braucht rework
                                            if (!containsObject(newObj, sizes)) {
                                                sizes.push(newObj);
                                            }

                                            //console.log("pushing obj");

                                        }
                                    }
                                }
                            }
                        }
                    }
                    //no sizeMapping
                    else if (!elem.sizeMapping && elem.size && Array.isArray(elem.size)) {
                        var row = elem.size;
                        //eigene Funktion machen, wird sowohl bei SizeMapping ohne benutzt
                        for (var k = 0; k < row.length; k++) {
                            var currSize = row[k][0].toString() + "x" + row[k][1].toString();
                            if (currSize == item.size) {
                                //console.log("config in row. pushing to variable");

                                if (sizes.length == 0) {
                                    sizes.push(item)
                                }
                                else if (!sizes.includes(item)) {
                                    sizes.push(item)
                                }

                                if (sizes.includes(item)) {
                                    // match YL sizes
                                    for (var z = 0; z < row.length; z++) {
                                        var ylcheckSize = row[z][0].toString() + "x" + row[z][1].toString();
                                        if (yieldlabIds[ylcheckSize]) {
                                            if (typeof item.id == "undefined") {
                                                item.id = yieldlabIds[ylcheckSize];
                                                item.bidderSize = ylcheckSize;
                                            }
                                            //falls bereits geschrieben, erstelle neues Objekt.
                                            else {
                                                var newObj = {}
                                                newObj.size = item.size;
                                                newObj.pl = item.pl;
                                                newObj.id = yieldlabIds[ylcheckSize];
                                                newObj.bidderSize = ylcheckSize;
                                                console.log('second: ', yieldlabIds[rowArr[z]])

                                                sizes.push(newObj);
                                            }

                                        }
                                    }
                                }

                            }
                        }

                    }

                }
            })
    })
    return createBidderConfigOb(bidder.YIELDLAB, sizes, pageName);
}



const translate = (input, sspName, ropOrNot) => {
    var bidderConfigYL = [];
    const yieldlabIds = ropOrNot ? rop : orNot;
    switch (sspName) {
        case bidder.ALL:
            bidderConfigYL.push(criteoTrans([...input.config], input.pageName));
            bidderConfigYL.push(yieldlabTrans(input, yieldlabIds));
            break;
        case bidder.YIELDLAB:
            bidderConfigYL.push(yieldlabTrans(input, yieldlabIds));
            break;
        case bidder.CRITEO:
            bidderConfigYL.push(criteoTrans([...input.config], input.pageName));
            break;
    }

    return bidderConfigYL;
}


function getUnique(arr, comp) {

    const unique = arr
        .map(e => e[comp])

        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);

    return unique;
}

const configReducer = (input, sspName, ropOrNot) => {

    let bidderConfigYL = translate(input, sspName, ropOrNot);
    var preConfig = bidderConfigYL.reduce(function (accumulator, current) {
        if (checkIfAlreadyExist(current)) {
            return accumulator
        } else {
            return accumulator.concat([current]);
        }
        function checkIfAlreadyExist(currentVal) {
            return accumulator.some(function (item) {
                return (item.size === currentVal.size &&
                    item.id === currentVal.id &&
                    item.pl === currentVal.pl &&
                    item.bidderSize === currentVal.bidderSize
                );
            });
        }
    }, []);

    return bidderConfigYL;
}


const configGeneration = (input = { config: [], slots: [], pageName: "" }, sspName = "criteo", ropOrNot = true) => {

    let preConfig = configReducer(input, sspName, ropOrNot);
    var beforeReplace = JSON.stringify(preConfig);

    return beforeReplace;
}


export { configGeneration }