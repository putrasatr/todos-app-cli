const { handleRespon, handleFalseInput } = require("../../constant")

function completeTask(datas, request, writeData) {
    if (Number(request)) {
        const data = datas[Number(request) - 1]
        if (data) {
            data.status = true
            writeData(datas)
                .then(handleRespon)
                .catch(handleRespon)
        } else {
            console.log(`Note: Task with ID ${request} is not appear.`)
        }
    } else {
        console.log('Warning: Invalid task ID.')
        handleFalseInput()
    }
}

function unCompleteTask(datas, reques, writeData) {
    if (Number(request)) {
        const data = datas[Number(request) - 1]
        if (data) {
            data.status = false
            writeData(datas)
                .then(handleRespon)
                .catch(handleRespon)
        } else {
            console.log(`Note: Task with ID ${request} is not appear.`)
        }
    } else {
        console.log('Warning: Invalid task ID.')
        handleFalseInput()
    }
}

exports.completeTask = completeTask
exports.unCompleteTask = unCompleteTask