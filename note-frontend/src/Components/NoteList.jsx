import NoteItem from './NoteItem';

function NoteList({ notes, onDelete, onEdit }) {
    return (
        <div className="row">
            {notes.map((note) => (
                <div key={note.id} className="col-md-4 mb-3">
                    <NoteItem note={note} onDelete={onDelete} onEdit={onEdit} />
                </div>))}
        </div>
    );
}

export default NoteList;