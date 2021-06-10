import {mutation} from '~/services/shared';
import { request } from '~/services/shared';

const {
  updateTodo,
  updateNote,
  setNote,
  setTodo,
  setModalDisplay,
  setModalAction,
  deleteNote,
} = mutation;

export default function ({ checkList }, setState) {
  return {
    // Checklist

    setNoteNew: (item) => {
      // const handler = setNote.bind(this, noteList);
      // setState(handler)
    },

    setNote: (noteList) => {
      const handler = setNote.bind(this, noteList);
      setState(handler)
    },

    setTodo: (todoList) => {
      const handler = setTodo.bind(this, todoList);
      setState(handler)
    },

    updateTodo: (item) => {
      const handler = updateTodo.bind(this, checkList, item);
      setState(handler);
    },
    updateNote: (item) => {
      const handler = updateNote.bind(this, checkList, item);
      setState(handler)
    },
    async deleteNote ({ id }) {
      await request.deleteNote(id);
      const listNote = await request.getNote();
      this.setNote(listNote);
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
