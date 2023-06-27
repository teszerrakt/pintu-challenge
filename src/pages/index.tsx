import HomeScreen from 'src/screens/Home'
import { getPayload } from 'src/pages/api/latestPrice'

export async function getServerSideProps() {
  try {
    const initialData = await getPayload()

    return {
      props: {
        initialData,
      },
    }
  } catch (error) {
    return {
      props: {
        initialData: [],
      },
    }
  }
}

export default HomeScreen
