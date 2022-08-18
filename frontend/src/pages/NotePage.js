import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

import { useNavigate } from "react-router-dom";

const NotePage = () => {

    const navigate = useNavigate();
    const params = useParams()
    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    }, [params.id])

    let getNote = async () => {
      if (params.id === 'new') return
        let response = fetch(`/api/notes/${params.id}`)
        let data = await (await response).json()
        setNote(data)
    }

    let createNote = async () => {
      fetch(`/api/notes/create/`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(note)
      })

    }
    let updateNote = async () => {
      fetch(`/api/notes/${params.id}/update/`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(note)
      })
    }

    let deleteNote = async () => {
      fetch(`/api/notes/${params.id}/delete/`, {
        method:'DELETE',
        'headers':{
          'Content-Type': 'application/json'
        }
      })
      navigate('/')
    }

    let handleSubmit = () => {
      console.log('NOTE:', note)
      if (params.id !== 'new' && note.body == "") {
        deleteNote()
      } else if (params.id !== 'new') {
        updateNote()
      } else if (params.id == 'new' && note !== null) {
        createNote()
      }
      navigate('/')
    }

  return (
    <div className='note'>
      <div className="note-header">
        <h3>
        < ArrowLeft onClick={handleSubmit}/>
        </h3>
        { params.id !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>

        )}
      </div>
        <textarea onChange={(e) => { setNote({...note, 'body': e.target.value})}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage