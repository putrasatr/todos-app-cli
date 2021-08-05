const { task } = require("./app/task")
const { addTask } = require("./app/add")
const { tagTask } = require("./app/tag")
const { deleteTask } = require("./app/delete")
const { filterTask } = require("./app/filter")
const { listTask, listTaskOutstanding ,listTaskComplete} = require("./app/list")
const { completeTask, unCompleteTask } = require("./app/complete")

module.exports = {
    addTask,
    listTask,
    task,
    deleteTask,
    completeTask,
    unCompleteTask,
    listTaskOutstanding,
    tagTask,
    filterTask,
    listTaskComplete
}