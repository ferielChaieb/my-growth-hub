export default function NoteCard({ note, onDelete }) {
  const date = note.noteDate || note.createdAt;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
      })
    : "";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{note.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            {note.description}
          </p>
        </div>

        <button
          onClick={() => onDelete(note._id)}
          className="rounded-lg px-2 py-1 text-sm text-slate-400 hover:bg-red-50 hover:text-red-500"
        >
          ×
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex flex-wrap gap-2">
          {note.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        <span className="text-xs text-slate-400">{formattedDate}</span>
      </div>
    </div>
  );
}