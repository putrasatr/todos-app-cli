const { formatData, handleRespon } = require("../../constant")

function addTask(datas, request, writeData) {
    formatData.activity = request
    datas.push(formatData)
    writeData(datas)
        .then(handleRespon)
        .catch(handleRespon)
}

exports.addTask = addTask