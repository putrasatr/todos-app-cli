const { handleRespon, handleFalseInput } = require("../../constant")

function deleteTask(datas, request, writeData) {
    if (Number(request - 1)) {
        if (datas[Number(request - 1)]) {
            datas.splice(request, 1)
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

exports.deleteTask = deleteTask