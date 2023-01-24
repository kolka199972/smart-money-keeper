import httpService from './http.service'

const operationEndPoint = 'operation/'

const operationService = {
  create: async (content) => {
    const {data} = await httpService.post(operationEndPoint, content)
    return data
  },
  fetchAll: async () => {
    const {data} = await httpService.get(operationEndPoint)
    return data
  },
  update: async (content) => {
    const {data} = await httpService.patch(
      operationEndPoint + content._id,
      content
    )
    return data
  },
  remove: async (id) => {
    await httpService.delete(operationEndPoint + id)
  }
}

export default operationService
