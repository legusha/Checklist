const setModalDisplay = (show, oldState) =>  {
  return { ...oldState, modal: {...oldState.modal, show} }
}
const setModalAction = (actionName, props, oldState) =>  {
  return {
    ...oldState,
    modal: {
      ...oldState.modal,
      currentContentType: actionName,
      currentContentProps: props
    }
  }
}

export { setModalDisplay, setModalAction }
