import { useState, useEffect } from "react";

function NoteForm({ onSubmit, editingNote }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (editingNote) {
            setTitle(editingNote.title);
            setContent(editingNote.content);
        }
    }, [editingNote]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, content });
        setTitle('');
        setContent('');
    };

    return (

        <form onSubmit={handleSubmit} className="mb-5 mt-5  align-item-center justify-content-center d-flex flex-column">
            <div className="input-group input-group-lg mb-3">
                <input
                    type="text"
                    className="form-control border-primary"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                    placeholder="Note Title"
                    value={title} onChange={(e) => setTitle(e.target.value)} required
                />
            </div>
            <div class="mb-3">
                <textarea className="form-control  border-primary placeholder-xs" aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-lg" id="exampleFormControlTextarea1" rows="4" placeholder="Note Content" value={content} onChange={(e) => setContent(e.target.value)} required style={{ "resize": "none" }}></textarea>
            </div>
            <button className="btn btn-primary" type="submit">
                {editingNote ? "Update Note" : "Add Note"}
            </button>
        </form>
    );
}

export default NoteForm;