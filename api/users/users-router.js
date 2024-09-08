const router = require("express").Router()
const model = require("./users-module")
const {nameIsUnique} = require("./users-middleware")

router.get("/", (req,res,next) => {
    model.getAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(next)
})

router.post("/",nameIsUnique, (req,res,next) => {
    model.add(req.body)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(next)
})

router.delete("/:id", (req,res,next) => {
    const {id} = req.params
    model.remove(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(next)
})

router.use((err,req,res,next) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = router