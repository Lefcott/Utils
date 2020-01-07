var apiais = db.getCollection('apiais').find(
    {
        chatbotName: /Edes-/,
        chatbotChannel: 'whatsapp',
        lastUpdate: {
            $gte: ISODate("2019-12-30T00:00:00.000Z")
        }
    }, { action: 1, _id: 0, webMessageInput: 1, lastUpdate: 1 }
).toArray();
var data = '';
for (var k = 0; k < apiais.length; k += 1) {
    var year = apiais[k].lastUpdate.getFullYear();
    var month = apiais[k].lastUpdate.getMonth() + 1;
    var day = apiais[k].lastUpdate.getDate();
    data += (k !== 0 ? ',,,,\n' : '') + day + '/' + month + '/' + year + ',,,' +
        apiais[k].action + ',,' + apiais[k].webMessageInput.replace(/,/g, '%commaCode%')
}