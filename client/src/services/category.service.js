import httpService from './http.service'

const categoryEndPoint = 'category/'

const categoryService = {
  create: async (content) => {
    const {data} = await httpService.post(categoryEndPoint, content)
    return data
  },
  fetchAll: async () => {
    const {data} = await httpService.get(categoryEndPoint)
    return data
  },
  delete: async (id) => {
    const {data} = await httpService.delete(categoryEndPoint + id)
    return data
  }
}

export default categoryService
