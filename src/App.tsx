import { Hero } from './sections/Hero'
import {
  AuditSection,
  CalculatorSection,
  ContextSection,
  Footer,
  OpportunitySection,
  PrototypeSection,
  QuestionsSection,
  ValidationSection,
} from './sections/Sections'

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <ContextSection />
        <AuditSection />
        <OpportunitySection />
        <PrototypeSection />
        <CalculatorSection />
        <ValidationSection />
        <QuestionsSection />
      </main>
      <Footer />
    </>
  )
}
