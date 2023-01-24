const {Schema, model} = require('mongoose')

const schema = new Schema(
  {
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    date: Date,
    count: {type: Schema.Types.ObjectId, ref: 'Count'},
    value: Number,
    type: {type: String, enum: ['expense', 'income']}
  },
  {timestamps: true}
)

module.exports = model('Operation', schema)
