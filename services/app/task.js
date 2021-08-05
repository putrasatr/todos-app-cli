const { handleFalseInput } = require("../../constant")

function task(datas, request) {
    if (Number(request)) {
        if (datas[request - 1]) {
            const { status, activity } = datas[request - 1]
            console.log(`${request}. ${status ? '[X]' : '[ ]'} ${activity}`)
        } else {
            console.log(`Note: Task with ID ${request} is not appear.`)
        }
    } else {
        console.log('Warning: Task ID must be conatain number.')
        handleFalseInput()
    }
}

exports.task = task