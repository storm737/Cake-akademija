import { footer, nav, rights } from '../data/content';
import { site } from '../data/site';
import { EnrollButton, UnlockLink } from './Access';
import { Icon } from './ui';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-okvir bg-vanila pt-20 pb-10">
      <div className="wrap">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <img src="/assets/logo.png" alt="Cool Cakes by Maja" width="640" height="195" loading="lazy" className="h-14 w-auto" />
            <p className="mt-7 font-display kurziv text-[1.9rem] leading-[1.15] text-bobica-tamna">{footer.motto}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <EnrollButton unlockedLabel="Moje lekcije">Otključaj program</EnrollButton>
              <UnlockLink className="text-[0.92rem]" />
            </div>
          </div>

          <nav aria-label="Navigacija u podnožju" className="lg:col-span-3">
            <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-karamel-tamni uppercase">Sajt</p>
            <ul className="mt-5 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="inline-flex min-h-11 items-center text-kakao transition hover:text-espreso">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-karamel-tamni uppercase">Kontakt</p>
            <ul className="mt-4 space-y-0.5">
              {site.instagram.map((ig) => (
                <li key={ig.handle}>
                  <a href={ig.url} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2.5 text-kakao transition hover:text-espreso">
                    <Icon.Instagram className="text-karamel-tamni" />@{ig.handle}
                  </a>
                </li>
              ))}
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center text-kakao transition hover:text-espreso">
                    {site.email}
                  </a>
                </li>
              )}
              {site.phone && (
                <li>
                  <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="inline-flex min-h-11 items-center text-kakao transition hover:text-espreso">
                    {site.phone}
                  </a>
                </li>
              )}
              <li className="inline-flex min-h-11 items-center gap-2.5 text-kakao">
                <Icon.Pin className="text-karamel-tamni" />
                {site.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-okvir pt-8 text-sm text-kakao sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Sva prava zadržana.
          </p>
          <p>
            Online program „{site.program}“ · {site.brand}
          </p>
        </div>
        <p className="mt-5 max-w-4xl text-xs text-kakao text-pretty">{rights.footer}</p>
      </div>
    </footer>
  );
}
