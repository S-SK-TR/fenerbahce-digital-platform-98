import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Calendar, Clock, Trophy, Users, MapPin } from 'lucide-react'

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  time: string
  stadium: string
  league: string
  score?: {
    home: number
    away: number
  }
}

interface TeamStanding {
  position: number
  team: string
  played: number
  won: number
  drawn: number
  lost: number
  points: number
}

export function FixturesPage() {
  const [activeTab, setActiveTab] = useState<'matches' | 'standings'>('matches')

  const upcomingMatches: Match[] = [
    {
      id: '1',
      homeTeam: 'Fenerbahçe',
      awayTeam: 'Galatasaray',
      date: '2023-11-15',
      time: '20:45',
      stadium: 'Şükrü Saracoğlu Stadyumu',
      league: 'Süper Lig'
    },
    {
      id: '2',
      homeTeam: 'Beşiktaş',
      awayTeam: 'Fenerbahçe',
      date: '2023-11-22',
      time: '19:00',
      stadium: 'Vodafone Park',
      league: 'Süper Lig'
    }
  ]

  const liveMatches: Match[] = [
    {
      id: '3',
      homeTeam: 'Fenerbahçe',
      awayTeam: 'Trabzonspor',
      date: '2023-11-10',
      time: '18:30',
      stadium: 'Şükrü Saracoğlu Stadyumu',
      league: 'Süper Lig',
      score: {
        home: 2,
        away: 1
      }
    }
  ]

  const teamStandings: TeamStanding[] = [
    { position: 1, team: 'Fenerbahçe', played: 10, won: 7, drawn: 2, lost: 1, points: 23 },
    { position: 2, team: 'Galatasaray', played: 10, won: 6, drawn: 3, lost: 1, points: 21 },
    { position: 3, team: 'Beşiktaş', played: 10, won: 6, drawn: 2, lost: 2, points: 20 }
  ]

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Button
          variant={activeTab === 'matches' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('matches')}
          className="flex-1 md:flex-none"
        >
          <Calendar size={16} />
          Maçlar
        </Button>
        <Button
          variant={activeTab === 'standings' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('standings')}
          className="flex-1 md:flex-none"
        >
          <Trophy size={16} />
          Puan Durumu
        </Button>
      </div>

      {activeTab === 'matches' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Canlı Maçlar */}
          {liveMatches.length > 0 && (
            <GlassCard className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock size={18} className="text-fb-gold-500" />
                Canlı Maçlar
              </h3>
              <div className="space-y-3">
                {liveMatches.map((match) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-4 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/70">{match.league}</span>
                      <span className="text-sm text-fb-gold-500 font-medium">CANLI</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={`/teams/${match.homeTeam.toLowerCase()}.png`} alt={match.homeTeam} className="w-8 h-8" />
                        <span className="font-medium">{match.homeTeam}</span>
                      </div>
                      <div className="text-2xl font-bold text-fb-gold-500">
                        {match.score?.home} - {match.score?.away}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{match.awayTeam}</span>
                        <img src={`/teams/${match.awayTeam.toLowerCase()}.png`} alt={match.awayTeam} className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-sm text-white/70">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {match.stadium}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {match.date}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Yaklaşan Maçlar */}
          <GlassCard className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-fb-gold-500" />
              Yaklaşan Maçlar
            </h3>
            <div className="space-y-3">
              {upcomingMatches.map((match) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-4 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/70">{match.league}</span>
                    <span className="text-sm text-white/70">{match.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={`/teams/${match.homeTeam.toLowerCase()}.png`} alt={match.homeTeam} className="w-8 h-8" />
                      <span className="font-medium">{match.homeTeam}</span>
                    </div>
                    <div className="text-sm text-white/70">vs</div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{match.awayTeam}</span>
                      <img src={`/teams/${match.awayTeam.toLowerCase()}.png`} alt={match.awayTeam} className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-white/70">
                    <Clock size={14} />
                    {match.time}
                    <MapPin size={14} className="ml-2" />
                    {match.stadium}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Sonuçlar */}
          <GlassCard className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Trophy size={18} className="text-fb-gold-500" />
              Sonuçlar
            </h3>
            <div className="space-y-3">
              {liveMatches.map((match) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-4 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/70">{match.league}</span>
                    <span className="text-sm text-white/70">{match.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={`/teams/${match.homeTeam.toLowerCase()}.png`} alt={match.homeTeam} className="w-8 h-8" />
                      <span className="font-medium">{match.homeTeam}</span>
                    </div>
                    <div className="text-2xl font-bold text-fb-gold-500">
                      {match.score?.home} - {match.score?.away}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{match.awayTeam}</span>
                      <img src={`/teams/${match.awayTeam.toLowerCase()}.png`} alt={match.awayTeam} className="w-8 h-8" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {activeTab === 'standings' && (
        <GlassCard>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Trophy size={18} className="text-fb-gold-500" />
            Süper Lig Puan Durumu
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-2 px-3 text-left">#</th>
                  <th className="py-2 px-3 text-left">Takım</th>
                  <th className="py-2 px-3 text-center">O</th>
                  <th className="py-2 px-3 text-center">G</th>
                  <th className="py-2 px-3 text-center">B</th>
                  <th className="py-2 px-3 text-center">M</th>
                  <th className="py-2 px-3 text-center">P</th>
                </tr>
              </thead>
              <tbody>
                {teamStandings.map((team) => (
                  <tr key={team.position} className="border-b border-white/5 last:border-b-0 hover:bg-white/5">
                    <td className="py-2 px-3 text-fb-gold-500 font-medium">{team.position}</td>
                    <td className="py-2 px-3 flex items-center gap-2">
                      <img src={`/teams/${team.team.toLowerCase()}.png`} alt={team.team} className="w-6 h-6" />
                      {team.team}
                    </td>
                    <td className="py-2 px-3 text-center">{team.played}</td>
                    <td className="py-2 px-3 text-center">{team.won}</td>
                    <td className="py-2 px-3 text-center">{team.drawn}</td>
                    <td className="py-2 px-3 text-center">{team.lost}</td>
                    <td className="py-2 px-3 text-center font-medium">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}
    </div>
  )
}