const {Schema, model} = require('mongoose')

const schema = new Schema(
  {
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    default: String,
    type: {type: String, enum: ['expense', 'income']}
  },
  {timestamps: true}
)

module.exports = model('Category', schema)
