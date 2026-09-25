import { useEffect, useState } from 'react';
import { nav } from '../data/content';
import { EnrollButton, UnlockLink } from './Access';
import { Icon } from './ui';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid ? 'border-b border-okvir bg-vanila/92 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="wrap flex h-18 items-center justify-between gap-6">
        <a href="#pocetak" className="shrink-0" aria-label="Cool Cakes Akademija — početak stranice">
          <img src="/assets/logo.png" alt="Cool Cakes by Maja" width="640" height="195" className="h-11 w-auto sm:h-13" />
        </a>

        <nav aria-label="Glavna navigacija" className="hidden xl:block">
          <ul className="flex items-center gap-6 text-[0.88rem] font-medium whitespace-nowrap text-kakao">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative py-2 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-karamel after:transition-transform after:duration-300 hover:text-espreso hover:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <UnlockLink className="mr-4 text-[0.86rem] whitespace-nowrap max-2xl:hidden">Imam kod</UnlockLink>
          <EnrollButton unlockedLabel="Moje lekcije" className="px-5! py-3.5! max-sm:hidden">
            Otključaj program
          </EnrollButton>
          <button
            type="button"
            className="grid size-11 place-items-center text-espreso transition hover:bg-puter xl:hidden"
            aria-expanded={open}
            aria-controls="mobilni-meni"
            aria-label={open ? 'Zatvori meni' : 'Otvori meni'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Icon.Close /> : <Icon.Menu />}
          </button>
        </div>
      </div>

      <div id="mobilni-meni" hidden={!open} className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-okvir bg-vanila xl:hidden">
        <nav aria-label="Mobilna navigacija" className="wrap flex min-h-full flex-col pt-6 pb-10">
          <ul className="divide-y divide-okvir">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-display text-[1.8rem] leading-tight"
                >
                  {item.label}
                  <Icon.Arrow className="text-karamel" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <div onClick={() => setOpen(false)} className="mb-6 flex justify-center">
              <UnlockLink>Imam pristupni kod</UnlockLink>
            </div>
            <EnrollButton unlockedLabel="Moje lekcije" onClick={() => setOpen(false)} className="w-full">
              Otključaj program
            </EnrollButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
