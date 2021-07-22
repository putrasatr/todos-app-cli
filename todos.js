const fs = require('fs')
const { instruction } = require("./constant")
const datas = JSON.parse(fs.readFileSync('./db/todo.json', 'utf8'))
let argv = process.argv
const command = argv.splice(2, 1).join(' ').trim().toLocaleLowerCase()
const request = argv.splice(2).join(' ')
const writeData = async (data) => {
    try {
        await fs.writeFileSync('./db/todo.json', JSON.stringify(data, null, 3),)
        return new Promise(resolve => {
            resolve('Success!')
        })
    } catch (error) {
        return new Promise(reject => {
            reject(error)
        })
    }
}
const handleFalseInput = () => {
    console.log(instruction)
}
const handleRespon = (response) => {
    console.log(response)
}
const formatData = {
    activity: '',
    status: false,
    tags: [],
}
switch (command) {
    case "add":
        formatData.activity = request
        datas.push(formatData)
        writeData(datas)
            .then(handleRespon)
            .catch(handleRespon)
        break;
    case "list":
        console.log('>>>>>>>TODOs LIST<<<<<<<')
        datas.forEach(({ activity, status }, i) => {
            console.log(`${i + 1}. ${status ? '[X]' : '[ ]'} ${activity}`)
        });
        break
    case 'task':
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
        break
    case "delete":
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
        break
    case "complete":
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
        break
    case "uncomplete":
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
        break
    case "list:outstanding":
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
        break

    case "list:completed":
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
        break
    case "tag":
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
        break
    case "filter":
        const result = {}
        let idApp = []
        const tagName = request.split(' ')[0]
        if (tagName) {
            datas.forEach((el, i) => {
                el.tags.forEach(item => {
                    if (item.includes(tagName) && !((i) in result)) {
                        idApp.push(i)
                        result[i] = el
                    }
                })
            })
            if (Object.hasOwnProperty.call(result, ...idApp)) {
                console.log(`Task with tag name '${tagName}' :\n`)
                for (const key in result) {
                    const { activity, status } = result[key]
                    console.log(`${Number(key) + 1}. ${status ? '[x]' : '[ ]'} ${activity}`)
                }
            } else {
                console.log(`Note: Task with tag name '${tagName}' is not appear.`)
            }
        } else {
            console.log(`Warning: Please insert the tag name.`);
        }

        break
    default:
        handleFalseInput()
        break;
}