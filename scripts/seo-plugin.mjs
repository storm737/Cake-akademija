// SEO za sajt bez pisanja oznaka ručno: Vite dodaje u index.html naslov, opis, kanonski link,
// oznake za deljenje (Open Graph / Twitter), strukturirane podatke (schema.org) i tekst za
// pretraživače bez JavaScript-a, a pri izradi pravi robots.txt i sitemap.xml.
// Sve se čita iz podataka sajta: src/data/site.js (adresa, cena, SEO tekstovi) i src/data/content.js
// (moduli, česta pitanja), pa se ništa ne razilazi sa onim što piše na stranici.
import { site } from '../src/data/site.js';
import { faq, modules, story } from '../src/data/content.js';

const CURRENCIES = { '€': 'EUR', $: 'USD', RSD: 'RSD', din: 'RSD' };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Bezbedan JSON unutar <script>: nijedan '<' ne sme da zatvori oznaku
const json = (o) => JSON.stringify(o, null, 2).replace(/</g, '\\u003c');

export default function seo() {
  const base = (process.env.SITE_URL || site.url || '').trim().replace(/\/+$/, '');
  const abs = (path) => (base ? `${base}${path}` : path);
  const s = site.seo;
  const [imgW, imgH] = s.shareImageSize;
  const currency = CURRENCIES[site.price.currency] ?? site.price.currency;
  const [city] = site.location.split(',');

  const orgId = `${abs('/')}#akademija`;
  const graph = [
    {
      '@type': 'EducationalOrganization',
      '@id': orgId,
      name: site.name,
      alternateName: site.brand,
      url: abs('/'),
      logo: abs('/assets/logo.png'),
      image: abs(s.shareImage),
      sameAs: site.instagram.map((i) => i.url),
      address: { '@type': 'PostalAddress', addressLocality: city.trim(), addressCountry: 'RS' },
      founder: { '@type': 'Person', name: site.instructor },
      ...(site.email && { email: site.email }),
      ...(site.phone && { telephone: site.phone }),
    },
    {
      '@type': 'WebSite',
      '@id': `${abs('/')}#sajt`,
      name: site.name,
      url: abs('/'),
      inLanguage: 'sr-Latn',
      publisher: { '@id': orgId },
    },
    {
      '@type': 'Course',
      name: site.program,
      description: story.summary,
      url: abs('/'),
      image: abs(s.shareImage),
      inLanguage: 'sr-Latn',
      provider: { '@id': orgId },
      offers: {
        '@type': 'Offer',
        category: site.price.label,
        price: String(site.price.current),
        priceCurrency: currency,
        availability: 'https://schema.org/InStock',
        url: abs('/#cena'),
      },
      hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'Online', inLanguage: 'sr-Latn' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a.join(' ') },
      })),
    },
  ];

  const meta = (attr, key, content) => ({ tag: 'meta', attrs: { [attr]: key, content }, injectTo: 'head' });
  const headTags = [
    meta('name', 'description', s.description),
    meta('name', 'robots', 'index, follow, max-image-preview:large'),
    ...(base ? [{ tag: 'link', attrs: { rel: 'canonical', href: abs('/') }, injectTo: 'head' }] : []),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:locale', 'sr_RS'),
    meta('property', 'og:site_name', site.name),
    meta('property', 'og:title', s.shareTitle),
    meta('property', 'og:description', s.shareDescription),
    ...(base ? [meta('property', 'og:url', abs('/'))] : []),
    meta('property', 'og:image', abs(s.shareImage)),
    meta('property', 'og:image:width', String(imgW)),
    meta('property', 'og:image:height', String(imgH)),
    meta('property', 'og:image:alt', s.shareImageAlt),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', s.shareTitle),
    meta('name', 'twitter:description', s.shareDescription),
    meta('name', 'twitter:image', abs(s.shareImage)),
    meta('name', 'twitter:image:alt', s.shareImageAlt),
    { tag: 'script', attrs: { type: 'application/ld+json' }, children: json({ '@context': 'https://schema.org', '@graph': graph }), injectTo: 'head' },
  ];

  // Osnovni tekst za pretraživače i alate koji ne pokreću JavaScript (sajt se inače crta u pregledaču)
  const noscript = `
<noscript>
  <main>
    <h1>${esc(site.name)} — ${esc(site.program)}</h1>
    <p>${esc(story.summary)}</p>
    <h2>Program: ${modules.length} modula</h2>
    <ol>
${modules.map((m) => `      <li><strong>${esc(m.title)}</strong>${m.body[0] ? ` — ${esc(m.body[0])}` : ''}</li>`).join('\n')}
    </ol>
    <h2>Cena i upis</h2>
    <p>${esc(site.price.label)}: ${site.price.current} ${esc(site.price.currency)} (redovna cena ${site.price.regular} ${esc(site.price.currency)}).</p>
    <h2>Česta pitanja</h2>
    <dl>
${faq.map((f) => `      <dt>${esc(f.q)}</dt>\n      <dd>${esc(f.a.join(' '))}</dd>`).join('\n')}
    </dl>
    <p>Za pregled lekcija i prijavu uključi JavaScript u pregledaču. ${site.instagram.map((i) => `<a href="${esc(i.url)}">@${esc(i.handle)}</a>`).join(', ')}</p>
  </main>
</noscript>`;

  const robots = ['User-agent: *', 'Allow: /', ...(base ? ['', `Sitemap: ${abs('/sitemap.xml')}`] : []), ''].join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${esc(abs('/'))}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </url>
</urlset>
`;

  return {
    name: 'cool-cakes-seo',
    transformIndexHtml(html) {
      return {
        html: html
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(s.title)}</title>`)
          .replace('</body>', `${noscript}\n  </body>`),
        tags: headTags,
      };
    },
    // robots.txt i sitemap.xml se prave pri izradi (sitemap traži punu adresu sajta)
    generateBundle() {
      if (!base) {
        this.warn('site.url nije podešen (src/data/site.js): kanonski link, og:url i sitemap.xml se ne prave, a slika za deljenje ostaje bez pune adrese.');
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
      if (base) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
    },
    // U razvoju (npm run dev) isto služimo robots.txt i sitemap.xml radi provere
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          return res.end(robots);
        }
        if (req.url === '/sitemap.xml' && base) {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          return res.end(sitemap);
        }
        next();
      });
    },
  };
}
