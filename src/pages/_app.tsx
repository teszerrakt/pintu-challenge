import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${inter.className} mx-auto md:p-5 md:pt-0 max-w-7xl`}>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  )
}
