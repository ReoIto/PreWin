import { Box, Heading } from "@chakra-ui/react"

export const Header = () => {
  return (
    <Box>
      <Heading as="h1" size="2xl" textAlign="center" mt={3}>
        PreWin
      </Heading>
      <Heading as="h2" size="md" textAlign="center" mt={3}>
        プレミアリーグ勝敗予測AI
      </Heading>
    </Box>
  )
}
