import { useState, useCallback } from "react"
import { PredictionRequestData, PredictionResponseData } from "@/types"
import { Constants as Const } from "@/utils/constants"
import { Box, Button, Select } from "@chakra-ui/react"

type Props = {
  setResult: React.Dispatch<React.SetStateAction<string>>
}

export const MatchPredictionForm = ({ setResult }: Props) => {
  const [team1, setTeam1] = useState("")
  const [team2, setTeam2] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setResult("")
      setIsLoading(true)

      const data: PredictionRequestData = {
        team1,
        team2
      }

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }

      const response = await fetch(
        Const.PATHS.API.MATCH_PREDICTION,
        options
      ).catch((err) => {
        console.error(err)
        return null
      })

      if (response === null) {
        alert("エラーが発生しました")
        return
      }

      const responseData: PredictionResponseData = await response.json()
      setResult(responseData.result)
      setIsLoading(false)
    },
    [team1, team2]
  )

  const selectOptions = Const.TEAMS.map((team) => (
    <option key={team} value={team}>
      {team}
    </option>
  ))

  return (
    <form onSubmit={handleSubmit}>
      <Box mt={8}>
        <Select
          placeholder="Select Team 1"
          onChange={(e) => setTeam1(e.target.value)}
          required>
          {selectOptions}
        </Select>
        <Select
          placeholder="Select Team 2"
          onChange={(e) => setTeam2(e.target.value)}
          required>
          {selectOptions}
        </Select>
      </Box>
      <Box mt={8}>
        {isLoading ? (
          <p>勝敗予測中...</p>
        ) : (
          <Button type="submit" colorScheme="blue" size="lg" w="full">
            勝敗予測をする
          </Button>
        )}
      </Box>
    </form>
  )
}
