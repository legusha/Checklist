// import eventBus from '~/plugins/services/eventBusInstance'
import { emitter } from '../events'

export default (e) => {
  const { response } = e
  if (response) {
    // data
    const { status } = response

    if (status === '401' || status === 401) {
    }
    throw new Error(e)
  }

  emitter.emit('error', e.message)
  throw new Error(e)
}
