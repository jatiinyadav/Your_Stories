const express = require('express')
const router = express.Router()
const { ensureGuest, ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')

// @description      Login/LandingPage
// @route            GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', { layout: 'login' })
})


// @description      Login/Dashb    oard
// @route            GET /
router.get('/dashboard', ensureAuth, async (req, res) => {

    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.displayName,
            image: req.user.image,
            createdAt: req.user.createdAt,
            stories,
        })
    } catch (error) {
        res.render('error/404')
    }
})

module.exports = router