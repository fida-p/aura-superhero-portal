import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import PowersSection from './components/sections/PowersSection.jsx';
import MissionSection from './components/sections/MissionSection.jsx';
import GetHelpSection from './components/sections/GetHelpSection.jsx';
import { aura } from './data/aura.js';

/**
 * App — top-level composition for the Part 3 product UI.
 * Fixed navbar + responsive hero and anchored sections (powers, mission,
 * get-help). The chatbot (Part 4+) and help-request form arrive later.
 */
function App() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:border focus:border-line focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <HeroSection />
        <PowersSection />
        <MissionSection />
        <GetHelpSection />
      </main>

      <footer className="border-t border-line">
        <div className="aura-container flex flex-col items-center gap-1 py-8 text-center">
          <p className="max-w-xl text-sm text-muted">{aura.mission}</p>
          <p className="text-xs text-dim">
            {aura.name} · {aura.title} · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;