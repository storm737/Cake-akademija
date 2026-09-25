import { offer, modules, rights } from '../data/content';
import { site, formatPrice } from '../data/site';
import { useAccess } from '../lib/access';
import { EnrollButton, UnlockLink } from './Access';
import { Backdrop, Button, CheckMark, Icon } from './ui';

// Upis bez plaćanja na sajtu: prijava → uplata i kod → otključavanje
const steps = [
  { title: 'Pošalji prijavu', body: 'Upiši ime, prezime i telefon, a Maja ti se javlja da dogovorite upis.' },
  { title: 'Uplati i dobij kod', body: 'Nakon uplate dobijaš svoj pristupni kod u poruci.' },
  { title: 'Otključaj lekcije', body: 'Unesi kod na sajtu i sve video lekcije se odmah otključavaju.' },
];

export default function Pricing() {
  const { hasAccess, lock } = useAccess();

  const terms = [
    { label: 'Format', value: 'Potpuno online' },
    { label: 'Program', value: `${modules.length} modula` },
    { label: 'Tempo', value: 'Svojim tempom, iz svog doma' },
    { label: 'Pristup', value: site.access },
    { label: 'Autorska prava', value: rights.pricing },
  ];

  return (
    <section id="cena" className="relative overflow-clip py-16 sm:py-24 lg:py-36">
      <div aria-hidden="true" className="sjaj top-[18%] right-[-8%] size-[54rem]" />

      <div className="wrap relative">
        <div className="max-w-3xl">
          <p className="eyebrow">Cena i upis</p>
          <h2 className="font-display text-naslov mt-5 text-balance">
            Upiši program <span className="kurziv block text-bobica">„{site.program}“</span>
          </h2>
        </div>

        <div className="mt-14 border border-okvir bg-krem p-2 shadow-otisak sm:p-3">
          <div className="grid border border-okvir/70 lg:grid-cols-12">
            <div className="p-6 sm:p-10 lg:col-span-7 lg:p-12">
              <h3 className="font-display text-podnaslov">{offer.includesTitle}</h3>
              <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
                {offer.includes.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-okvir py-3.5 text-pretty">
                    <CheckMark />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 border border-okvir bg-vanila p-6 sm:p-7">
                <h3 className="flex items-center gap-3 font-display kurziv text-[1.85rem] leading-none text-bobica-tamna">
                  <span aria-hidden="true" className="text-[1rem] not-italic text-karamel">✦</span>
                  {offer.bonusTitle}
                </h3>
                <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {offer.bonus.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.98rem] text-pretty">
                      <span aria-hidden="true" className="mt-[0.75rem] h-px w-3.5 shrink-0 bg-karamel" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative flex flex-col overflow-hidden border-t border-okvir bg-puter lg:col-span-5 lg:border-t-0 lg:border-l">
              <Backdrop src="/assets/pozadine/cokoladni-volani-1080.webp" fade="puter" position="object-[50%_30%]" />
              <div className="relative flex flex-1 flex-col p-6 sm:p-10 lg:p-12">
              <dl className="divide-y divide-okvir border-b border-okvir text-[0.95rem]">
                {terms.map((t) => (
                  <div key={t.label} className="flex justify-between gap-6 py-3.5">
                    <dt className="text-kakao">{t.label}</dt>
                    <dd className="text-right font-medium text-pretty">{t.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10">
                <p className="w-fit bg-bobica-tamna px-3 py-2 text-[0.72rem] leading-none font-semibold tracking-[0.18em] text-vanila uppercase">
                  Prva generacija
                </p>

                <p className="mt-6 text-sm text-kakao">{site.price.label}</p>
                <p className="mt-2 font-display text-[clamp(4.5rem,3rem+4.5vw,6.5rem)] leading-[0.85] brojke">
                  {site.price.current}
                  <span className="ml-2 kurziv text-[0.45em] text-bobica">{site.price.currency}</span>
                </p>
                <p className="mt-5 text-kakao">
                  Redovna cena je{' '}
                  <span className="line-through decoration-bobica-tamna/70 decoration-1">{formatPrice(site.price.regular)}</span>
                </p>
              </div>

              <div className="mt-8 lg:mt-auto lg:pt-10">
                {hasAccess ? (
                  <>
                    <p className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold text-espreso">
                      <Icon.Check width="16" height="16" className="text-zalfija-tamna" />
                      Pristup je otključan na ovom uređaju
                    </p>
                    <Button href="#video-lekcije" className="w-full">
                      Pogledaj lekcije
                    </Button>
                    <button
                      type="button"
                      onClick={lock}
                      className="mt-4 block w-full text-center text-sm text-kakao underline decoration-lan-tamni underline-offset-4 hover:text-espreso"
                    >
                      Ukloni pristup sa ovog uređaja
                    </button>
                  </>
                ) : (
                  <>
                    <EnrollButton className="w-full">Upiši program</EnrollButton>
                    <p className="mt-3 text-center text-sm text-kakao">{site.enrollNote}</p>
                    <div className="mt-6 flex justify-center border-t border-okvir pt-5">
                      <UnlockLink className="text-[0.92rem]">Već imaš kod? Otključaj lekcije</UnlockLink>
                    </div>
                  </>
                )}
              </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-20">
          <p className="eyebrow">Kako do pristupa</p>
          <ol className="mt-8 grid gap-px border border-okvir bg-okvir md:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="bg-vanila p-6 sm:p-8">
                <span className="font-display kurziv text-[2.4rem] leading-none text-karamel brojke">{i + 1}.</span>
                <h3 className="mt-4 font-display text-[1.45rem] leading-tight">{step.title}</h3>
                <p className="mt-2 text-[0.98rem] text-kakao text-pretty">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
