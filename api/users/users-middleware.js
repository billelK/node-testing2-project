const db = require("../../data/db-config")

async function nameIsUnique(req,res,next) {
    const {name} = req.body
    console.log(name);
    const [user] = await db("users").where({name})
    try{
        if (!user) {
            next()
        } else {
            res.json({
                message: "name already exists"
            })
        }
    } catch(error) {
        next(error)
    }
    
}

module.exports = {
    nameIsUnique
}