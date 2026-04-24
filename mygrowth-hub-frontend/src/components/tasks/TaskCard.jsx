export default function TaskCard({ task, onStatusChange, onDelete }) {
  const nextStatuses = ["à faire", "en cours", "terminé"].filter(
    (status) => status !== task.status
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">{task.title}</h3>

          {task.description && (
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {task.description}
            </p>
          )}
        </div>

        <button
          onClick={() => onDelete(task._id)}
          className="rounded-lg px-2 py-1 text-sm text-slate-400 hover:bg-red-50 hover:text-red-500"
        >
          ×
        </button>
      </div>

      <div className="mb-4">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
          {task.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {nextStatuses.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(task, status)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            → {status}
          </button>
        ))}
      </div>
    </div>
  );
}