export default function RecentNotesCard({ notes = [] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Notes récentes</h2>
        <a href="/notes" className="text-sm font-medium text-blue-600">
          →
        </a>
      </div>

      {notes.length === 0 ? (
        <p className="text-sm text-slate-500">Aucune note.</p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note._id} className="border-b border-slate-100 pb-3">
              <h3 className="font-semibold text-slate-900">{note.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                {note.description}
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {note.tags?.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}