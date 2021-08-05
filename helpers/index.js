const fs = require("fs")
const { instruction } = require("../constant")

let argv = process.argv
const command = argv.splice(2, 1).join(' ').trim().toLocaleLowerCase()
const request = argv.splice(2).join(' ')
const handleFalseInput = () => {
    console.log(instruction)
}
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

exports.command = command;
exports.request = request;
exports.handleFalseInput = handleFalseInput;
exports.writeData = writeData;