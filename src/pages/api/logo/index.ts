import { NextApiRequest, NextApiResponse } from 'next'

async function getLogo(url: string): Promise<string> {
  const response = await fetch(url)

  if (response.status !== 200) {
    return ''
  }

  const logo = await response.text()

  return logo ?? ''
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { url } = req.query

    if (!url) {
      throw new Error('Error: URL is required')
    }

    const payload = await getLogo(url as string)

    return res.status(200).json({
      message: 'success',
      code: 200,
      payload,
    })
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
      code: 500,
      payload: null,
    })
  }
}
