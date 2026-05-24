export interface SoundboardItem {
  id: string
  name: string
  audioUrl: string
  icon: string
}

export interface Wallpaper {
  id: string
  name: string
  imageUrl: string
  downloadUrl: string
}

export interface PredictionGame {
  id: string
  homeTeam: string
  awayTeam: string
  matchDate: string
  userPrediction?: {
    homeScore: number
    awayScore: number
  }
}