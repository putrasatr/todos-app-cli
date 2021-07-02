const fs = require('fs')
const data = fs.readFileSync('todo.json', 'utf8')
let read = JSON.parse(data)
const argv = process.argv.slice(2)
const step = argv.slice(1).toString()
let dataTag = fs.readFileSync('tag.json', 'utf8')
let tagParse = JSON.parse(dataTag)

switch (process.argv.slice(2)[0]) {
    case 'help':

        console.log('>>> JS TODO <<<\n$ node challenge13.js <command>\n$ node challenge13.js list\n$ node challenge13.js task <task_id>')
        console.log('$ node challenge13.js add <task_content>\n$ node challenge13.js delete <task_id>\n$ node challenge13.js complete <task_id>\n$ node challenge13.js uncomplete <task_id>\n$ node challenge13.js list:outstanding asc|desc\n$ node challenge13.js list:completed asc|desc\n$ node challenge13.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>\n$ node challenge13.js filter:<tag_name>')
        break;

    case 'add':
        //fungsi untuk menghilangkan koma separator pada string argv
        let newStr = ""
        for (let i = 0; i < step.length; i++) {
            if (step[i] == ",") {
                newStr += " "
            } else {
                newStr += step[i]
            }
        }

        console.log(`"${newStr}" telah ditambahkan`);

        read.push({ todo: "[ ] " + newStr })
        const tsk = JSON.stringify(read)
        fs.writeFileSync('todo.json', `${tsk}`)
        break;

    case 'list':
        let foreign = new Object()
        if (read.length > 0) {
            for (let g = 0; g < read.length; g++) {
                console.log(`${g + 1}. ${read[g].todo}`)
            }
        } else {
            console.log("Anda belum menambahkan daftar pekerjaan\n1. [ ] ...")
        } break;

    case 'delete':
        for (let s = 0; s < read.length; s++) {
            if (step == s + 1) {
                JSON.stringify(read.splice(s, 1,))
                fs.writeFileSync('todo.json', JSON.stringify(read))
                console.log(`Telah dihapus dari daftar`)
            }
        } break;

    case 'complete':
        for (let c = 0; c < read.length; c++) {
            if (step == c + 1) {

                let comp = read[c].todo.replace("[ ]", "[x]")
                let baru = data.replace(`${read[c].todo}`, `${comp}`)
                fs.writeFileSync('todo.json', baru)

                console.log(`"${read[c].todo.slice(4)}" telah selesai.`)
            }
        } break;

    case 'uncomplete':
        for (let a = 0; a < read.length; a++) {
            if (step == a + 1) {

                let cancel = read[a].todo.replace("[x]", "[ ]")
                let batal = data.replace(`${read[a].todo}`, `${cancel}`)
                fs.writeFileSync('todo.json', batal)
                console.log(`"${read[a].todo.slice(4)}" status selesai dibatalkan.`)
            }
        } break;

    case 'list:outstanding':
        let ascout = new Object()
        if (read.length > 0 && step == "asc") {
            for (let e = 0; e < read.length; e++) {
                if (read[e].todo.includes("[x]")) {
                    ascout += read[e].todo
                } else {
                    console.log(`${e + 1}. ${read[e].todo}`)
                }
            }
        } else {
            console.log("Anda belum menambahkan daftar pekerjaan")
        } break;

    case 'list:completed':
        let asccomp = new Object()
        if (read.length > 0 && step == "asc") {
            for (let e = 0; e < read.length; e++) {
                if (read[e].todo.includes("[ ]")) {
                    asccomp += read[e].todo
                } else {
                    console.log(`${e + 1}. ${read[e].todo}`)
                }
            }
        }
        else {
            console.log("Anda belum menambahkan daftar pekerjaan")
        } break;

    case 'tag':
        let tag = step[0]
        let name = step.slice(2)


        console.log(`Tag "${name.slice(0)}" telah ditambahkan kedaftar "${read[tag - 1].todo.slice(4)}"`)

        let tagObj = [{ tag: `${name} ${read[tag - 1].todo.slice(4)}` }]
        const tagJson = JSON.stringify(tagObj)
        fs.writeFileSync('tag.json', `${tagJson}`)
        break;

    case 'filter:':
        let fil = step.slice(2)
        console.log(`[ ] ${tagParse[0].tag.slice(fil.length + 2)}`)
        break;

    default:
        console.log("Masukan perintah yang sesuai")
}
