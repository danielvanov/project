export default function SidebarRight() {
  return (
    <aside className="hidden lg:block w-72 space-y-6 text-white">
      <div className="bg-[#111] p-4 rounded-lg">
        <h2 className="font-semibold mb-3">Top Transfers</h2>
        <ul className="space-y-2 text-sm">
          <li>🟢 Jean-Clair Todibo → WHU (€14.5M)</li>
          <li>🔴 Pierre Kalulu → Juventus (€12M)</li>
          <li>⚪ Nuno Tavares → Milan (€9M)</li>
        </ul>
      </div>

      <div className="bg-[#111] p-4 rounded-lg">
        <h2 className="font-semibold mb-3">News</h2>
        <ul className="space-y-2 text-sm">
          <li>⚽ Mbappé wins 2025 Ballon d'Or?</li>
          <li>🔥 Haaland scores 5 goals in 40 mins</li>
        </ul>
      </div>
    </aside>
  );
}
