import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import ProjectModal from "../components/projects/ProjectModal";
import ProjectCard from "../components/projects/ProjectCard";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../services/projectService";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.log("Erreur chargement projets :", error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const formatProjectPayload = (formData) => {
    return {
      title: formData.title,
      description: formData.description,
      technologies: formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
      image: formData.image,
      githubUrl: formData.githubUrl,
      liveUrl: formData.liveUrl,
    };
  };

  const handleSubmitProject = async (formData) => {
    setLoading(true);

    try {
      const payload = formatProjectPayload(formData);

      if (editingProject) {
        await updateProject(editingProject._id, payload);
      } else {
        await createProject(payload);
      }

      await loadProjects();
      setOpenModal(false);
      setEditingProject(null);
    } catch (error) {
      console.log("Erreur projet :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingProject(null);
    setOpenModal(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setOpenModal(true);
  };

  const handleDeleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer ce projet ?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(id);
      await loadProjects();
    } catch (error) {
      console.log("Erreur suppression projet :", error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingProject(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Portfolio</h1>
              <p className="text-sm text-slate-500">
                Vos projets de développement
              </p>
            </div>

            <button
              onClick={handleOpenCreate}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-blue-600"
            >
              + Nouveau
            </button>
          </header>

          <section className="p-8">
            {projects.length === 0 ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                  📁
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Aucun projet
                </h2>

                <p className="mt-2 max-w-md text-sm text-slate-500">
                  Commencez à construire votre portfolio en ajoutant votre
                  premier projet.
                </p>

                <button
                  onClick={handleOpenCreate}
                  className="mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-blue-600"
                >
                  + Créer un projet
                </button>
              </div>
            ) : (
              <div>
                <h2 className="mb-6 text-3xl font-bold text-slate-900">
                  Mes Projets
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      onEdit={handleEditProject}
                      onDelete={handleDeleteProject}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        </main>
      </div>

      {openModal && (
        <ProjectModal
          onClose={handleCloseModal}
          onSubmit={handleSubmitProject}
          loading={loading}
          initialData={editingProject}
        />
      )}
    </div>
  );
}