import {createNavigation} from 'next-intl/navigation';

import {locales, defaultLocale} from './config';

export const {Link, redirect, usePathname, useRouter} =
  createNavigation({
    locales,
    localePrefix: 'always',
    defaultLocale,
    pathnames: {
      '/': '/',
      '/login': '/login',
      '/admin': '/admin',
      '/admin/users': '/admin/users',
      '/admin/keys': '/admin/keys',
      '/admin/settings': '/admin/settings',
      '/documents': '/documents',
      '/documents/upload': '/documents/upload',
      '/chat': '/chat',
      '/support': '/support',
      '/search': '/search'
    }
  });
