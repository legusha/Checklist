import React, {useEffect, useState} from 'react'
import {Topbar} from '~/components/layout';
import EmptyValue from '~/components/empty-value';
import {WithModelContext} from "../components/hoc";

function Note({ match, app }) {
  const noteID = match.params.id;
  const [note, updateNote] = useState(null);

  async function fetchAuthData() {
    const noteData = await app.checkList.noteByID(noteID);
    updateNote(noteData)
  }

  useEffect(() => {
    fetchAuthData();
  }, []);
  console.log(note)

  return (
    <section className="container-lg container-fluid main">
      <Topbar rightContent={null}/>
      <div className={'d-flex justify-between flex-wrap notes-list p-4 border mt-4'}>
        <EmptyValue text={'Note not found'} />
      </div>
    </section>
  );
}

const mapContextToProps = ({ app }) => {
  return {
    app,
  }
}

export default WithModelContext(Note, mapContextToProps)
