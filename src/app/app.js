import React, {Component, useEffect, useState} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Controller from './controller'
import { useAppState } from '../hooks'

import PageBase from '~/views/base';
import PageNote from '~/views/note';

import { ModelProvider } from '~/components/model-context';
import ModalActions from '~/components/modal';
import ModalContent from '~/components/modal-content';

import request from '~/services/request';

export default function App2 () {
  const controller = new Controller(request, () => {})
  const [state, provider] = useAppState(request,() => {})
  const [todo] = useState([])
  const [modal] = useState({
    show: false,
    context: {},
    currentContentType: '',
  })
  let modalContent = initModalContent()

  function initModalContent(props = {}) {
    return ModalContent({
      handlers: {
        modalShow: controller.modalShow.bind(controller),
        modalHide: controller.modalHide.bind(controller)
      },
      modal: initApiModal(),
      props,
    })
  }

  // Init handlers
  function initApiCheckList() {
    return {
      todoNew: (props) => ({...props, complete: !props.complete}),
      todoNewCreate: (props) => console.log(props),
      todoUpdate: controller.todoUpdateItem.bind(controller),
      todoGetByNoteID: request.getTodoByNoteID,
      noteNew: controller.noteCreateItem.bind(controller),
      noteUpdate: controller.noteUpdateItem.bind(controller),
      noteByID: request.getNoteByID,
      noteDelete: controller.noteDelete.bind(controller),
    }
  }
  function initApiModal() {
    return {
      update: (value, modalContentType = 'checklist:item:remove') => {
        controller.modalUpdateContent(modalContentType);
        controller.modalToggle(value)
      },
      updateWithItem: (item, value, modalContentType = 'checklist:item:remove', props) => {
        controller.modalUpdateContent(modalContentType);
        modalContent = this.initModalContent({ item, ...props })
        controller.modalToggle(value)
      },
      currentContent: () => {
        const { currentContentType } = modal
        return modalContent.find(item => item.typeName === currentContentType)
      },
    }
  }

  useEffect(() => {
    const handler = async () => {
      const listNote = await request.getNote();
      const listTodo = await request.getTodo();
      provider.note.listUpdate(listNote)
      controller.todoUpdateList(listTodo)
    }
    handler()
  }, [])

  const apiCheckList = initApiCheckList();
  const apiModal = initApiModal();

  const checklist = {
    note: state.note,
    todo
  }
  const app = {
    checkList: {
      ...checklist,
      ...apiCheckList,
    },
    modal: {
      ...modal,
      ...apiModal
    }
  }

  return (
    <div className="App, mt-4">
      <Switch>
        <ModelProvider value={{ app }}>
          <Route path="/" component={PageBase} exact />
          <Route path="/note/:id" component={PageNote} exact />
          <Redirect to={'/'}/>
        </ModelProvider>
      </Switch>
      <ModalActions modal={app.modal} />
    </div>
  )
}

// export default class App extends Component {
//
//   constructor(props) {
//     super(props);
//     this.contoller = new Controller(request, this.setState.bind(this));
//
//     this.state = {
//       checkList: {
//         note: [],
//         todo: [],
//       },
//       modal: {
//         show: false,
//         context: {},
//         currentContentType: '',
//       },
//     }
//     this.modalContent = this.initModalContent();
//   }
//
//   // Init handlers
//
//   initApiCheckList = () => {
//     return {
//       todoNew: (props) => ({...props, complete: !props.complete}),
//       todoNewCreate: (props) => console.log(props),
//       todoUpdate: this.contoller.todoUpdateItem.bind(this.contoller),
//       todoGetByNoteID: request.getTodoByNoteID,
//       noteNew: this.contoller.noteCreateItem.bind(this.contoller),
//       noteUpdate: this.contoller.noteUpdateItem.bind(this.contoller),
//       noteByID: request.getNoteByID,
//       noteDelete: this.contoller.noteDelete.bind(this.contoller),
//     }
//   }
//   initApiModal = () => {
//     const { modal } = this.state;
//     return {
//       update: (value, modalContentType = 'checklist:item:remove') => {
//         this.contoller.modalUpdateContent(modalContentType);
//         this.contoller.modalToggle(value)
//       },
//       updateWithItem: (item, value, modalContentType = 'checklist:item:remove', props) => {
//         this.contoller.modalUpdateContent(modalContentType);
//         this.modalContent = this.initModalContent({ item, ...props })
//         this.contoller.modalToggle(value)
//       },
//       currentContent: () => {
//         const { currentContentType } = modal
//         return this.modalContent.find(item => item.typeName === currentContentType)
//       },
//     }
//   }
//   initModalContent(props = {}) {
//     return ModalContent({
//       handlers: {
//         modalShow: this.contoller.modalShow.bind(this.contoller),
//         modalHide: this.contoller.modalHide.bind(this.contoller)
//       },
//       modal: this.initApiModal(),
//       props,
//     })
//   }
//
//   async componentDidMount() {
//     const listNote = await request.getNote();
//     const listTodo = await request.getTodo();
//     this.contoller.noteUpdateList(listNote)
//     this.contoller.todoUpdateList(listTodo)
//   }
//
//   // Hooks
//
//   render() {
//     const { checkList: checkListState, modal } = this.state;
//     const apiCheckList = this.initApiCheckList();
//     const apiModal = this.initApiModal();
//
//     const app = {
//       checkList: {
//         ...checkListState,
//         ...apiCheckList,
//       },
//       modal: {
//         ...modal,
//         ...apiModal
//       }
//     }
//
//     return (
//       <div className="App, mt-4">
//         <Switch>
//           <ModelProvider value={{ app }}>
//             <Route path="/" component={PageBase} exact />
//             <Route path="/note/:id" component={PageNote} exact />
//             <Redirect to={'/'}/>
//           </ModelProvider>
//         </Switch>
//         <ModalActions modal={app.modal} />
//       </div>
//     )
//   }
// }
