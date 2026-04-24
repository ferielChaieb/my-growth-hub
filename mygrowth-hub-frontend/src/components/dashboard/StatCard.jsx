export default function StatCard({
  title,
  value,
  icon,
  iconBg = "bg-blue-100",
  iconText = "text-blue-600",
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-slate-500">
            {title}
          </p>
          <h3 className="mt-2 text-4xl font-bold text-slate-900">{value}</h3>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg} ${iconText}`}
        >
          <span className="text-xl">{icon}</span>
        </div>
      </div>
    </div>
  );
}