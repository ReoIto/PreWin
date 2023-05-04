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
          content: `
            あなたはサッカー業界に精通したデータアナリストです。
            過去の戦歴や選手の実力を考慮して、以下2チームの試合の勝敗を予測してください。

            以下の仕様に従って答えてください。

            - 予測結果は「勝ち」か「負け」または「引き分け」のいずれかです。
            - 前半と後半それぞれ何対何になるかを予測してください。（例: 前半1-0、後半2-1）
            - 予測の理由は過去の試合や戦歴を重要視してください。過去のデータから予測を立ててください。
            - 引き分け予測の場合は、detail.winnerとdetail.loserに''を入れてください。
            - チーム名は入力されたチーム名をそのまま使ってください。
            - なお、予測結果のjsonフォーマットにおいて、改行コードは必要ありありません。
            - またマークダウン記法は使わず、素のjsonを返してください。
            - 予測結果は以下のjsonフォーマットで答えてください。
              {
                "teams": [チーム1のチーム名, チーム2のチーム名], String[]
                "detail": {
                  "winner": 勝ったチームのチーム名(引き分けの場合はnull), String
                  "loser": 負けたチームのチーム名(引き分けの場合はnull), String
                  "score": {
                    "firstHalf": [前半のチーム1の得点, 前半のチーム2の得点], Number[]
                    "secondHalf": [後半のチーム1の得点, 後半のチーム2の得点] Number[]
                  },
                  "totalScore": [チーム1の得点, チーム2の得点], Number[]
                  "isDraw": 引き分けかどうか, Boolean
                  "reason": 予測の理由 String
                }
              }
          `
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
    // res.status(500).json({ result: "Internal Server Error" })
    return
  }
  const result = response.data.choices[0].message!.content
  console.log({ result })
  const resultObj = JSON.parse(result)
  console.log({ resultObj })
  res.status(200).json({ teams: resultObj.teams, detail: resultObj.detail })

  // 仮の結果
  // const resultObj = {
  //   teams: [team1, team2] as [string, string],
  //   detail: {
  //     winner: team1,
  //     loser: team2,
  //     score: {
  //       firstHalf: [1, 0] as [number, number],
  //       secondHalf: [2, 1] as [number, number]
  //     },
  //     totalScore: [3, 1] as [number, number],
  //     isDraw: false,
  //     reason: "過去の試合の結果から予測"
  //   }
  // }
  // res.status(200).json({ teams: resultObj.teams, detail: resultObj.detail })
}
