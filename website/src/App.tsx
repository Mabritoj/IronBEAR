import { Hero } from './features/hero/Hero';
import { Navigation } from './features/hero/Navigation';
import { SelectedWork } from './features/selected-work/SelectedWork';

export function App() {
  return (
    <div id="top">
      <Navigation />
      <main>
        <Hero />
        <SelectedWork />
      </main>
    </div>
  );
}
