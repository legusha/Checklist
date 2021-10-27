import React from 'react'
import {
  contextModal
} from './context'

const { useModal, useModalContent } = contextModal

export default function useAppState({ request }) {
  const [modal, modalProvider] = useModal()
  const [modalContent, modalProviderContent] = useModalContent()

  const setNoteNew = (item) => {
  }

  // const noteUpdateList = (noteList) => {
  //   setNote(noteList)
  // }
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
    // noteUpdateList(listNote);
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
      // listUpdate: noteUpdateList,
      listUpdateRequest: noteUpdate,
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
