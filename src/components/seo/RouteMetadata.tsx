import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getResearchItem } from '../../content/research'
import { routeSeo, siteConfig, type SeoRecord } from '../../content/seo'

function setMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([name, value]) => element?.setAttribute(name, value))
}

function setCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }
  element.href = href
}

function breadcrumbSchema(pathname: string) {
  const labels: Record<string, string> = { about: 'About', products: 'Products', peer: 'PEER', research: 'Research', academy: 'Academy', consulting: 'Consulting', contact: 'Contact', privacy: 'Privacy Policy', terms: 'Terms of Use', cookies: 'Cookie Policy' }
  const segments = pathname.split('/').filter(Boolean)
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url }]
  segments.forEach((segment, index) => {
    const itemPath = `/${segments.slice(0, index + 1).join('/')}`
    const researchItem = index === 1 && segments[0] === 'research' ? getResearchItem(segment) : undefined
    items.push({ '@type': 'ListItem', position: index + 2, name: researchItem?.title || labels[segment] || segment, item: `${siteConfig.url}${itemPath}` })
  })
  return { '@type': 'BreadcrumbList', itemListElement: items }
}

function getPageData(pathname: string): { seo: SeoRecord; schemas: Record<string, unknown>[] } {
  const globalSchemas: Record<string, unknown>[] = []
  if (pathname === '/') {
    globalSchemas.push(
      { '@type': 'Organization', '@id': `${siteConfig.url}/#organization`, name: 'Topscore Learning', url: siteConfig.url, email: 'hello@topscorelearning.com', description: siteConfig.defaultDescription },
      { '@type': 'WebSite', '@id': `${siteConfig.url}/#website`, name: 'Topscore Learning', url: siteConfig.url, publisher: { '@id': `${siteConfig.url}/#organization` } },
    )
  }
  if (pathname === '/peer') {
    globalSchemas.push({ '@type': 'Product', name: 'PEER', description: routeSeo['/peer'].description, brand: { '@type': 'Brand', name: 'Topscore Learning' }, category: 'Educational software', url: `${siteConfig.url}/peer` })
  }
  if (pathname.startsWith('/research/')) {
    const item = getResearchItem(pathname.slice('/research/'.length))
    if (item) {
      const published = ['Published', 'Presented', 'Working paper'].includes(item.status)
      globalSchemas.push({ '@type': published ? 'Article' : 'CreativeWork', headline: item.title, description: item.summary, about: item.category, url: `${siteConfig.url}/research/${item.slug}`, ...(item.author ? { author: { '@type': 'Person', name: item.author } } : {}), ...(item.publicationDate ? { datePublished: item.publicationDate } : {}) })
      return { seo: { title: item.title, description: item.summary }, schemas: [breadcrumbSchema(pathname), ...globalSchemas] }
    }
  }
  const seo = routeSeo[pathname] || { title: 'Page not found', description: 'The requested page could not be found.', noIndex: true }
  if (pathname !== '/') globalSchemas.unshift(breadcrumbSchema(pathname))
  return { seo, schemas: globalSchemas }
}

export function RouteMetadata() {
  const { pathname } = useLocation()

  useEffect(() => {
    const { seo, schemas } = getPageData(pathname)
    const pageTitle = seo.title === siteConfig.defaultTitle ? seo.title : siteConfig.titleTemplate.replace('%s', seo.title)
    const canonical = `${siteConfig.url}${pathname === '/' ? '' : pathname}`
    const image = `${siteConfig.url}${siteConfig.defaultImage}`
    document.title = pageTitle
    setCanonical(canonical)
    setMeta('meta[name="description"]', { name: 'description', content: seo.description })
    setMeta('meta[name="robots"]', { name: 'robots', content: seo.noIndex ? 'noindex, nofollow' : 'index, follow' })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: pathname.startsWith('/research/') ? 'article' : 'website' })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: pageTitle })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    setMeta('meta[property="og:image"]', { property: 'og:image', content: image })
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: pageTitle })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description })
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image })
    document.head.querySelectorAll('script[data-topscore-schema]').forEach((node) => node.remove())
    if (schemas.length) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.topscoreSchema = 'true'
      script.text = JSON.stringify({ '@context': 'https://schema.org', '@graph': schemas })
      document.head.appendChild(script)
    }
  }, [pathname])

  return null
}
