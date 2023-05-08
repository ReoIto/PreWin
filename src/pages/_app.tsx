import { useEffect } from "react"
import { useRouter } from "next/router"
import "@/styles/globals.css"
import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import Script from "next/script"
import * as gtag from "@/lib/gtag"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    const handleRouterChange = (url: any) => {
      gtag.pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouterChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouterChange)
    }
  }, [router.events])

  return (
    <ChakraProvider>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gtag.GA_TRACKING_ID}');
            `
        }}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
