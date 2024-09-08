const router = require("express").Router()
const model = require("./users-module")

router.get("/", (req,res,next) => {
    res.json({API: "up"})
})

router.post("/", (req,res,next) => {
    res.json({API: "up"})
})

router.get("/:id", (req,res,next) => {
    res.json({API: "up"})
})

router.use((err,req,res,next) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = router