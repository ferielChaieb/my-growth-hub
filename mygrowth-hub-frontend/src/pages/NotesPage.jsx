import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import NoteModal from "../components/notes/NoteModal";
import NoteCard from "../components/notes/NoteCard";
import { createNote, deleteNote, getNotes, searchNotes } from "../services/noteService";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.log("Erreur chargement notes :", error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        if (!query.trim()) {
          loadNotes();
          return;
        }

        const data = await searchNotes(query.trim());
        setNotes(data);
      } catch (error) {
        console.log("Erreur recherche notes :", error);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleCreateNote = async (formData) => {
    setLoading(true);

    try {
      await createNote(formData);
      await loadNotes();
      setOpenModal(false);
    } catch (error) {
      console.log("Erreur création note :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    await loadNotes();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Learning Notes
              </h1>
              <p className="text-sm text-slate-500">
                Capturez et retrouvez vos apprentissages
              </p>
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-blue-600"
            >
              + Nouvelle note
            </button>
          </header>

          <section className="p-8">
            <div className="mb-5 max-w-xl">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="🔍  Rechercher par titre, contenu ou tag..."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            {notes.length === 0 ? (
              <div className="flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                  📖
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Aucune note
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Notez ce que vous apprenez pour mieux le retenir.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {notes.map((note) => (
                  <NoteCard key={note._id} note={note} onDelete={handleDeleteNote} />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {openModal && (
        <NoteModal
          onClose={() => setOpenModal(false)}
          onSubmit={handleCreateNote}
          loading={loading}
        />
      )}
    </div>
  );
}