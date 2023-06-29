async function fetchLogo(url: string): Promise<string> {
  const response = await fetch(`/api/logo?url=${encodeURIComponent(url)}`)

  if (response.status !== 200) {
    return ''
  }

  const json = await response.json()

  const logo = json.payload

  return logo ?? ''
}

export default fetchLogo
