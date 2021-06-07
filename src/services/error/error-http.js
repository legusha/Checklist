// import eventBus from '~/plugins/services/eventBusInstance'

export default (e) => {
  const { response } = e
  if (response) {
    const { status, data } = response
    // eventBus.$emit('notification:add:error', { status, data })

    if (status === '401' || status === 401) {
      // eventBus.$emit('error:auth')
    }
  }
  // eventBus.$emit('loading:hide:all')
  // eventBus.$emit('modal:close')
  throw new Error(e)
}
