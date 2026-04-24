import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../services/authService";
import { saveToken } from "../../utils/token";

export default function AuthForm() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerError("");
  };

  const validateForm = () => {
    const newErrors = {};

    const email = formData.email.trim();
    const password = formData.password;

    if (!email) {
      newErrors.email = "Email obligatoire";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format d’email invalide";
    }

    if (!password) {
      newErrors.password = "Mot de passe obligatoire";
    } else if (password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (mode === "register") {
      if (!formData.first_name.trim()) {
        newErrors.first_name = "Prénom obligatoire";
      }

      if (!formData.last_name.trim()) {
        newErrors.last_name = "Nom obligatoire";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirmation obligatoire";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setServerError("");

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // IMPORTANT : on bloque ici
    }

    setLoading(true);

    try {
      if (mode === "register") {
        const payload = {
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        };

        const data = await registerUser(payload);

        setMessage(data.message || "Compte créé avec succès");

        setFormData({
          first_name: "",
          last_name: "",
          email: formData.email,
          password: "",
          confirmPassword: "",
        });

        setMode("login");
        setLoading(false);
        return;
      }

     const payload = {
  email: formData.email.trim().toLowerCase(),
  password: formData.password,
};

const data = await loginUser(payload);

console.log("DATA LOGIN :", data);

// 🔥 IMPORTANT : gérer les 2 cas backend
const token = data.token || data.accessToken;

if (!token) {
  throw new Error("Token introuvable dans la réponse");
}

saveToken(token);

console.log("TOKEN STOCKÉ :", localStorage.getItem("token"));

setMessage("Connexion réussie");
setLoading(false);

navigate("/dashboard");
    } catch (err) {
      setServerError(
        err?.response?.data?.message || "Erreur serveur, réessaie."
      );
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setErrors({});
    setServerError("");
    setMessage("");
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-blue-200">
          <span className="text-2xl text-white">🚀</span>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
          MyGrowth Hub
        </h1>

        <p className="mt-4 text-base text-slate-500">
          Suivez votre progression. Construisez votre carrière de développeur.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/60 backdrop-blur">
        <div className="mb-8 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={`rounded-lg py-3 text-sm font-medium transition ${
              mode === "login"
                ? "bg-white text-slate-900 shadow"
                : "text-slate-500"
            }`}
          >
            Connexion
          </button>

          <button
            type="button"
            onClick={() => switchMode("register")}
            className={`rounded-lg py-3 text-sm font-medium transition ${
              mode === "register"
                ? "bg-white text-slate-900 shadow"
                : "text-slate-500"
            }`}
          >
            Inscription
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "register" && (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Prénom
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Jean"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-500"
                />
                {errors.first_name && (
                  <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Nom
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Dupont"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500"
                />
                {errors.last_name && (
                  <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>
                )}
              </div>
            </>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="vous@exemple.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={
                mode === "register" ? "6 caractères minimum" : "••••••••"
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {mode === "register" && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmez le mot de passe"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {message && (
            <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {message}
            </div>
          )}

          {serverError && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {serverError}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-blue-200 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? "Chargement..."
              : mode === "register"
              ? "Créer mon compte"
              : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}