const {Schema, model} = require('mongoose')

const schema = new Schema(
  {
    name: String,
    value: Number,
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    type: {type: String, enum: ['accounts', 'savings', 'debts']}
  },
  {timestamps: true}
)

module.exports = model('Count', schema)
