function getDate(iso, andHour) {
    function formatNum(num) {
        const parsed = parseInt(num);
        return parsed < 10 ? ('0' + parsed) : parsed 
    }
    const year = iso.getFullYear();
    const month = iso.getMonth() + 1;
    const day = iso.getDate();
    var date = day + '/' + month + '/' + year;
    if (andHour) {
        const hours = formatNum(iso.getHours());
        const minutes = formatNum(iso.getMinutes());
        date += ' ' + hours + ':' + minutes;
    }
    return date;
}
var apiais = db.getCollection('apiais').find(
    {
        chatbotName: 'Edes-Institucional-Web',
        chatbotChannel: 'whatsapp',
        lastUpdate: {
            $gte: ISODate("2019-12-30T00:00:00.000Z"),
            $lt: ISODate("2020-01-09T00:00:00.000Z"),
        }
    }, { action: 1, _id: 0, webMessageInput: 1, lastUpdate: 1, whatsappEventSenderId: 1 }
).toArray();
var data = {}, convs = {}, numbers = [];
for (var k = 0; k < apiais.length; k += 1) {
    const year = apiais[k].lastUpdate.getFullYear();
    const month = apiais[k].lastUpdate.getMonth() + 1;
    const day = apiais[k].lastUpdate.getDate();
    const date = day + '/' + month + '/' + year;
    if (!data[apiais[k].action]) {
        data[apiais[k].action] = {};
    }
    if (!data[apiais[k].action][date]) {
        data[apiais[k].action][date] = [];
    }
    data[apiais[k].action][date].push(apiais[k].webMessageInput);
    if (!numbers.includes(apiais[k].whatsappEventSenderId)) {
        numbers.push(apiais[k].whatsappEventSenderId);
    }
}
var convs = db.getCollection('apiais').find(
    {
        whatsappEventSenderId: { $in: numbers }
    }, { action: 1, _id: 0, webMessageInput: 1, lastUpdate: 1, whatsappEventSenderId: 1 }
).sort({ lastUpdate: 1 }).toArray();
var byNumber = {};
for (var k = 0; k < convs.length; k += 1) {
    const phone = 'phone:' + convs[k].whatsappEventSenderId;
    if (!byNumber[phone]) {
        byNumber[phone] = [];
    }
    delete convs[k].whatsappEventSenderId;
    convs[k].lastUpdate = getDate(convs[k].lastUpdate, true);
    byNumber[phone].push(convs[k]);
}
data;
byNumber;