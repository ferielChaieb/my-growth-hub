import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import TaskModal from "../components/tasks/TaskModal";
import TaskCard from "../components/tasks/TaskCard";
import { createTask, getTasks, updateTask, deleteTask } from "../services/taskService";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.log("Erreur chargement tâches :", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (formData) => {
    setLoading(true);
    try {
      await createTask(formData);
      await loadTasks();
      setOpenModal(false);
    } catch (error) {
      console.log("Erreur création tâche :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (task, status) => {
    await updateTask(task._id, { status });
    loadTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const todo = tasks.filter((task) => task.status === "à faire");
  const progress = tasks.filter((task) => task.status === "en cours");
  const done = tasks.filter((task) => task.status === "terminé");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Tâches</h1>
              <p className="text-sm text-slate-500">
                Organisez votre travail par statut
              </p>
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-blue-600"
            >
              + Nouvelle tâche
            </button>
          </header>

          <section className="p-8">
            {tasks.length === 0 ? (
              <div className="flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                  ☑️
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Aucune tâche
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Créez votre première tâche pour commencer à vous organiser.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <TaskColumn
                  title="À faire"
                  color="slate"
                  tasks={todo}
                  onStatusChange={handleChangeStatus}
                  onDelete={handleDeleteTask}
                />

                <TaskColumn
                  title="En cours"
                  color="blue"
                  tasks={progress}
                  onStatusChange={handleChangeStatus}
                  onDelete={handleDeleteTask}
                />

                <TaskColumn
                  title="Terminé"
                  color="cyan"
                  tasks={done}
                  onStatusChange={handleChangeStatus}
                  onDelete={handleDeleteTask}
                />
              </div>
            )}
          </section>
        </main>
      </div>

      {openModal && (
        <TaskModal
          onClose={() => setOpenModal(false)}
          onSubmit={handleCreateTask}
          loading={loading}
        />
      )}
    </div>
  );
}

function TaskColumn({ title, tasks, onStatusChange, onDelete }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
          {title}
          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-500">
            {tasks.length}
          </span>
        </h2>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="flex min-h-[120px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/60 text-sm text-slate-400">
            Aucune tâche
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}