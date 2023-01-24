const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const Count = require('../models/Count')

const router = express.Router({mergeParams: true})

router.get('/', authMiddleware, async (req, res) => {
  try {
    const list = await Count.find({userId: req.user._id})
    res.status(200).send(list)
  } catch (e) {
    res.status(500).json({
      message: 'There is error on the server. Try later.'
    })
  }
})

router.post('/', authMiddleware, async (req, res) => {
  try {
    const newCount = await Count.create({
      ...req.body,
      userId: req.user._id
    })

    res.status(201).send(newCount)
  } catch (e) {
    res.status(500).json({
      message: 'There is error on the server. Try later.'
    })
  }
})

router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const {id} = req.params

    const updatedCount = await Count.findByIdAndUpdate(id, req.body, {
      new: true
    })
    res.send(updatedCount)
  } catch (e) {
    res.status(500).json({
      message: 'There is error on the server. Try later.'
    })
  }
})

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const {id} = req.params

    await Count.findByIdAndDelete(id)
    res.send(null)
  } catch (e) {
    res.status(500).json({
      message: 'There is error on the server. Try later.'
    })
  }
})

module.exports = router
