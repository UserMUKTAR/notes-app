import { useState, useEffect } from "react";
import axios from "axios";
import "./Notes.css";

const API = import.meta.env.VITE_API_URL;


function Notes() {
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark"
);


 // Load notes from backend
  const loadNotes = async () => {
    try {
    const res = await axios.get(`${API}/page?page=0&size=10`);

    console.log("API RESPONSE:", res.data); // debug

    setNotes(res.data?.content || []);
  } catch (err) {
    console.error("API ERROR:", err);
    setNotes([]);
  }
  };

  useEffect(() => {
    loadNotes();
  }, []);

    // Add new note
  const addNote = async () => {
    if (!title.trim() ||!content.trim()) return;

    await axios.post(API, {   title: title.trim(), content: content.trim()});
    setTitle("");
    setContent("");
    loadNotes();
  };

   // Delete note
  const deleteNote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    await axios.delete(`${API}/${id}`);
    loadNotes();
  };

   // Begin editing
  const startEdit = (note) => {
  setEditingNote(note);
};

 // Save edited note
const saveEdit = async () => {
  await axios.put(`${API}/${editingNote.id}`, {
    title: editingNote.title,
    content: editingNote.content
  });

  setEditingNote(null);
  loadNotes();
};


  // ⭐ Filter + Sort Logic (STEP 4)
  const filteredNotes = notes
    .filter((note) => {
      const s = search.toLowerCase();
      if (!notes) return <h2>Loading...</h2>;
      return (
        (note.title && note.title.toLowerCase().includes(s)) ||
        (note.content && note.content.toLowerCase().includes(s))
      );
    })
    .sort((a, b) => {
      if (sortType === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortType === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      const titleA = a.title?.toLowerCase() || "";
      const titleB = b.title?.toLowerCase() || "";
      if (sortType === "az") return titleA.localeCompare(titleB);
      if (sortType === "za") return titleB.localeCompare(titleA);
      return 0;
    });


  return (
    <div className={darkMode ? "container dark" : "container"}>
      <h2>📝 Notes App</h2>
    
  {/* Dark Mode Button */}
  <button 
  className="theme-toggle"
  onClick={() => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  }}
  >
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}

</button>

      {/* Title */}
      <input
        className="title-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Content */}
      <textarea
        className="content-input"
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

           

      <button className="add-btn" onClick={addNote}>
        Add Note
      </button>

     
 {/* Search */}
       <input
  className="search-input"
  placeholder="Search notes..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
 
    />
 {/* Sort */}
    <select
  className="sort-select"
  value={sortType}
  onChange={(e) => setSortType(e.target.value)}
>
  <option value="latest">Latest First</option>
  <option value="oldest">Oldest First</option>
  <option value="az">A → Z</option>
  <option value="za">Z → A</option>
</select>
    
     <h3>Your Notes</h3>

 {/* No Notes in DB */}
      {notes.length === 0 && <p>No notes yet...</p>}

   {/* No search results */}
       {filteredNotes.length === 0 && notes.length > 0 && search && (
        <p>No matching notes found.</p>
      )}

    {filteredNotes.map((note) => (
  <div className="note-card" key={note.id}>
    <div className="note-title">{note.title}</div>
    <p>{note.content}</p>

    <small className="note-time">
      {note.createdAt && (
        <>
          Created: {new Date(note.createdAt).toLocaleString()} <br />
        </>
      )}

      {note.updatedAt && (
        <>
          Updated: {new Date(note.updatedAt).toLocaleString()}
        </>
      )}

      
    </small>

    <button className="edit-btn" onClick={() => startEdit(note)}>
      Edit
    </button>

    <button className="note-delete" onClick={() => deleteNote(note.id)}>
      Delete
    </button>
  </div>
))}


         {/* Edit Modal */}
      {editingNote && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Note</h3>

            <input
              className="title-input"
              value={editingNote.title}
              onChange={(e) =>
                setEditingNote({ ...editingNote, title: e.target.value })
              }
            />

            <textarea
              className="content-input"
              value={editingNote.content}
              onChange={(e) =>
                setEditingNote({ ...editingNote, content: e.target.value })
              }
            ></textarea>

            <button className="add-btn" onClick={saveEdit}>
              Save
            </button>

            <button
              className="note-delete"
              onClick={() => setEditingNote(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}




    </div>
    
  );
  

}

export default Notes;
