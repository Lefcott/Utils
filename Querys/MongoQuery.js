var year = 2019, month = 12;
var nextYear = month === 12 ? (year + 1) : year;
var nextMonth = month === 12 ? 01 : (month + 1)
month = month < 10 ? ('0' + month) : month;
nextMonth = nextMonth < 10 ? ('0' + nextMonth) : nextMonth;
var lastDates = {};
var arr = db.getCollection('apiais').find(
{
    chatbotName: 'Eden-Institucional-Web',
    action: {$ne: 'test.disponibilidad'},
    lastUpdate: {
        $lt: ISODate(nextYear + '-' + nextMonth + '-01T00:00:00.000Z'),
        $gte: ISODate(year + '-' + month + '-01T00:00:00.000Z')
    }
},
{ webMessageInput: 1, action: 1, lastUpdate: 1 },
{ $sort: {lastUpdate: 1} }).toArray()
var intentObj = {};
for (var k = 0; k < arr.length; k += 1) {
    if (!intentObj[arr[k].action]) {
        intentObj[arr[k].action] = { dateDiffs: [], lastDate: null };
    } else {
        intentObj[arr[k].action].dateDiffs.push(arr[k].lastUpdate - intentObj[arr[k].action].lastDate);
    }
    intentObj[arr[k].action].lastDate = arr[k].lastUpdate;
    intentObj[arr[k].action].count = intentObj[arr[k].action].count === undefined ? 0 : intentObj[arr[k].action].count + 1;
}
var SORTED_RESULT = {};
var keys = Object.keys(intentObj).sort(function (a, b) { return intentObj[a].count > intentObj[b].count ? -1 : 1 })

keys;
keys.map(function (action) {
    SORTED_RESULT[action] = intentObj[action];
});
for (var k = 0; k < keys.length; k += 1) {
    if (SORTED_RESULT[keys[k]].dateDiffs.length === 0) {
        SORTED_RESULT[keys[k]].dateDiffs = [0];
    }
    SORTED_RESULT[keys[k]].averageFreqSeconds = SORTED_RESULT[keys[k]].dateDiffs.reduce(function(a, b) {
        return a + b
    }) / SORTED_RESULT[keys[k]].dateDiffs.length / 1000;
    delete SORTED_RESULT[keys[k]].dateDiffs;
    delete SORTED_RESULT[keys[k]].lastDate;
}
SORTED_RESULT;

var info = { year, month, nextYear, nextMonth }
info