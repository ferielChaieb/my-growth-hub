export default function SkillsCard({ totalSkills }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Compétences</h2>
          <p className="mt-1 text-sm text-slate-500">Niveau moyen : 0%</p>
        </div>

        <span className="text-2xl text-blue-600">↗</span>
      </div>

      {totalSkills === 0 ? (
        <p className="text-sm text-slate-500">
          Aucune compétence ajoutée.{" "}
          <span className="font-medium text-blue-600">En ajouter</span>
        </p>
      ) : (
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-slate-700">React</span>
              <span className="text-slate-500">80%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-2 w-[80%] rounded-full bg-blue-600" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}