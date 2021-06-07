import { errorHttp } from './error'

export default class Api {
  constructor(request, attachArgsForMethods) {
    this.request = request
    this.mapEndPoints = attachArgsForMethods?.mapEndPoints
    this.config = attachArgsForMethods.config
  }

  generateSource(name, args = []) {
    const config = this.config
    return this.mapEndPoints[name].bind(config || null)(...args) || ''
  }

  setAuthToken(token) {
    const authHeaders = { Authorization: `Bearer ${token}` }
    const prevHeaders = this.request.defaults.headers

    this.request.defaults.headers = { ...authHeaders, ...prevHeaders }
  }

  getResource(source) {
    const option = { method: 'get', source }
    const handler = this.requestResource.bind(this, option)

    return new Promise(handler)
  }

  putResource(source, body) {
    const option = { method: 'put', source, body }
    const handler = this.requestResource.bind(this, option)

    return new Promise(handler)
  }

  postResource(source, body) {
    const option = { method: 'post', source, body }
    const handler = this.requestResource.bind(this, option)

    return new Promise(handler)
  }

  deleteResource(source) {
    const option = { method: 'delete', source }
    const handler = this.requestResource.bind(this, option)

    return new Promise(handler)
  }

  // If you want errors to be displayed in notifications, use this function
  async makeRequestResource(fn, args) {
    return await fn
      .bind(this)(...args)
      .catch(errorHttp)
  }

  async requestResource({ method, source, body = null }, resolve, reject) {
    try {
      const { data } = await this.request[method](source, body)
      resolve(data)
    } catch (e) {
      reject(e)
      return e
    }
  }
}
