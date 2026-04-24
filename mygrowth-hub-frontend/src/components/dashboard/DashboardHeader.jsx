export default function DashboardHeader() {
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Bonjour, Feriel 
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Voici un aperçu de votre progression
          </p>
        </div>
      </div>
    </header>
  );
}