import {mutation} from "../services";

const {
  updateTodo,
  updateNote,
  setModalDisplay,
  setModalAction,
  deleteNote,
} = mutation;

export default function ({ checkList }, setState) {
  return {
    // Checklist

    updateTodo: (item) => {
      const handler = updateTodo.bind(this, checkList, item);
      setState(handler);
    },
    updateNote: (item) => {
      const handler = updateNote.bind(this, checkList, item);
      setState(handler)
    },
    deleteNote: (item) => {
      const handler = deleteNote.bind(this, item);
      setState(handler)
    },


    // Modal

    modalUpdateContent: (...args) => {
      const handler = setModalAction.bind(this, ...args);
      setState(handler)
    },

    modalUpdate: (value) => {
      const handler = setModalDisplay.bind(this, value);
      setState(handler)
    },

    modalToggle(value) {
      this.modalUpdate(value)
    },

    modalShow() {
      this.modalUpdate(true)
    },

    modalHide() {
      this.modalUpdate(false)
    }
  }
}
