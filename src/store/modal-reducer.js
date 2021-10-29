const defaultState = {
  show: false,
  content: [],
  contentType: '',
}

export const TOGGLE = 'TOGGLE'
export const UPDATE_CONTENT_TYPE = 'UPDATE_CONTENT_TYPE'
export const UPDATE_CONTENT = 'UPDATE_CONTENT'
// export const DECREMENT = "DECREMENT"
// export const ASYNC_DECREMENT = "ASYNC_DECREMENT"

export default function modalReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case TOGGLE:
      return {...state, show: payload || !state.show}
    case UPDATE_CONTENT_TYPE:
      return { ...state, contentType: payload }
    case UPDATE_CONTENT:
      return {...state, content: payload }
  }
  return state
}

export const modalToggle = (payload) => ({ type: TOGGLE, payload })
export const modalShow = () => ({ type: TOGGLE, payload: true })
export const modalHide = () => ({ type: TOGGLE, payload: false })
export const modalUpdateContent = (payload) => ({ type: UPDATE_CONTENT, payload })
export const modalUpdateContentType = (payload) => ({ type: UPDATE_CONTENT_TYPE, payload })
// export const decrementCreator = () => ({type: DECREMENT})
// export const asyncDecrementCreator = () => ({type: ASYNC_DECREMENT})
