const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const Operation = require('../models/Operation')

const router = express.Router({mergeParams: true})

router.get('/', authMiddleware, async (req, res) => {
  try {
    const list = await Operation.find({userId: req.user._id})
    res.status(200).send(list)
  } catch (e) {
    res.status(500).json({
      message: 'There is error on the server. Try later.'
    })
  }
})

router.post('/', authMiddleware, async (req, res) => {
  try {
    const newEOperation = await Operation.create({
      ...req.body,
      userId: req.user._id
    })

    res.status(201).send(newEOperation)
  } catch (e) {
    res.status(500).json({
      message: 'There is error on the server. Try later.'
    })
  }
})

router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const {id} = req.params

    const updatedOperation = await Operation.findByIdAndUpdate(id, req.body, {
      new: true
    })
    res.send(updatedOperation)
  } catch (e) {
    res.status(500).json({
      message: 'There is error on the server. Try later.'
    })
  }
})

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const {id} = req.params

    await Operation.findByIdAndDelete(id)
    res.send(null)
  } catch (e) {
    res.status(500).json({
      message: 'There is error on the server. Try later.'
    })
  }
})

module.exports = router
