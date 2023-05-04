import Head from "next/head"
import { Container, Heading } from "@chakra-ui/react"
import { MatchPrediction } from "@/components/matchPrediction"

const Home = () => {
  return (
    <>
      <Head>
        <title>PreWin</title>
        <meta name="description" content="PreWin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.lg">
        <Heading as="h1" size="2xl" textAlign="center" mt={8}>
          PreWin
        </Heading>
        <Heading as="h2" size="md" textAlign="center" mt={3}>
          プレミアリーグ勝敗予測AI
        </Heading>
        <MatchPrediction />
      </Container>
    </>
  )
}

export default Home
