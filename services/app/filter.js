function filterTask(datas, request) {
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

}

exports.filterTask = filterTask