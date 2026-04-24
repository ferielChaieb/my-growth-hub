import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCard from "../components/dashboard/StatCard";
import TaskProgressCard from "../components/dashboard/TaskProgressCard";
import SkillsCard from "../components/dashboard/SkillsCard";
import RecentProjectsCard from "../components/dashboard/RecentProjectsCard";
import RecentNotesCard from "../components/dashboard/RecentNotesCard";

import { getDashboardStats } from "../services/dashboardService";
import { getProjects } from "../services/projectService";
import { getNotes } from "../services/noteService";
import { getSkills } from "../services/skillService";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const [statsData, projectsData, notesData, skillsData] =
        await Promise.all([
          getDashboardStats(),
          getProjects(),
          getNotes(),
          getSkills(),
        ]);

      setStats(statsData);
      setProjects(projectsData.slice(0, 3));
      setNotes(notesData.slice(0, 3));
      setSkills(skillsData);
    } catch (error) {
      console.log("Erreur dashboard :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // ✅ Loader pendant le chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Chargement du dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1">
          <DashboardHeader />

          <div className="p-5">
            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard title="PROJETS" value={stats?.totalProjects} icon="📁" />
              <StatCard title="TÂCHES" value={stats?.totalTasks} icon="☰" />
              <StatCard title="COMPÉTENCES" value={stats?.totalSkills} icon="✨" />
              <StatCard title="NOTES" value={stats?.totalNotes} icon="📘" />
            </div>

            {/* Progress + Skills */}
            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <TaskProgressCard
                  todoTasks={stats?.todoTasks}
                  inProgressTasks={stats?.inProgressTasks}
                  completedTasks={stats?.completedTasks}
                  totalTasks={stats?.totalTasks}
                />
              </div>

              <SkillsCard skills={skills} />
            </div>

            {/* Projects + Notes */}
            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <RecentProjectsCard projects={projects} />
              </div>

              <RecentNotesCard notes={notes} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}