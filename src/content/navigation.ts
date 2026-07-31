import type { FooterGroup, NavigationItem } from '../types/content'

export const mainNavigation: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Products',
    href: '/products',
    children: [
      {
        label: 'PEER',
        href: '/peer',
        description: 'Guided writing assessment and feedback',
      },
    ],
  },
  { label: 'Research', href: '/research' },
  { label: 'Academy', href: '/academy' },
  { label: 'Consulting', href: '/consulting' },
  { label: 'Contact', href: '/contact' },
]

export const footerNavigation: FooterGroup[] = [
  {
    title: 'Organisation',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Research', href: '/research' },
    ],
  },
  {
    title: 'Offerings',
    links: [
      { label: 'PEER', href: '/peer' },
      { label: 'Academy', href: '/academy' },
      { label: 'Consulting', href: '/consulting' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
]
