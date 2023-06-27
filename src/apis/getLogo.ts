import { CDN_BASE_URL } from 'src/constants/env'

async function fetchLogo(url: string): Promise<string> {
  const trimmedUrl = url.replace(CDN_BASE_URL as string, '')

  const response = await fetch(`/cdn/${trimmedUrl}`)

  if (response.status !== 200) {
    return ''
  }

  const logo = await response.text()

  return logo ?? ''
}

export default fetchLogo
