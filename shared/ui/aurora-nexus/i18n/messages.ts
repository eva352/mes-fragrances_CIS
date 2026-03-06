import { Locale, defaultLocale } from './config'

export async function loadMessages(locale: Locale) {
  try {
    return (await import(`../messages/${locale}.json`)).default
  } catch {
    return (await import(`../messages/${defaultLocale}.json`)).default
  }
}
