const { handleFalseInput, handleRespon } = require("../../constant")

function tagTask(datas, request, writeData) {
    const id = request.split(' ')[0]
    if (id) {
        if (datas[id - 1]) {
            const tags = request.split(' ').splice(1)
            tags.forEach(item => {
                datas[id - 1].tags.push(item)
            });
            writeData(datas)
                .then(handleRespon)
                .catch(handleRespon)
        } else {
            console.log(`Note: Task with ID ${id} is not appear.`)
        }
    } else {
        console.log('Warning: Invalid task ID.')
        handleFalseInput()
    }
}

exports.tagTask = tagTask