import type { NextApiRequest, NextApiResponse } from "next"
import { PredictionRequestData, PredictionResponseData } from "@/types"
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi
} from "openai"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PredictionResponseData>
) {
  const { team1, team2 } = req.body as PredictionRequestData
  const config = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY
  })
  const openai = new OpenAIApi(config)

  const response = await openai
    .createChatCompletion({
      model: process.env.OPEN_AI_MODEL_ID!,
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content:
            "あなたはサッカー業界に精通したデータアナリストです。過去の戦歴や選手の実力を考慮して、以下2チームの試合の勝敗を予想してください"
        },
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: `${team1} vs ${team2}`
        }
      ]
    })
    .catch((err) => {
      console.error(err)
      return null
    })

  if (response == null || response.status == 500) {
    res.status(500).json({ result: "Internal Server Error" })
    return
  }

  const result = response.data.choices[0]
  res.status(200).json({ result: result.message!.content })
}
