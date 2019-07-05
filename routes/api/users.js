const express = require("express")
const router = express.Router()

// @route         GET api/users
// @description   Test route
// @access        Publinc
router.get('/', (req, res) => res.send('User route'))

module.exports = router