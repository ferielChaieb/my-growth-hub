export default function RecentProjectsCard({ projects = [] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Projets récents</h2>
        <a href="/projects" className="text-sm font-medium text-blue-600">
          Voir tout →
        </a>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
          Aucun projet pour le moment.
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <h3 className="font-bold text-slate-900">{project.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                {project.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies?.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                  >
                    {tech}
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