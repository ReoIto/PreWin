export type PredictionRequestData = {
  team1: string
  team2: string
}

export type PredictionResponseData = {
  teams: [string, string]
  detail: {
    winner: string
    loser: string
    score: {
      firstHalf: [number, number]
      secondHalf: [number, number]
    }
    totalScore: [number, number]
    isDraw: boolean
    reason: string
  }
}
