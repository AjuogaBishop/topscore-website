import { LegalDocumentPage } from '../components/legal/LegalDocumentPage'
import { termsDocument } from '../content/legal'

export function TermsPage() {
  return <LegalDocumentPage document={termsDocument} />
}
