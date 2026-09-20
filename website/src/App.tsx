import { Contact } from './features/contact/Contact';
import { Footer } from './features/footer/Footer';
import { Hero } from './features/hero/Hero';
import { Navigation } from './features/hero/Navigation';
import { Methodology } from './features/methodology/Methodology';
import { SelectedWork } from './features/selected-work/SelectedWork';

export function App() {
  return (
    <div id="top">
      <Navigation />
      <main>
        <Hero />
        <SelectedWork />
        <Methodology />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
