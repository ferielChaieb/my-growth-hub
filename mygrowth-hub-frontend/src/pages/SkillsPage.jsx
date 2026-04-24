import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import SkillModal from "../components/skills/SkillModal";
import SkillCard from "../components/skills/SkillCard";
import { createSkill, deleteSkill, getSkills } from "../services/skillService";

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadSkills = async () => {
    try {
      const data = await getSkills();
      setSkills(data);
    } catch (error) {
      console.log("Erreur chargement compétences :", error);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleCreateSkill = async (formData) => {
    setLoading(true);

    try {
      await createSkill(formData);
      await loadSkills();
      setOpenModal(false);
    } catch (error) {
      console.log("Erreur création compétence :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (id) => {
    await deleteSkill(id);
    await loadSkills();
  };

  const average =
    skills.length > 0
      ? Math.round(
          skills.reduce((sum, skill) => sum + Number(skill.level || 0), 0) /
            skills.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Compétences
              </h1>
              <p className="text-sm text-slate-500">
                Suivez votre progression sur chaque technologie
              </p>
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-blue-600"
            >
              + Ajouter
            </button>
          </header>

          <section className="p-8">
            {skills.length === 0 ? (
              <div className="flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                  ✨
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Aucune compétence
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Ajoutez les technologies que vous maîtrisez ou apprenez.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        Niveau global
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Moyenne de toutes vos compétences
                      </p>
                    </div>

                    <span className="text-3xl font-bold text-blue-600">
                      {average}%
                    </span>
                  </div>

                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
                      style={{ width: `${average}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {skills.map((skill) => (
                    <SkillCard
                      key={skill._id}
                      skill={skill}
                      onDelete={handleDeleteSkill}
                    />
                  ))}
                </div>
              </>
            )}
          </section>
        </main>
      </div>

      {openModal && (
        <SkillModal
          onClose={() => setOpenModal(false)}
          onSubmit={handleCreateSkill}
          loading={loading}
        />
      )}
    </div>
  );
}