const categoriesMock = require('../mock/category.json')
const Category = require('../models/Category')

module.exports = async () => {
  const categories = await Category.find()
  if (categories.length < categoriesMock.length) {
    await createInitialEntity(Category, categoriesMock)
  }
}

async function createInitialEntity(Model, data) {
  await Model.collection.drop()
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id
        const newItem = new Model(item)
        await newItem.save()
        return newItem
      } catch (e) {
        return e
      }
    })
  )
}
