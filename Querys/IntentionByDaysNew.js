var apiais = db.getCollection('apiais').find(
    {
        chatbotName: 'Edes-Institucional-Web',
        chatbotChannel: 'whatsapp',
        lastUpdate: {
            $gte: ISODate("2019-12-30T00:00:00.000Z"),
            $lt: ISODate("2020-01-08T00:00:00.000Z"),
        }
    }, { action: 1, _id: 0, webMessageInput: 1, lastUpdate: 1 }
).toArray();
var data = {};
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
}
data;