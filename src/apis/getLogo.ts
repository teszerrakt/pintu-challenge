import { CDN_BASE_URL } from 'src/constants/env'

async function fetchLogo(url: string): Promise<string> {
  const trimmedUrl = url.replace(CDN_BASE_URL as string, '')

  const response = await fetch(`/cdn/${trimmedUrl}`)
  const logo = await response.text()

  return logo ?? ''
}

export default fetchLogo
