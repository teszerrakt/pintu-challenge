import { useEffect, useState } from 'react'
import { PINTU_API_URL } from 'src/constants/env'
import { IGetSupportedCurrenciesResponse, IResponse } from 'src/interface'

export async function getServerSideProps() {
  try {
    const response = await fetch(
      `${PINTU_API_URL}/v2/wallet/supportedCurrencies`
    )

    const data: IResponse<IGetSupportedCurrenciesResponse[]> =
      await response.json()

    return {
      props: {
        DATA: data,
        RESPONSE: JSON.stringify(response, null, 2),
      },
    }
  } catch (error) {
    return {
      props: {
        error: error,
      },
    }
  }
}

export default function SupportedCurrenciesPage(props: any) {
  const [clientData, setClientData] = useState<any>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/pintu/v2/wallet/supportedCurrencies`)
        console.log('__RESPONSE__', response)

        const data: IResponse<IGetSupportedCurrenciesResponse[]> =
          await response.json()
        console.log('__DATA__', data)

        setClientData({
          DATA: data,
          RESPONSE: response,
        })
      } catch (error) {
        console.log('__ERROR__', error)
        setClientData({
          ERROR: error,
        })
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Supported Currencies</h1>
      <hr />
      <div className="flex gap-5">
        <div>
          <h2>Server Side Response</h2>
          <pre>{JSON.stringify(props, null, 2)}</pre>
        </div>
        <div>
          <h2>Client Side Response</h2>
          <pre>{JSON.stringify(clientData, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
