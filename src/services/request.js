import axios from 'axios'
import Http from 'services/http'
import { utilsServices } from 'utils'

const { attachArgsToMethods, params } = utilsServices

const requestConfig = {
  request: {
    baseURL: 'http://localhost:3001/',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  helper: {
    params: [
      {
        type: 'noteID',
        query: 'noteId',
      },
    ],
    ...params,
  },
  // Endpoints must be in the type of Functions and return type String
  endPoints: {
    note() {
      return `note`
    },
    todo(params = {}) {
      const query = this.helper.mappingParams(params)
      return `todo?${query}`
    },
    noteID(id) {
      return `note/${id}`
    },
    todoID(id) {
      return `todo/${id}`
    },
  },
}

const { request, endPoints } = requestConfig
const instanceRequest = axios.create(request)

const urls = {
  getNote: 'note',
  getNoteByID: 'noteID',
  postNote: 'note',
  putNote: 'noteID',
  getTodo: 'todo',
  getTodoByNoteID: 'todo',
  updateTodo: 'todoID',
  postTodo: 'todo',
  deleteTodo: 'todoID',
  deleteNote: 'noteID'
}

const attachEndPoints = {
  mapEndPoints: endPoints,
  config: requestConfig,
  ...attachArgsToMethods(urls),
}

class Request extends Http {
  constructor(request, attachEndPoints) {
    super(request, attachEndPoints)
    // One instance for all
    if (typeof Request.instance === 'object') {
      return Request.instance
    }

    attachEndPoints.attach(this)

    Request.instance = this
    return this
  }

  setAuthToken(token) {
    requestConfig.token = token
  }

  // Note

  async getNote(endPoint) {
    const source = this.generateSource(endPoint, [])
    return await this.makeRequestResource(this.getResource, [source])
  }
  async getNoteByID(endPoint, id) {
    const source = this.generateSource(endPoint, [id])
    return await this.makeRequestResource(this.getResource, [source])
  }
  async putNote(endPoint, { id, body }) {
    const source = this.generateSource(endPoint, [id])
    return await this.makeRequestResource(this.putResource, [source, body])
  }
  async postNote(endPoint, item) {
    const source = this.generateSource(endPoint, [])
    return await this.makeRequestResource(this.postResource, [source, item])
  }
  async deleteNote(endPoint, id) {
    const source = this.generateSource(endPoint, [id])
    return await this.makeRequestResource(this.deleteResource, [source])
  }

  // Todo
  async getTodo(endPoint) {
    const source = this.generateSource(endPoint, [])
    return await this.makeRequestResource(this.getResource, [source])
  }
  async getTodoByNoteID(endPoint, noteID) {
    const source = this.generateSource(endPoint, [noteID])
    return await this.makeRequestResource(this.getResource, [source])
  }
  async updateTodo(endPoint, item) {
    const source = this.generateSource(endPoint, [item.id])
    return await this.makeRequestResource(this.putResource, [source, item])
  }
  async postTodo(endPoint, { body }) {
    const source = this.generateSource(endPoint, [])
    return await this.makeRequestResource(this.postResource, [source, body])
  }
  async deleteTodo(endPoint, id) {
    const source = this.generateSource(endPoint, [id])
    return await this.makeRequestResource(this.deleteResource, [source])
  }

}

export default new Request(instanceRequest, attachEndPoints)
