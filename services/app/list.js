const { handleFalseInput } = require("../../constant")

function listTask(datas) {
    console.log('>>>>>>>TODOs LIST<<<<<<<')
    datas.forEach(({ activity, status }, i) => {
        console.log(`${i + 1}. ${status ? '[X]' : '[ ]'} ${activity}`)
    });
}

function listTaskOutstanding(datas, request) {
    if (request === "asc") {
        console.log('>>>>>>>TODOs LIST<<<<<<<')
        datas.forEach(({ activity, status }, i) => {
            if (!status)
                console.log(`${i + 1}. ${status ? '[X]' : '[ ]'} ${activity}`)
        });
    } else if (request === "desc") {
        console.log('>>>>>>>TODOs LIST<<<<<<<')
        let i = datas.length
        datas.reverse().forEach(({ activity, status }) => {
            if (!status)
                console.log(`${i}. ${status ? '[X]' : '[ ]'} ${activity}`)
            i--
        });
    } else {
        console.log('Warning: False Input. Look the help instruction.')
        handleFalseInput()
    }
}

function listTaskComplete(datas, request) {
    if (request === "asc") {
        console.log('>>>>>>>TODOs LIST<<<<<<<')
        datas.forEach(({ activity, status }, i) => {
            if (status)
                console.log(`${i + 1}. ${status ? '[X]' : '[ ]'} ${activity}`)
        });
    } else if (request === "desc") {
        console.log('>>>>>>>TODOs LIST<<<<<<<')
        let i = datas.length
        datas.reverse().forEach(({ activity, status }) => {
            if (status)
                console.log(`${i}. ${status ? '[X]' : '[ ]'} ${activity}`)
            i--
        });
    } else {
        console.log('Warning: False Input. Look the help instruction.')
        handleFalseInput()
    }
}
exports.listTask = listTask
exports.listTaskOutstanding = listTaskOutstanding
exports.listTaskComplete = listTaskComplete