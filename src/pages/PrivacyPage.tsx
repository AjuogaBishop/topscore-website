import { LegalDocumentPage } from '../components/legal/LegalDocumentPage'
import { privacyDocument } from '../content/legal'

export function PrivacyPage() {
  return <LegalDocumentPage document={privacyDocument} />
}
