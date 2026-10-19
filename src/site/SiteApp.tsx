import { TopBar } from '../shared/TopBar'
import { sections } from '../content-prototyp'
import { PrototypeProvider } from './PrototypeProvider'
import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { Destinations } from './sections/Destinations'
import { TripBuilder } from './sections/TripBuilder'
import { Footer } from './sections/Footer'
import { Chat } from './components/Chat'
import { PrototypeControls } from './components/PrototypeControls'

/** Úvodní stránka navrhovaného webu. Sekce přibývají postupně podle analyza-webu.md, kapitola 8.3. */
export function SiteApp() {
  return (
    <PrototypeProvider>
      <TopBar current="prototype" />
      <Header />
      <main>
        <Hero />
        <Destinations />
        <TripBuilder />
        {sections.map((section) => (
          // Dočasný blok, nahradí ho hotová sekce.
          <section key={section.id} id={section.id} className="scroll-mt-4 px-4 py-10">
            <div className="mx-auto flex min-h-48 max-w-6xl flex-col items-center justify-center rounded-(--radius-card) border-2 border-dashed border-line text-center">
              <p className="text-sm text-muted">Krok {section.step}</p>
              <h2 className="mt-1 text-xl font-semibold">{section.title}</h2>
            </div>
          </section>
        ))}
      </main>
      <Footer />
      <PrototypeControls />
      <Chat />
    </PrototypeProvider>
  )
}
