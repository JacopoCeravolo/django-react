import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"

function Home() {
    /*
    What we are going to do is to send an authorized request
    because we going to need to keep track 
    from the notes that we have

    */
    const [notes, setNotes] = useState([]);
    //in this small project 
    //just going to create some state for content and title
    //instead of putting it in a separate component
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    //we get the notes asynchronously
    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);

                //we also print the notes to see in console what they are
                //obviously deletable in scalable projects
                //needless to say
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                //204 is note deleted
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };


    const createNote = (e) => {
        e.preventDefault();
        api
            //we pass content and title from the note we want to delete
            .post("/api/notes/", { content, title })
            .then((res) => {
                //201 is created note (otherwise => error)
                if (res.status === 201) alert("Note created!"); 
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;