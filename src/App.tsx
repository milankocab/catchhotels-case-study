import { Hero } from './sections/Hero'
import { TopBar } from './shared/TopBar'
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
      <TopBar current="study" />
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
