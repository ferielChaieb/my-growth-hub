export default function TaskProgressCard({
  todoTasks,
  inProgressTasks,
  completedTasks,
  totalTasks,
}) {
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Avancement des tâches
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {progress}% des tâches terminées
          </p>
        </div>

        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Voir tout →
        </button>
      </div>

      <div className="mb-8 h-3 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">○ À faire</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">{todoTasks}</h3>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <p className="text-sm text-blue-600">◔ En cours</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            {inProgressTasks}
          </h3>
        </div>

        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
          <p className="text-sm text-cyan-700">◉ Terminé</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            {completedTasks}
          </h3>
        </div>
      </div>
    </div>
  );
}