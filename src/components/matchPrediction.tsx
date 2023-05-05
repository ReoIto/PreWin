import { useState } from "react"
import { MatchPredictionForm } from "@/components/matchPredictionForm"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"

export const MatchPrediction = () => {
  const [teams, setTeams] = useState({
    team1: "",
    team2: ""
  })
  const [result, setResult] = useState({
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

  const winnerOrLoser = (
    teams: { team1: string; team2: string },
    winner: string
  ) => {
    let winnerOrLoser: string[] = []
    if (teams.team1 === winner) {
      winnerOrLoser = ["WINNER", "LOSER"]
    } else if (teams.team2 === winner) {
      winnerOrLoser = ["LOSER", "WINNER"]
    }

    return winnerOrLoser.map((result) => {
      return (
        <Box key={result}>
          <Text
            color={result === "WINNER" ? "red.500" : "blue.500"}
            fontSize="4xl"
            fontWeight="bold"
            fontStyle="italic"
            textAlign="center"
            mt={3}>
            {result}
          </Text>
        </Box>
      )
    })
  }

  const renderResultItem = (heading: string, text: string) => {
    return (
      <Box>
        <Heading as="h3" size="" textAlign="center" mt={3} fontWeight="bold">
          {`- ${heading} -`}
        </Heading>
        <Text
          fontSize="xl"
          fontWeight="semibold"
          textAlign="center"
          mt={2}
          borderBottom="2px"
          borderColor="gray.400">
          {text}
        </Text>
      </Box>
    )
  }

  return (
    <>
      <MatchPredictionForm
        teams={teams}
        setTeams={setTeams}
        setResult={setResult}
      />
      {result.detail.winner && (
        <Box mt={8} whiteSpace="pre-wrap" wordBreak="break-word">
          <Flex justifyContent="space-around">
            {winnerOrLoser(teams, result.detail.winner)}
          </Flex>
          <Box mt={3}>
            {renderResultItem(
              "前半",
              `${result?.detail?.score?.firstHalf[0]} - ${result?.detail?.score?.firstHalf[1]}`
            )}
            {renderResultItem(
              "後半",
              `${result?.detail?.score?.secondHalf[0]} - ${result?.detail?.score?.secondHalf[1]}`
            )}
            {renderResultItem(
              "試合終了",
              `${result?.detail?.totalScore[0]} - ${result?.detail?.totalScore[1]}`
            )}
          </Box>
          {renderResultItem("予想理由", `${result?.detail?.reason}`)}
        </Box>
      )}
    </>
  )
}
