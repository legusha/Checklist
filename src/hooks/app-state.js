import React, {useState} from 'react'
import {
  useContextNote,
  useContextTodoList,
  contextModal
} from './context'

const { useModal, useModalContent } = contextModal

export default function useAppState({ request }) {
  const [processing, setProcessing] = useState(false)
  const [note, setNote] = useContextNote()
  const [todoList, setTodoList] = useContextTodoList()
  const [modal, modalProvider] = useModal()
  const [modalContent, modalProviderContent] = useModalContent()

  const setNoteNew = (item) => {
  }

  const noteUpdateList = (noteList) => {
    setNote(noteList)
  }
  const noteCreateItem = async (item) => {
    await request.postNote(item);
    await noteUpdate();
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
    noteUpdateList(listNote);
  }
  const noteDelete  = async ({ id }) => {
    await request.deleteNote(id);
    await noteUpdate();
  }

  const todoUpdateList = (todoList) => {
    setTodoList(todoList)
  }

  const todoUpdateItem = async (item) => {
    await request.updateTodo(item);
    await todoUpdate();
  }
  const todoUpdate = async () => {
    const listTodo = await request.getTodo();
    todoUpdateList(listTodo);
  }


  // Modal

  const modalUpdateContent = (contentType) => {
    modalProvider.updateContentType(contentType)
  }

  const modalUpdate = (value) => {
    modalProvider.display(value)
}

  const modalToggle = (value) => {
    modalUpdate(value)
}

  const modalShow = () => {
    modalUpdate(true)
  }

  const modalHide = () => {
    modalUpdate(false)
  }

  const state = {
    processing,
    note,
    todoList,
    modal: {
      ...modal,
      content: modalContent,
    }
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
      updateProviderContent: modalProviderContent,
      toggle: modalToggle
    }
  }
  return [state, provider]
}
