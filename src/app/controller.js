import mutation from './mutation';
import { request } from '~/services/shared';

const {
  setNote,
  setTodo,
  setModalDisplay,
  setModalAction,
} = mutation;

export default function (setState) {
  return {
    // Checklist

    setNoteNew: (item) => {
      // const handler = setNote.bind(this, noteList);
      // setState(handler)
    },

    noteUpdateList: (noteList) => {
      const handler = setNote.bind(this, noteList);
      setState(handler)
    },

    todoUpdateList: (todoList) => {
      const handler = setTodo.bind(this, todoList);
      setState(handler)
    },
    noteUpdateItem: (item) => {
      console.log(item)
      // const handler = updateNote.bind(this, item);
      // setState(handler)
    },
    async todoUpdateItem(item) {
      await request.updateTodo(item);
      await this.todoUpdate();
    },
    async noteUpdate() {
      const listNote = await request.getNote();
      this.noteUpdateList(listNote);
    },
    async todoUpdate() {
      const listTodo = await request.getTodo();
      this.todoUpdateList(listTodo);
    },
    async noteDelete ({ id }) {
      await request.deleteNote(id);
      await this.noteUpdate();
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
