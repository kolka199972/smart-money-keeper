const express = require('express')
const router = express.Router({mergeParams: true})
const authMiddleware = require('../middleware/auth.middleware')
const Category = require('../models/Category')

router.get('/', authMiddleware, async (req, res) => {
  try {
    const list = await Category.find({default: '1'})
    const list2 = await Category.find({userId: req.user._id})
    const commonList = [...list, ...list2]
    res.status(200).send(commonList)
  } catch (e) {
    res.status(500).json({
      message: 'There is error on the server. Try later.'
    })
  }
})

router.post('/', authMiddleware, async (req, res) => {
  try {
    const newCategory = await Category.create({
      ...req.body,
      userId: req.user._id
    })

    res.status(201).send(newCategory)
  } catch (e) {
    res.status(500).json({
      message: 'There is error on the server. Try later.'
    })
  }
})

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const {id} = req.params

    await Category.findByIdAndDelete(id)
    res.send(null)
  } catch (e) {
    res.status(500).json({
      message: 'There is error on the server. Try later.'
    })
  }
})

module.exports = router
