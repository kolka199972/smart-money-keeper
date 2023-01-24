import httpService from './http.service'

const countEndPoint = 'count/'

const countService = {
  create: async (content) => {
    const {data} = await httpService.post(countEndPoint, content)
    return data
  },
  fetchAll: async () => {
    const {data} = await httpService.get(countEndPoint)
    return data
  },
  update: async (content) => {
    const {data} = await httpService.patch(countEndPoint + content._id, content)
    return data
  },
  remove: async (id) => {
    await httpService.delete(countEndPoint + id)
  }
}

export default countService
