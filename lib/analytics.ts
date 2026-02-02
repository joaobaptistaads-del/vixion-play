export function trackEvent(eventName: string, payload: Record<string, any> = {}) {
  try {
    console.log('[analytics]', eventName, payload)
    // push to dataLayer if present (for GTM)
    // @ts-ignore
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      // @ts-ignore
      ;(window as any).dataLayer.push({ event: eventName, ...payload })
    }
  } catch (e) {
    // swallow
  }
}
