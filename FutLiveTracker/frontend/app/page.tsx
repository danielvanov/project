// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import SidebarLeft from '@/components/SidebarLeft';
import SidebarRight from '@/components/SidebarRight';
import DatePickerBar from '@/components/DatePickerBar';
import MatchGroup from '@/components/MatchGroup';

interface Match {
  id: number;
  home_team: { id: number; name: string; logo: string };
  away_team: { id: number; name: string; logo: string };
  score_home: number;
  score_away: number;
  status: string;
  date: string;
  league_name: string | null;
}

export default function HomePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [filteredDate, setFilteredDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchMatches = async () => {
      const res = await fetch(`http://localhost:8000/api/matches/?date=${filteredDate}`);
      const data = await res.json();
      setMatches(data);
    };

    fetchMatches();
  }, [filteredDate]);

  // Group matches by league
  const matchesByLeague = matches.reduce((acc: Record<string, Match[]>, match) => {
    const league = match.league_name || 'Other';
    if (!acc[league]) acc[league] = [];
    acc[league].push(match);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <Header />

      <main className="flex px-4 md:px-8 mt-4 gap-6">
        <aside className="w-1/5 hidden lg:block">
          <SidebarLeft />
        </aside>

        <section className="flex-1 w-full">
          <DatePickerBar selectedDate={filteredDate} onDateChange={setFilteredDate} />

          {Object.entries(matchesByLeague).length === 0 ? (
            <p className="text-center mt-10">No matches on this date</p>
          ) : (
            Object.entries(matchesByLeague).map(([league, matches]) => (
              <MatchGroup key={league} league={league} matches={matches} />
            ))
          )}
        </section>

        <aside className="w-1/5 hidden xl:block">
          <SidebarRight />
        </aside>
      </main>
    </div>
  );
}
