import { createBrowserRouter } from 'react-router-dom'
import { PageLayout } from '../components/layout/PageLayout'

export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      { path: '/', lazy: async () => ({ Component: (await import('../pages/HomePage')).HomePage }) },
      { path: '/about', lazy: async () => ({ Component: (await import('../pages/AboutPage')).AboutPage }) },
      { path: '/products', lazy: async () => ({ Component: (await import('../pages/ProductsPage')).ProductsPage }) },
      { path: '/peer', lazy: async () => ({ Component: (await import('../pages/PeerPage')).PeerPage }) },
      { path: '/research', lazy: async () => ({ Component: (await import('../pages/ResearchPage')).ResearchPage }) },
      { path: '/research/:slug', lazy: async () => ({ Component: (await import('../pages/ResearchArticlePage')).ResearchArticlePage }) },
      { path: '/academy', lazy: async () => ({ Component: (await import('../pages/AcademyPage')).AcademyPage }) },
      { path: '/consulting', lazy: async () => ({ Component: (await import('../pages/ConsultingPage')).ConsultingPage }) },
      { path: '/contact', lazy: async () => ({ Component: (await import('../pages/ContactPage')).ContactPage }) },
      { path: '/privacy', lazy: async () => ({ Component: (await import('../pages/PrivacyPage')).PrivacyPage }) },
      { path: '/terms', lazy: async () => ({ Component: (await import('../pages/TermsPage')).TermsPage }) },
      { path: '/cookies', lazy: async () => ({ Component: (await import('../pages/CookiesPage')).CookiesPage }) },
      { path: '*', lazy: async () => ({ Component: (await import('../pages/NotFoundPage')).NotFoundPage }) },
    ],
  },
])
