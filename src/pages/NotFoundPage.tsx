import { PlaceholderPage } from '../components/sections/PlaceholderPage'

export function NotFoundPage() {
  return <PlaceholderPage eyebrow="404" title="That page could not be found." description="The address may have changed, or the page may no longer be available." action={{ label: 'Return home', href: '/' }} />
}
