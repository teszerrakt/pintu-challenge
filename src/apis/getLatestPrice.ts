async function getLatestPrice() {
  try {
    const response = await fetch(`/api/latestPrice`)
    const data = await response.json()

    return data.payload
  } catch (error) {
    return []
  }
}

export default getLatestPrice
