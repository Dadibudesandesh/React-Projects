function NoteItem({ note, onDelete, onEdit }) {
    return (
        <div className="card ">
            <div className="card-body">
                <h5>{note.title}</h5>
                <p>{note.content}</p>
                <p>Create At : {note.createAt}</p>
                <p> Last Update : {note.updateAt}</p>
                <div className="">
                    <button className="btn btn-primary me-3" onClick={() => onEdit(note)}>
                        Edit
                    </button>
                    <button className="btn btn-danger " onClick={() => onDelete(note.id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;