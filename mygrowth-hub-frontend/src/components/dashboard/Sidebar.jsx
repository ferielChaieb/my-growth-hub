import { Link, useLocation, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/token";

const navItems = [
  { label: "Tableau de bord", path: "/dashboard", icon: "▦" },
  { label: "Projets", path: "/projects", icon: "📁" },
  { label: "Tâches", path: "/tasks", icon: "☰" },
  { label: "Compétences", path: "/skills", icon: "✨" },
  { label: "Notes", path: "/notes", icon: "📘" },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <aside className="hidden w-[240px] border-r border-slate-200 bg-white xl:flex xl:flex-col">
      <div className="border-b border-slate-200 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 text-xl text-white shadow-lg shadow-blue-200">
            🚀
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">MyGrowth Hub</h2>
            <p className="text-sm text-slate-500">Suivi développeur</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-5">
        <p className="mb-3 text-sm font-medium text-slate-400">Navigation</p>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              F
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">
                Feriel El Chaieb
              </p>
              <p className="truncate text-xs text-slate-500">
                elchaieb.feriel@gmail.com
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Se déconnecter"
            className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-500"
          >
            ↪
          </button>
        </div>
      </div>
    </aside>
  );
}