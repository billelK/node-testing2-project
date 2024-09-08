const db = require("../../data/db-config")

async function getAll() {
    return await db("users")
}

async function add(user) {
    return await db("users").insert(user).then(([id]) => {
        return db("users").where({id}).first()
    })
}

async function remove(id) {
    const [result] = await db("users").where({id})
    await db("users").where({id}).del()
    return result
}

module.exports = {
    getAll,
    add,
    remove
}