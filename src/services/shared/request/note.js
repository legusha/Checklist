import axios from 'axios'
import Http from '~/services/http'
import { utilsServices } from '~/utils'

const { attachArgsToMethods, params } = utilsServices

const resourceMain = {
  request: {
    baseURL: 'http://localhost:3001/',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  helper: {
    params: [
      // example
      // {
      //   type: 'query',
      //   query: 'query',
      // },
    ],
    ...params,
  },
  // Endpoints must be in the type of Functions and return type String
  endPoints: {
    note() {
      return `note`
    },
  },
}

const { request, endPoints } = resourceMain
const instanceRequest = axios.create(request)

const mapFunc = {
  getNote: 'note',
}

const attachEndPoints = {
  mapEndPoints: endPoints,
  config: resourceMain,
  ...attachArgsToMethods(mapFunc),
}

class Note extends Http {
  constructor(request, attachEndPoints) {
    super(request, attachEndPoints)
    // One instance for all
    if (typeof Note.instance === 'object') {
      return Note.instance
    }

    attachEndPoints.attach(this)

    Note.instance = this
    return this
  }

  setAuthToken(token) {
    resourceMain.token = token
  }

  // Note

  async getNote(endPoint) {
    const source = this.generateSource(endPoint, [])
    return await this.makeRequestResource(this.getResource, [source])
  }
}

export default new Note(instanceRequest, attachEndPoints)
