export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="h-48 bg-slate-100">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-blue-50 text-4xl">
            📁
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies?.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600"
            >
              {tech}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Voir la démo
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
            >
              Code source
            </a>
          )}

          <button
            onClick={() => onEdit(project)}
            className="rounded-xl border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
          >
            Modifier
          </button>

          <button
            onClick={() => onDelete(project._id)}
            className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}