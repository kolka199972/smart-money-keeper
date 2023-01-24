import httpService from './http.service'

const userEndPoint = 'user/'

const userService = {
  get: async (id) => {
    const {data} = await httpService.get(userEndPoint + id)
    return data
  },
  update: async (content) => {
    const {data} = await httpService.patch(userEndPoint + content._id, content)
    return data
  },
  delete: async (id) => {
    const {data} = await httpService.delete(userEndPoint + id)
    return data
  }
}

export default userService
