import Head from "next/head"
import { Container } from "@chakra-ui/react"
import { MatchPrediction } from "@/components/matchPrediction"
import { Header } from "@/components/Header"

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
        <Header />
        <MatchPrediction />
      </Container>
    </>
  )
}

export default Home
