import { useEffect, useState } from 'react';
import { AudioLines, Menu, MessageCircle, X } from 'lucide-react';
import AuraButton from './ui/AuraButton.jsx';
import { aura, nav } from '../data/aura.js';


function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Safely close the mobile menu when switching back to a desktop width.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <nav aria-label="Primary" className="aura-container flex h-16 items-center justify-between gap-4">
        {/* Brand */}
        <a href="#home" className="group flex min-w-0 items-center gap-2.5" onClick={close}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-glass text-primary aura-glow-primary transition-transform duration-200 group-hover:scale-105">
            <AudioLines className="h-5 w-5" />
          </span>
          <span className="truncate text-base font-extrabold tracking-tight">
            {aura.name}
            <span className="aura-text-gradient font-semibold"> — {aura.title}</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <AuraButton as="a" href={nav.cta.href} size="md" className="ml-3">
            {nav.cta.label} <MessageCircle className="h-4 w-4" />
          </AuraButton>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-glass text-ink transition-colors hover:border-line-strong md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-bg/95 backdrop-blur-md md:hidden">
          <div className="aura-container flex flex-col gap-1 py-4">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="rounded-lg px-4 py-3 text-base font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <AuraButton as="a" href={nav.cta.href} onClick={close} className="mt-2">
              {nav.cta.label} <MessageCircle className="h-4 w-4" />
            </AuraButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;