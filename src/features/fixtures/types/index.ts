export interface MatchPrediction {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  modelName: string
  predictionDate: string
  winProbability: number
  drawProbability: number
  lossProbability: number
}
