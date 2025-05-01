import {useState, useEffect, use} from "react"
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        getNotes();
    }, [])
    
    const getNotes = () => {
        api.get("/api/notes/")//get this route from backend URLs
        .then((res) => res.data)
        .then((data) => { setNotes(data); console.log("data: ",data) })
        .catch((err) => alert(err));
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}`).then((res) => {
            if (res.status === 204) alert("Note deleted!")
            else alert("Failed to delete note.")
            getNotes()// once note is deleted, this gets updated array of notes
        }).catch((error) => alert(error))
    }

    const createNote = (e) => {
        e.preventDefault()
        api.post("/api/notes/", {content, title}).then((res) => {
            if (res.status === 201) alert("Note Created!")
            else alert("Failed to create note.")
            getNotes()// once note is deleted, this gets updated array of notes
        }).catch((error) => alert(error))
    }

    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => 
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                )}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br/>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br/>
                <textarea
                    // type="text"
                    id="content"
                    name="content"
                    required
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                >
                </textarea>
                <br/>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
}

export default Home;