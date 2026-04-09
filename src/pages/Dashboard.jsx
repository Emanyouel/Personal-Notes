import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    if (!user) return;
    fetchNotes();
  }, [user]);

  async function fetchNotes() {
    setLoadingNotes(true);
    setError("");

    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setError("Couldn't load your notes. Please refresh.");
    } else {
      setNotes(data);
    }

    setLoadingNotes(false);
  }

  const handleCreate = async ({ title, content }) => {
    const { data, error } = await supabase
      .from("notes")
      .insert({ title, content, user_id: user.id })
      .select()
      .single();

    if (error) throw new Error(error.message);

    setNotes((prev) => [data, ...prev]);
    setShowForm(false);
  };

  const handleUpdate = async ({ title, content }) => {
    const { data, error } = await supabase
      .from("notes")
      .update({ title, content })
      .eq("id", editingNote.id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    setNotes((prev) => prev.map((n) => (n.id === data.id ? data : n)));
    setEditingNote(null);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);

    if (error) {
      setError("Couldn't delete that note. Try again.");
      return;
    }

    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">My Notes</h1>
            <p className="text-gray-500 text-sm mt-1">
              {loadingNotes ? "Loading..." : `${notes.length} ${notes.length === 1 ? "note" : "notes"}`}
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Note
          </button>
        </div>

        {error && (
          <div className="mb-6 text-red-400 text-sm bg-red-950/40 border border-red-800/50 rounded-xl px-4 py-3 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError("")} className="text-red-400 hover:text-red-300 ml-4">✕</button>
          </div>
        )}

        {loadingNotes ? (
          <div className="flex justify-center py-24">
            <svg className="animate-spin w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">No notes yet</h3>
            <p className="text-gray-500 text-sm mb-6">Create your first note to get started.</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors duration-200"
            >
              Create note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={setEditingNote}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

      </main>

      {showForm && <NoteForm onSave={handleCreate} onClose={handleClose} />}
      {editingNote && <NoteForm note={editingNote} onSave={handleUpdate} onClose={handleClose} />}
    </div>
  );
}
