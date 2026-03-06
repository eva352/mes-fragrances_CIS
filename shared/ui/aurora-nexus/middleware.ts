import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'

import { Locale, defaultLocale, locales } from './i18n/config'

const INTERNAL_API_BASE_URL =
  process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const CACHE_TTL_MS = 60_000
let cachedLocale: Locale = defaultLocale
let lastFetchTimestamp = 0

async function resolveDefaultLocale(): Promise<Locale> {
  const now = Date.now()
  if (now - lastFetchTimestamp < CACHE_TTL_MS) {
    return cachedLocale
  }

  try {
    const response = await fetch(`${INTERNAL_API_BASE_URL}/api/public/preferences`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    if (response.ok) {
      const data = await response.json()
      const preferred = (data?.locale_short || data?.locale || defaultLocale).split('-')[0]
      if ((locales as readonly string[]).includes(preferred)) {
        cachedLocale = preferred as Locale
      }
    }
  } catch (error) {
    // Ignore network errors and keep the last known locale
  } finally {
    lastFetchTimestamp = now
  }

  return cachedLocale
}

export default async function middleware(request: NextRequest) {
  const dynamicDefault = await resolveDefaultLocale()
  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale: dynamicDefault,
    localePrefix: 'always',
  })

  return handleI18nRouting(request)
}

export const config = {
  matcher: [
    '/',
    '/(fr|en|es|pt|de)/:path*',
    '/((?!_next|api|.*\\.[\\w]+$).*)',
  ],
}
