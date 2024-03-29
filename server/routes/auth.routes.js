const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const tokenService = require('../services/token.service')
const router = express.Router({mergeParams: true})

router.post('/signUp', [
  check('email', 'Email is not correct').isEmail(),
  check('password', 'Min length of password is 8 symbols').isLength({min: 8}),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400
          }
        })
      }

      const {email, password} = req.body
      const existingPerson = await User.findOne({email})
      if (existingPerson) {
        return res.status(400).json({
          error: {
            message: 'EMAIL_EXISTS',
            code: 400
          }
        })
      }
      const hashedPassword = await bcrypt.hash(password, 12)

      const newUser = await User.create({
        ...req.body,
        password: hashedPassword
      })

      const tokens = tokenService.generate({_id: newUser._id})

      await tokenService.save(newUser._id, tokens.refreshToken)

      res.status(201).send({...tokens, userId: newUser._id})
    } catch (e) {
      res.status(500).json({
        message: 'There is error on the server. Try later.'
      })
    }
  }
])

router.post('/signInWithPassword', [
  check('email', 'Email is not correct').normalizeEmail().isEmail(),
  check('password', 'Password can not be empty').exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400
          }
        })
      }

      const {email, password} = req.body
      const existingUser = await User.findOne({email})
      if (!existingUser) {
        return res.status(400).json({
          error: {
            message: 'EMAIL_NOT_FOUND',
            code: 400
          }
        })
      }

      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      )
      if (!isPasswordEqual) {
        return res.status(400).json({
          error: {
            message: 'INVALID_PASSWORD',
            code: 400
          }
        })
      }

      const tokens = tokenService.generate({_id: existingUser._id})
      await tokenService.save(existingUser._id, tokens.refreshToken)

      res.status(200).send({...tokens, userId: existingUser._id})
    } catch (e) {
      res.status(500).json({
        message: 'There is error on the server. Try later.'
      })
    }
  }
])

router.post('/token', async (req, res) => {
  try {
    const {refreshToken} = req.body
    const data = tokenService.validateRefresh(refreshToken)
    const dbToken = await tokenService.findToken(refreshToken)

    if (!data || !dbToken || data._id !== dbToken?.user?.toString()) {
      return res.status(401).json({message: 'Unauthorized'})
    }

    const tokens = tokenService.generate({_id: data._id})
    await tokenService.save(data._id, tokens.refreshToken)

    res.status(200).send({...tokens, userId: data._id})
  } catch (e) {
    res.status(500).json({
      message: 'There is error on the server. Try later.'
    })
  }
})

module.exports = router
