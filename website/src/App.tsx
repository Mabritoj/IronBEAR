import { Hero } from './features/hero/Hero';
import { Navigation } from './features/hero/Navigation';

export function App() {
  return (
    <div id="top">
      <Navigation />
      <main>
        <Hero />
      </main>
    </div>
  );
}
