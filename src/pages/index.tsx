import Head from "next/head"
import { useState } from "react"
import { Box, Container, Heading } from "@chakra-ui/react"
import { MatchPredictionForm } from "@/components/matchPredictionForm"

export default function Home() {
  const [result, setResult] = useState("")

  return (
    <>
      <Head>
        <title>PreWin</title>
        <meta name="description" content="PreWin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.lg">
        <Heading as="h1" size="2xl" textAlign="center" mt="8">
          PreWin
        </Heading>
        <Heading as="h2" size="md" textAlign="center" mt="3">
          プレミアリーグ勝敗予測AI
        </Heading>
        <MatchPredictionForm setResult={setResult} />
        <Box mt={8} whiteSpace="pre-wrap" wordBreak="break-word">
          {result}
        </Box>
      </Container>
    </>
  )
}
