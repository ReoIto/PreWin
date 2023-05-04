import { useState, useCallback } from "react"
import { PredictionRequestData, PredictionResponseData } from "@/types"
import { Constants as Const } from "@/utils/constants"
import { Box, Button, Flex, Select, Text, Spinner } from "@chakra-ui/react"
import Image from "next/image"

type Props = {
  teams: {
    team1: string
    team2: string
  }
  setTeams: React.Dispatch<
    React.SetStateAction<{
      team1: string
      team2: string
    }>
  >
  setResult: React.Dispatch<
    React.SetStateAction<{
      teams: string[]
      detail: {
        winner: string
        loser: string
        score: {
          firstHalf: number[]
          secondHalf: number[]
        }
        totalScore: number[]
        isDraw: boolean
        reason: string
      }
    }>
  >
}

export const MatchPredictionForm = ({ teams, setTeams, setResult }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (teams.team1 === teams.team2) {
        alert("同じチームを選択することはできません")
        return
      }

      setResult({
        teams: ["", ""],
        detail: {
          winner: "",
          loser: "",
          score: {
            firstHalf: [0, 0],
            secondHalf: [0, 0]
          },
          totalScore: [0, 0],
          isDraw: false,
          reason: ""
        }
      })
      setIsLoading(true)

      const data: PredictionRequestData = {
        team1: teams.team1,
        team2: teams.team2
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
      setResult(responseData)
      setIsLoading(false)
    },
    [teams, setResult, setIsLoading]
  )

  const selectOptions = Const.TEAMS.map((team) => (
    <option key={team} value={team}>
      {team}
    </option>
  ))

  const teamImage = (team: string) => {
    return (
      <Box mt={5}>
        <Image
          src={`/teams/${team}.png`}
          width={200}
          height={200}
          alt="teamEmblemImage"
        />
      </Box>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box mt={8}>
        <Flex justifyContent="space-around">
          <Box>
            <Select
              placeholder="チームを選択してください"
              onChange={(e) => setTeams({ ...teams, team1: e.target.value })}
              required>
              {selectOptions}
            </Select>
            {teams.team1 && teamImage(teams.team1)}
          </Box>
          <Box>
            <Text fontSize="6xl" as="i">
              vs
            </Text>
          </Box>
          <Box>
            <Select
              placeholder="チームを選択してください"
              onChange={(e) => setTeams({ ...teams, team2: e.target.value })}
              required>
              {selectOptions}
            </Select>
            {teams.team2 && teamImage(teams.team2)}
          </Box>
        </Flex>
      </Box>
      <Box mt={8}>
        {isLoading ? (
          <Box textAlign="center">
            <Spinner
              thickness="6px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            <Text fontSize="md" mt={3}>
              AIが結果を予測中です...
            </Text>
          </Box>
        ) : (
          <Button type="submit" colorScheme="blue" size="lg" w="full">
            勝敗予測をする
          </Button>
        )}
      </Box>
    </form>
  )
}
