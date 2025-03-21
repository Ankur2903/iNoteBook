import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://i-note-book-backend-silk.vercel.app";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":  localStorage.getItem('token')
        }
      });
    const json = await response.json()
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag, file) => {
    // todo api call
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tag', tag);
    if (file) {
        formData.append('file', file);  // Attach the file if it exists
    }
    console.log([formData])
    const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem('token')
        },
        body: formData,
      }
    );

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = async (id) => {
    //apicall
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      }
    );
    const json = response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":  localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}),
      }
    );
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
