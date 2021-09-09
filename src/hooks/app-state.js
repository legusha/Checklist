import React, {useState} from 'react'
import mutation from '../app/mutation';
import {useContextNote} from './context'

const {
  setNote,
  setTodo,
  setModalDisplay,
  setModalAction,
} = mutation;

export default function useAppState(request, setState) {
  const [processing, setProcessing] = useState(false)
  const [note, setNote] = useContextNote()


  // Checklist

  const setNoteNew = (item) => {
    // const handler = setNote.bind(this, noteList);
    // setState(handler)
  }

  const noteUpdateList = (noteList) => {
    setNote(noteList)
  }
  const noteCreateItem = async (item) => {
    await request.postNote(item);
    await this.noteUpdate();
  }
  const noteUpdateItem = async (item) => {
    const params = {
      id: item.id,
      body: item
    }
    return await request.putNote(params);
  }
  const noteUpdate = async () => {
    const listNote = await request.getNote();
    this.noteUpdateList(listNote);
  }
  const noteDelete  = async ({ id }) => {
    await request.deleteNote(id);
    await this.noteUpdate();
  }

  const todoUpdateList = (todoList) => {
  const handler = setTodo.bind(this, todoList);
  setState(handler)
}

  const todoUpdateItem = async (item) => {
    await request.updateTodo(item);
    await this.todoUpdate();
  }
  const todoUpdate = async () => {
    const listTodo = await request.getTodo();
    this.todoUpdateList(listTodo);
  }


  // Modal

  const modalUpdateContent = (...args) => {
    const handler = setModalAction.bind(this, ...args);
    setState(handler)
  }

  const modalUpdate = (value) => {
  const handler = setModalDisplay.bind(this, value);
  setState(handler)
}

  const modalToggle = (value) => {
  this.modalUpdate(value)
}

  const modalShow = () => {
    this.modalUpdate(true)
  }

  const modalHide = () => {
    this.modalUpdate(false)
  }

  const state = {
    processing,
    note
  }
  const provider = {
    note: {
      new : setNoteNew,
      itemNew: noteCreateItem,
      itemUpdate: noteUpdateItem,
      listUpdate: noteUpdateList,
      listUpdateRequest: noteUpdate,
      listRemoveItem: noteDelete,
    },
    todo: {
      itemUpdate: todoUpdateItem,
      listUpdate: todoUpdateList,
      listUpdateRequest: todoUpdate,
    },
    modal: {
      show: modalShow,
      hide: modalHide,
      update: modalUpdate,
      updateContent: modalUpdateContent,
      toggle: modalToggle
    }
  }
  return [state, provider]
}
