const leagues = [
  { name: "Premier League", icon: "🏴" },
  { name: "LaLiga", icon: "🇪🇸" },
  { name: "Serie A", icon: "🇮🇹" },
  { name: "Bundesliga", icon: "🇩🇪" },
  { name: "Ligue 1", icon: "🇫🇷" },
  { name: "Champions League", icon: "🏆" },
  { name: "Europa League", icon: "🏅" },
  { name: "World Cup", icon: "🌍" },
];

export default function SidebarLeft() {
  return (
    <aside className="hidden lg:block w-56 bg-[#111] text-white p-4 rounded-lg">
      <h2 className="font-semibold mb-4">Top Leagues</h2>
      <ul className="space-y-3">
        {leagues.map((league, index) => (
          <li key={index} className="flex items-center gap-2 hover:text-gray-300 cursor-pointer">
            <span>{league.icon}</span>
            <span className="text-sm">{league.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
