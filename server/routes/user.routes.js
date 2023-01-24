const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const User = require('../models/User')
const router = express.Router({mergeParams: true})

router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const {id} = req.params
    if (id === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true
      })
      res.send(updatedUser)
    } else {
      res.status(401).json({message: 'Unauthorized'})
    }
  } catch (e) {
    res.status(500).json({
      message: 'There is error on the server. Try later.'
    })
  }
})

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const {id} = req.params
    const user = await User.findOne({_id: id})
    res.send(user)
  } catch (e) {
    res.status(500).json({
      message: 'There is error on the server. Try later.'
    })
  }
})

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const {id} = req.params
    if (id === req.user._id) {
      await User.findByIdAndDelete(id)
      res.send(null)
    } else {
      res.status(401).json({message: 'Unauthorized'})
    }
  } catch (e) {
    res.status(500).json({
      message: 'There is error on the server. Try later.'
    })
  }
})

module.exports = router
