const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')

// @description      Show add page
// @route            GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
})


// @description      Show Stories
// @route            POST /stories
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
        res.render('error/500')
    }
})

// @description      Show single story
// @route            GET /stories/:id
router.get('/:id', ensureAuth, async (req, res) => {

    try {
        let story = await Story.findById(req.params.id)
            .populate('user')
            .lean()

        if (!story) {
            return res.render('error/404')
        }

        res.render('stories/show', { createdAt: story.createdAt, story })
    } catch (error) {
        console.log(error);
        res.render('error/404')
    }


})

// @description      Show add page
// @route            GET /stories/add
router.get('/', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean()

        res.render('stories/index', {
            stories,
        })
    } catch (error) {
        console.log(error)
        res.render('error/400')
    }
})

// @description      Show Edit Stories
// @route            GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {

    try {
        const story = await Story.findById({ _id: req.params.id }).lean()

        if (story.user != req.user.id) {
            return res.render('error/400')
        }

        if (story.user != req.user.id) {
            return res.render('error/404')
        } else {
            res.render('stories/edit', { story })
        }
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }

})

// @description      Update Stories
// @route            PUT /stories/:id
router.put('/:id', ensureAuth, async (req, res) => {

    try {
        let story = await Story.findById(req.params.id).lean()

        if (!story) {
            return res.render('error/404')
        }

        if (story.user != req.user.id) {
            return res.render('error/404')
        } else {
            story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            })
            res.redirect('/dashboard')
        }
    } catch (error) {
        console.log(error);
        return res.render('error/500')
    }


})

// @description      Delete story
// @route            DELETE /stories/add
router.delete('/:id', ensureAuth, async (req, res) => {

    try {
        await Story.deleteOne({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
        return res.render('error/500')
    }
})

// @desc    User stories
// @route   GET /stories/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({
            user: req.params.userId,
            status: 'public',
        })
            .populate('user')
            .lean()

        res.render('stories/user', {
            stories,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})
module.exports = router