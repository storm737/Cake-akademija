import { useRef, useState } from 'react';
import { rights } from '../data/content';
import { introVideo, lessons } from '../data/lessons';
import { lessonState, toPlayer, videoList } from '../lib/video';
import { useAccess } from '../lib/access';
import { EnrollButton, UnlockLink } from './Access';
import LessonIcon, { iconTint } from './LessonIcon';
import { Icon } from './ui';

const Tag = ({ children, tone = 'light', className = '' }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[0.72rem] leading-none font-semibold tracking-[0.16em] uppercase ${
      tone === 'dark' ? 'bg-espreso/75 text-vanila backdrop-blur-sm' : tone === 'zalfija' ? 'border border-zalfija/40 bg-zalfija-magla text-zalfija-tamna' : 'border border-karamel/60 text-karamel-tamni'
    } ${className}`}
  >
    {children}
  </span>
);

export default function Lessons() {
  const { hasAccess, lock, openUnlock } = useAccess();
  // Veliki plejer prvo prikazuje uvodni video; klik na modul prikazuje taj modul
  const [activeId, setActiveId] = useState(introVideo.id);
  const playerRef = useRef(null);

  const isIntro = activeId === introVideo.id;
  const active = isIntro ? introVideo : lessons.find((l) => l.id === activeId);

  const show = (lesson) => {
    setActiveId(lesson.id);
    requestAnimationFrame(() => playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  };

  const choose = (lesson) => {
    // Zaključana lekcija otvara prozor za upis i pristupni kod, sa detaljima te lekcije
    if (lessonState(lesson, hasAccess) === 'locked') openUnlock({ intent: 'enroll', lesson, onUnlocked: () => show(lesson) });
    else show(lesson);
  };

  return (
    <section id="video-lekcije" className="relative overflow-clip py-16 sm:py-24 lg:py-36">
      <div aria-hidden="true" className="sjaj top-[8%] right-[-16%] size-[50rem]" />

      <div className="wrap relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow">Video lekcije</p>
            <h2 className="font-display text-naslov mt-5 text-balance">
              Počni od <span className="kurziv text-bobica">uvodne</span> lekcije
            </h2>
          </div>
          <p className="self-end text-kakao text-pretty lg:col-span-5">
            Program je potpuno online. Pratiš lekcije svojim tempom, iz svog doma i u vreme koje ti odgovara.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div ref={playerRef} className="lg:col-span-8">
            <VideoPlayer
              key={`${active.id}-${hasAccess}`}
              lesson={active}
              hasAccess={hasAccess}
              onLocked={() => choose(active)}
            />
            <p className="mt-4 text-xs text-kakao text-pretty">{rights.video}</p>
          </div>

          <aside className="flex flex-col border border-okvir bg-krem p-7 sm:p-8 lg:col-span-4">
            <Tag className="w-fit" tone={isIntro || hasAccess ? 'zalfija' : 'med'}>
              <span aria-hidden="true">✦</span>
              {isIntro ? 'Uvod' : hasAccess ? 'Pristup otključan' : 'Lekcija iz programa'}
            </Tag>
            <h3 className="mt-6 font-display text-[1.9rem] leading-[1.1] text-balance">{active.title}</h3>
            {!isIntro && <p className="mt-3 text-sm text-kakao">{active.label}</p>}
            {active.description && <p className="mt-4 text-kakao text-pretty">{active.description}</p>}
            {!isIntro && (
              <button
                type="button"
                onClick={() => show(introVideo)}
                className="mt-4 w-fit text-sm font-semibold text-espreso underline decoration-karamel underline-offset-4 hover:decoration-2"
              >
                Nazad na uvodni video
              </button>
            )}

            <div className="mt-auto pt-8">
              {hasAccess ? (
                <p className="flex items-start gap-3 border-t border-okvir pt-6 text-sm text-kakao text-pretty">
                  <Icon.Check width="18" height="18" className="mt-0.5 shrink-0 text-zalfija" />
                  Sve lekcije su otključane na ovom uređaju. Izaberi lekciju ispod.
                </p>
              ) : (
                <>
                  <EnrollButton className="w-full">Otključaj ceo program</EnrollButton>
                  <div className="mt-5 flex justify-center">
                    <UnlockLink className="text-[0.92rem]" />
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>

        <div className="mt-20 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-okvir pb-5">
          <h3 className="font-display text-podnaslov">Pregled lekcija</h3>
          {hasAccess ? (
            <p className="text-sm text-kakao">
              <span className="font-semibold text-zalfija-tamna">✦ Sve lekcije su otključane</span>
              <span aria-hidden="true" className="mx-2 text-karamel">·</span>
              <button type="button" onClick={lock} className="underline decoration-lan-tamni underline-offset-4 hover:text-espreso">
                Ukloni pristup sa ovog uređaja
              </button>
            </p>
          ) : (
            <p className="hidden text-sm text-kakao sm:block">Klikni na lekciju za detalje</p>
          )}
        </div>

        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <LessonCard lesson={lesson} hasAccess={hasAccess} current={lesson.id === activeId} onSelect={() => choose(lesson)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function VideoPlayer({ lesson, hasAccess, onLocked }) {
  const [part, setPart] = useState(0);
  const [started, setStarted] = useState(false);
  const state = lessonState(lesson, hasAccess);
  const urls = state === 'playable' ? videoList(lesson) : [];
  const player = urls.length ? toPlayer(urls[Math.min(part, urls.length - 1)]) : null;
  // Plejeri bez automatskog puštanja (Google Drive) prikazuju se odmah, bez naše naslovne slike
  const playing = Boolean(player) && (started || player.autoplay === false);

  const choosePart = (i) => {
    setPart(i);
    setStarted(true);
  };

  return (
    <div className="border border-okvir bg-krem p-2 shadow-otisak sm:p-3">
      <div className="relative aspect-video overflow-hidden bg-espreso">
        {playing && player.kind === 'iframe' && (
          <iframe
            key={player.src}
            src={player.src}
            title={urls.length > 1 ? `${lesson.title} — deo ${part + 1}` : lesson.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            // Bez allow-popups: plejer ne može da otvori video u novom tabu (i tako otkrije link)
            sandbox="allow-scripts allow-same-origin"
            loading="lazy"
            className="absolute inset-0 size-full"
          />
        )}
        {playing && player.shield && <span aria-hidden="true" className="absolute top-0 right-0 size-[3.75rem] bg-black" />}
        {playing && player.kind === 'file' && (
          <video key={player.src} src={player.src} controls autoPlay playsInline className="absolute inset-0 size-full bg-espreso" />
        )}

        {!playing && (
          <>
            <img src={lesson.thumbnail} alt="" className="absolute inset-0 size-full object-cover object-[50%_30%]" />
            <div className="absolute inset-0 bg-linear-to-t from-espreso/80 via-espreso/10 to-transparent" />

            {player ? (
              <button
                type="button"
                onClick={() => setStarted(true)}
                className="group absolute inset-0 grid place-items-center"
                aria-label={`Pusti lekciju: ${lesson.title}`}
              >
                <span className="grid size-16 place-items-center bg-bobica-tamna text-vanila transition duration-300 ease-meko group-hover:bg-espreso sm:size-20">
                  <Icon.Play width="26" height="26" className="translate-x-0.5" />
                </span>
              </button>
            ) : state === 'locked' ? (
              // Zaključana lekcija u plejeru otvara prozor za upis i pristupni kod
              <button
                type="button"
                onClick={onLocked}
                aria-haspopup="dialog"
                className="group absolute inset-0 grid place-items-center"
                aria-label={`Otključaj lekciju: ${lesson.title}`}
              >
                <span className="grid size-16 place-items-center bg-bobica-tamna text-vanila transition duration-300 ease-meko group-hover:bg-espreso sm:size-20">
                  <Icon.Lock width="24" height="24" />
                </span>
              </button>
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <span className="grid size-16 place-items-center border border-vanila/55 bg-espreso/25 text-vanila/85 backdrop-blur-[2px] sm:size-20">
                  <Icon.Play width="26" height="26" className="translate-x-0.5" />
                </span>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-4 text-vanila sm:p-7">
              <p className="font-display text-[clamp(1.3rem,0.95rem+1.1vw,1.9rem)] leading-tight max-sm:hidden">{lesson.title}</p>
              {state !== 'playable' && (
                <Tag tone="dark" className="max-sm:ml-auto">
                  {state === 'soon' ? 'Video stiže uskoro' : 'Zaključano'}
                </Tag>
              )}
            </div>
          </>
        )}
      </div>

      {urls.length > 1 && (
        <div role="group" aria-label="Delovi lekcije" className="flex flex-wrap items-center gap-2 px-1 pt-3 sm:px-0">
          <span className="mr-1 text-[0.72rem] font-semibold tracking-[0.16em] text-karamel-tamni uppercase">
            Lekcija ima {urls.length} dela
          </span>
          {urls.map((url, i) => (
            <button
              key={url}
              type="button"
              aria-pressed={part === i}
              onClick={() => choosePart(i)}
              className={`border px-3.5 py-2 text-sm font-semibold transition-colors ${
                part === i ? 'border-bobica-tamna bg-bobica-tamna text-vanila' : 'border-okvir text-espreso hover:border-bobica/60'
              }`}
            >
              Deo {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function LessonCard({ lesson, hasAccess, current, onSelect }) {
  const locked = lessonState(lesson, hasAccess) === 'locked';
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={current ? 'true' : undefined}
      className={`group flex h-full w-full gap-4 border bg-krem p-2.5 pr-5 text-left transition duration-300 ease-meko hover:-translate-y-0.5 hover:shadow-otisak sm:gap-5 ${
        current ? 'border-bobica/60 shadow-otisak' : 'border-okvir hover:border-lan-tamni'
      }`}
    >
      <span className={`relative grid aspect-[4/5] w-24 shrink-0 place-items-center overflow-hidden sm:w-28 ${iconTint(lesson.id)}`}>
        <LessonIcon
          name={lesson.icon}
          className="size-14 translate-y-2 transition-transform duration-500 ease-meko group-hover:-rotate-3 group-hover:scale-110 sm:size-16"
        />
        <span className={`absolute top-0 left-0 grid size-8 place-items-center text-vanila ${locked ? 'bg-bobica-tamna' : 'bg-zalfija-tamna'}`}>
          {locked ? <Icon.Lock width="14" height="14" /> : <Icon.Play width="14" height="14" className="translate-x-px" />}
        </span>
      </span>
      <span className="flex min-w-0 flex-col py-2">
        <span className="flex flex-wrap items-center gap-x-2 text-[0.72rem] font-semibold tracking-[0.16em] text-karamel-tamni uppercase">
          {lesson.label}
          {videoList(lesson).length > 1 && (
            <>
              <span aria-hidden="true" className="size-[3px] rotate-45 bg-karamel" />
              <span className="text-kakao">{videoList(lesson).length} dela</span>
            </>
          )}
          {current && (
            <>
              <span aria-hidden="true" className="size-[3px] rotate-45 bg-karamel" />
              <span className="text-zalfija-tamna">U plejeru</span>
            </>
          )}
        </span>
        <span className="mt-2 font-display text-[1.32rem] leading-[1.18] text-balance">{lesson.title}</span>
        {lesson.description && <span className="mt-2 line-clamp-2 text-sm text-kakao">{lesson.description}</span>}
        <span className="sr-only">{locked ? ' — zaključana lekcija, otvori detalje' : current ? ' — trenutno u plejeru' : ' — pusti lekciju'}</span>
      </span>
    </button>
  );
}
