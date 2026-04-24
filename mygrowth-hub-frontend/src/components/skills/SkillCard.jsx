export default function SkillCard({ skill, onDelete }) {
  const level = Number(skill.level || 0);

  const levelLabel =
    level >= 80 ? "Avancé" : level >= 50 ? "Intermédiaire" : "Débutant";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{skill.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{levelLabel}</p>
        </div>

        <button
          onClick={() => onDelete(skill._id)}
          className="rounded-lg px-2 py-1 text-sm text-slate-400 hover:bg-red-50 hover:text-red-500"
        >
          ×
        </button>
      </div>

      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-600">Progression</span>
        <span className="font-bold text-blue-600">{level}%</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}