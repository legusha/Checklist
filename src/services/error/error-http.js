// import eventBus from '~/plugins/services/eventBusInstance'

export default (e) => {
  const { response } = e
  if (response) {
    // data
    const { status } = response

    if (status === '401' || status === 401) {
    }
  }
  throw new Error(e)
}
