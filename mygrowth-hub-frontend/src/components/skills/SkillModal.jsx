import { useState } from "react";

export default function SkillModal({ onClose, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    name: "",
    level: 50,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return;

    onSubmit({
      name: formData.name.trim(),
      level: Number(formData.level),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-start justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            Nouvelle compétence
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-slate-400 hover:text-slate-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Nom *
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="React, Python, Figma..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                Niveau
              </label>
              <span className="text-xl font-bold text-blue-600">
                {formData.level}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={formData.level}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, level: e.target.value }))
              }
              className="w-full accent-blue-600"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-blue-600 disabled:opacity-60"
            >
              {loading ? "Ajout..." : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}