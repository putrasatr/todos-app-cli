const instruction = `
>>> JS TODO <<<
$ node todos.js <command>
$ node todos.js list
$ node todos.js task <task_id>
$ node todos.js add <task_content>
$ node todos.js delete <task_id>
$ node todos.js complete <task_id>
$ node todos.js uncomplete <task_id>
$ node todos.js list:outstanding asc|desc
$ node todos.js list:completed asc|desc
$ node todos.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>
$ node todos.js filter:<tag_name>`

const formatData = {
    activity: '',
    status: false,
    tags: [],
}
const handleFalseInput = () => {
    console.log(instruction)
}
const handleRespon = (response) => {
    console.log(response)
}
exports.instruction = instruction
exports.formatData = formatData
exports.handleFalseInput = handleFalseInput
exports.handleRespon = handleRespon