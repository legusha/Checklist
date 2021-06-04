const setModalDisplay = (show, oldState) =>  {
  return { ...oldState, modal: {...oldState.modal, show} }
}

export { setModalDisplay }
