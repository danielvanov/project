// components/MatchGroup.tsx
'use client'

import Image from 'next/image'

interface Team {
  id: number
  name: string
  logo: string
}

interface Match {
  id: number
  home_team: Team
  away_team: Team
  score_home: number
  score_away: number
  status: string
  date: string
  league_name: string | null
}

interface Props {
  leagueName: string
  matches: Match[]
}

export default function MatchGroup({ leagueName, matches }: Props) {
  return (
    <div className="mb-6 rounded-xl overflow-hidden bg-[#1a1a1a] shadow-md">
      {/* League name bar */}
      <div className="bg-[#2a2a2a] px-4 py-2 font-semibold text-white text-sm flex items-center gap-2">
        <span className="text-lg">🌍</span>
        <span>{leagueName}</span>
      </div>

      {/* Match rows */}
      {matches.map((match) => (
        <div
          key={match.id}
          className="flex items-center justify-between px-4 py-3 border-t border-[#333] hover:bg-[#222] transition"
        >
          {/* Status */}
          <div className="w-10">
            <span className="bg-[#444] text-xs text-gray-300 px-2 py-1 rounded-full">
              {match.status}
            </span>
          </div>

          {/* Home team */}
          <div className="flex items-center gap-2 w-1/4 justify-end text-right">
            <span className="truncate">{match.home_team.name}</span>
            <Image
              src={match.home_team.logo}
              alt={match.home_team.name}
              width={20}
              height={20}
              className="rounded-full"
            />
          </div>

          {/* Score */}
          <div className="text-center font-bold w-1/6">
            {match.score_home} <span className="text-gray-400">:</span> {match.score_away}
          </div>

          {/* Away team */}
          <div className="flex items-center gap-2 w-1/4 justify-start text-left">
            <Image
              src={match.away_team.logo}
              alt={match.away_team.name}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="truncate">{match.away_team.name}</span>
          </div>

          {/* Time (optional) */}
          <div className="w-10 text-sm text-gray-400 text-right">{match.status}</div>
        </div>
      ))}
    </div>
  )
}
