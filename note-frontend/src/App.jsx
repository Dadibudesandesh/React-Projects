import { useEffect, useState } from "react";
import { createNote, deleteNote, getAllNotes, updateNote, searchNote } from "./api";
import NoteForm from "./Components/NoteForm";
import NoteList from "./Components/NoteList";
import SearchNote from "./Components/SearchNote";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  const loadNotes = async () => {
    const res = await getAllNotes();
    setNotes(res.data);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleSubmit = async (note) => {
    if (editingNote) {
      await updateNote(editingNote.id, note);
      setEditingNote(null);
    } else {
      await createNote(note);
    }

    loadNotes();
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    loadNotes();
  };


  const handleEdit = (note) => {
    setEditingNote(note);
    loadNotes();
  };

  const handleSearch = async (keyword) => {
    if (keyword.trim() === "") {
      loadNotes();
    } else {
      const res = await searchNote(keyword);
      setNotes(res.data);
    }
  }

  return (
    <div vh-100 bg-dark>
      <div className="container mt-4 ">
        <h1 className="text-center">📝 My Note App</h1>
        <NoteForm onSubmit={handleSubmit} editingNote={editingNote} />
        <SearchNote onSearch={handleSearch}/>
        <NoteList notes={notes} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>

  );
}


export default App;

