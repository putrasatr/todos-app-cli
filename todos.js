const fs = require('fs')
const datas = JSON.parse(fs.readFileSync('./db/todo.json', 'utf8'))
const { command, request, writeData, handleFalseInput } = require("./helpers")
const {
    task,
    tagTask,
    addTask,
    listTask,
    deleteTask,
    filterTask,
    completeTask,
    unCompleteTask,
    listTaskComplete,
    listTaskOutstanding,
} = require("./services")

switch (command) {
    case "add":
        addTask(datas, request, writeData)
        break;
    case "list":
        listTask(datas)
        break
    case 'task':
        task(datas, request)
        break
    case "delete":
        deleteTask(datas, request, writeData)
        break
    case "complete":
        completeTask(datas, request, writeData)
        break
    case "uncomplete":
        unCompleteTask(datas, request, writeData)
        break
    case "list:outstanding":
        listTaskOutstanding(datas, request)
        break
    case "list:completed":
        listTaskComplete(datas, request)
        break
    case "tag":
        tagTask(datas, request, writeData)
        break
    case "filter":
        filterTask(datas, request)
        break
    default:
        handleFalseInput()
        break;
}