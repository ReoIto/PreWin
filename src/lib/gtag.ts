interface Window {
  gtag: any
}
declare let window: Window

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID!, {
    page_path: url
  })
}
