import AuthForm from "../components/auth/AuthForm";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-slate-100 flex items-center justify-center px-4">
      <AuthForm />
    </div>
  );
}