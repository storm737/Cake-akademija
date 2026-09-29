import { useEffect, useRef, useState } from 'react';
import { rights } from '../data/content';
import { introVideo, lessons } from '../data/lessons';
import { lessonState, loadYouTubeApi, toPlayer, videoList, videoParts } from '../lib/video';
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

// Pravi ceo ekran (Fullscreen API, uz Safari prefiks). Na iPhone-u ga nema za obične elemente,
// pa plejer tada ostaje da prekriva ceo prozor (vidi `full` u VideoPlayer).
const fsElement = () => document.fullscreenElement || document.webkitFullscreenElement || null;
const requestFs = (el) => (el?.requestFullscreen || el?.webkitRequestFullscreen)?.call(el);
const exitFs = () => (document.exitFullscreen || document.webkitExitFullscreen)?.call(document);

// m:ss (ili h:mm:ss za snimke duže od sat vremena)
const formatTime = (s) => {
  if (!Number.isFinite(s) || s < 0) s = 0;
  s = Math.floor(s);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`;
};

// YouTube se pušta preko njihovog IFrame API-ja, potpuno prekriven providnim slojem (pointer-events
// isključen na njihovom iframe-u) i sopstvenim dugmićima. Tako nijedan dodir ne stiže do YouTube-ovog
// plejera, pa se ne može desnim klikom/dugim pritiskanjem doći do menija „Kopiraj link videa“.
function YouTubePlayer({ id, title }) {
  const hostRef = useRef(null);
  const playerRef = useRef(null);
  const seekingRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [playingState, setPlayingState] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let player;
    loadYouTubeApi().then((YT) => {
      if (cancelled || !hostRef.current) return;
      player = new YT.Player(hostRef.current, {
        videoId: id,
        host: 'https://www.youtube-nocookie.com',
        // Bez ovoga YT.Player pravi iframe na podrazumevanoj veličini 640×360 px umesto da
        // ispuni okvir; width/height kao „100%“ postaju HTML atributi na iframe-u.
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: () => {
            if (cancelled) return;
            playerRef.current = player;
            // width/height u postavkama iznad ne stižu uvek do svih ivica; iframe se dodatno
            // razvlači na ceo prostor direktno, da snimak sigurno ispuni okvir bez praznina.
            const el = player.getIframe();
            if (el) Object.assign(el.style, { position: 'absolute', inset: '0', width: '100%', height: '100%' });
            setReady(true);
            setDuration(player.getDuration() || 0);
          },
          onStateChange: (e) => {
            if (cancelled) return;
            const playingNow = e.data === window.YT.PlayerState.PLAYING;
            setPlayingState(playingNow);
            if (playingNow) setDuration(player.getDuration() || 0);
          },
        },
      });
    });
    return () => {
      cancelled = true;
      try {
        player?.destroy?.();
      } catch {
        /* plejer je već uklonjen zajedno sa stranicom */
      }
    };
  }, [id]);

  // YT API nema „timeupdate“ događaj — dok se pušta, tok se povremeno očita
  useEffect(() => {
    if (!playingState) return undefined;
    const t = setInterval(() => {
      if (!seekingRef.current) setCurrent(playerRef.current?.getCurrentTime() ?? 0);
    }, 250);
    return () => clearInterval(t);
  }, [playingState]);

  const toggle = () => {
    const p = playerRef.current;
    if (!p) return;
    if (playingState) p.pauseVideo();
    else p.playVideo();
  };

  const seek = (e) => {
    const v = Number(e.target.value);
    setCurrent(v);
    playerRef.current?.seekTo(v, true);
  };

  return (
    <div className="absolute inset-0 bg-black">
      {/* Ovde YouTube ubacuje svoj iframe; pointer-events-none ga potpuno isključuje iz interakcije */}
      <div ref={hostRef} className="pointer-events-none absolute inset-0" />

      <button
        type="button"
        onClick={toggle}
        onContextMenu={(e) => e.preventDefault()}
        aria-label={`${playingState ? 'Pauziraj' : 'Pusti'} lekciju: ${title}`}
        className="absolute inset-0 [-webkit-touch-callout:none] select-none"
      />

      {ready && (
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-linear-to-t from-black/80 to-transparent p-3 sm:p-4">
          <button type="button" onClick={toggle} aria-label={playingState ? 'Pauziraj' : 'Pusti'} className="grid size-9 shrink-0 place-items-center text-vanila">
            {playingState ? <Icon.Pause width="18" height="18" /> : <Icon.Play width="18" height="18" className="translate-x-0.5" />}
          </button>
          <span className="shrink-0 text-[0.72rem] tabular-nums text-vanila/90">{formatTime(current)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(current, duration || 0)}
            onChange={seek}
            onPointerDown={() => {
              seekingRef.current = true;
            }}
            onPointerUp={() => {
              seekingRef.current = false;
            }}
            aria-label="Premotaj video"
            className="h-1.5 min-w-0 flex-1 accent-bobica"
          />
          <span className="shrink-0 text-[0.72rem] tabular-nums text-vanila/90">{formatTime(duration)}</span>
        </div>
      )}
    </div>
  );
}

// Vodeni žig: povremeno se pojavi preko snimka, na nasumičnoj poziciji, pa se sam sakrije.
// Ne prati konkretnu osobu (kod nije lično vezan za polaznicu) — cilj je da otežava neovlašćeno
// deljenje snimljenog ekrana i da jasno pokaže čiji je sadržaj, ne da nekog identifikuje.
function Watermark({ text = 'Zabranjeno kopiranje, umnožavanje' }) {
  const [pos, setPos] = useState(null);

  useEffect(() => {
    let hideTimer;
    // Nasumična pozicija unutar sredine kadra, dalje od dugmića u uglu i od kontrolne trake na dnu
    const show = () => {
      setPos({ top: `${12 + Math.random() * 62}%`, left: `${8 + Math.random() * 68}%` });
      hideTimer = setTimeout(() => setPos(null), 4500);
    };
    const first = setTimeout(show, 6000);
    const every = setInterval(show, 26000);
    return () => {
      clearTimeout(first);
      clearTimeout(hideTimer);
      clearInterval(every);
    };
  }, []);

  if (!pos) return null;
  return (
    <span
      aria-hidden="true"
      style={pos}
      className="pointer-events-none absolute z-10 rounded-sm bg-espreso/40 px-2.5 py-1 text-[0.72rem] font-semibold tracking-wide text-vanila/90 backdrop-blur-[1px]"
    >
      {text}
    </span>
  );
}

function VideoPlayer({ lesson, hasAccess, onLocked }) {
  const [part, setPart] = useState(0);
  const [started, setStarted] = useState(false);
  // Puštena lekcija odmah ide preko celog ekrana
  const [full, setFull] = useState(false);
  // Opciono uvećanje: krajevi kadra se ravnomerno smanjuju, a centar se uvećava (bez agresivnog
  // sečenja) — korisno na širem ekranu gde inače ostaje dosta zamućenog prostora sa strane
  const [zoom, setZoom] = useState(false);
  const stageRef = useRef(null);
  const playRef = useRef(null);
  const wasFull = useRef(false);
  const state = lessonState(lesson, hasAccess);
  const parts = state === 'playable' ? videoParts(lesson) : [];
  const player = parts.length ? toPlayer(parts[Math.min(part, parts.length - 1)].url) : null;
  // Video (i Google Drive) se učitava tek kad se pusti, pa je klik na „Pusti“ i ulaz u ceo ekran
  const playing = Boolean(player) && started;
  // Odnos širine i visine snimka (uspravan 9 / 16, položen 16 / 9); podešava se u lessons.js
  const ratio = lesson.ratio ?? 16 / 9;
  // U celom ekranu se ceo kadar vidi, bez sečenja; prostor oko njega popunjava zamućena naslovna
  // slika lekcije umesto crnog, pa ekran ne ostaje prazan, a snimak ostaje potpuno vidljiv.
  const fitBox = {
    width: `min(100cqw, calc(100cqh * ${ratio}))`,
    height: `min(100cqh, calc(100cqw / ${ratio}))`,
    // Uvećanje: 1,25× iz centra, pa ostaje vidljivo ~80% originalnog kadra sa svake strane.
    // Ono što izađe van ekrana odseca stageRef svojim overflow-hidden.
    transform: `translate(-50%, -50%)${zoom ? ' scale(1.25)' : ''}`,
  };

  const enterFull = () => {
    setFull(true);
    // Mora u istom kliku: pregledač dozvoljava ceo ekran samo kao odgovor na dodir/klik
    Promise.resolve(requestFs(stageRef.current)).catch(() => {});
  };

  // Izlaz vraća plejer na početak (naslovna slika i „Pusti“). Video se zaustavlja, a svako sledeće
  // puštanje kreće isto kao prvo; mali crn okvir koji ne reaguje ne ostaje.
  const exitFull = () => {
    setFull(false);
    setStarted(false);
    setZoom(false);
    if (fsElement()) Promise.resolve(exitFs()).catch(() => {});
    try {
      screen.orientation?.unlock?.();
    } catch {
      /* nije podržano */
    }
  };

  const play = () => {
    setStarted(true);
    enterFull();
  };

  const choosePart = (i) => {
    setPart(i);
    setStarted(true);
    if (!full) enterFull();
  };

  // Izlaz iz pravog celog ekrana (Esc, gest nazad) zatvara i naše prekrivanje
  useEffect(() => {
    const onChange = () => {
      if (fsElement()) {
        // Pravac ekrana (uspravan/položen snimak) može da se zaključa tek kad je ceo ekran zaista uključen
        try {
          Promise.resolve(screen.orientation?.lock?.(ratio < 1 ? 'portrait' : 'landscape')).catch(() => {});
        } catch {
          /* nije podržano */
        }
      } else {
        setFull(false);
        setStarted(false);
      }
    };
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
      if (fsElement()) Promise.resolve(exitFs()).catch(() => {});
    };
  }, []);

  // Posle izlaza fokus se vraća na „Pusti“ (tastatura i čitači ekrana ne ostaju bez mesta)
  useEffect(() => {
    if (wasFull.current && !full) playRef.current?.focus({ preventScroll: true });
    wasFull.current = full;
  }, [full]);

  // Dok je ceo ekran uključen: Esc izlazi, a stranica iza se ne skroluje
  useEffect(() => {
    if (!full) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') exitFull();
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [full]);

  return (
    <div className="border border-okvir bg-krem p-2 shadow-otisak sm:p-3">
      <div className="relative aspect-video overflow-hidden bg-espreso">
        <div
          ref={stageRef}
          className={`overflow-hidden ${full ? 'fixed inset-0 z-[60] bg-black' : 'absolute inset-0'}`}
          style={{ containerType: 'size' }}
          role={full ? 'dialog' : undefined}
          aria-modal={full ? 'true' : undefined}
          aria-label={full ? lesson.title : undefined}
        >
          {full && (
            <div
              aria-hidden="true"
              className="absolute inset-0 scale-110 bg-cover bg-center blur-3xl brightness-[0.45]"
              style={{ backgroundImage: `url(${lesson.thumbnail})` }}
            />
          )}
          {full && (
            <button
              type="button"
              onClick={exitFull}
              aria-label="Zatvori prikaz preko celog ekrana"
              className="absolute top-3 left-3 z-10 grid size-11 place-items-center bg-black/60 text-vanila transition hover:bg-black/85"
            >
              <Icon.Close />
            </button>
          )}
          {full && playing && (
            <button
              type="button"
              onClick={() => setZoom((v) => !v)}
              className="absolute top-3 left-[3.75rem] z-10 h-11 bg-black/60 px-3.5 text-[0.8rem] font-semibold text-vanila transition hover:bg-black/85"
            >
              {zoom ? 'Prikaži ceo kadar' : 'Uvećaj'}
            </button>
          )}
          {playing && player.kind === 'youtube' && (
            <div className="absolute top-1/2 left-1/2" style={fitBox}>
              <YouTubePlayer
                key={player.id}
                id={player.id}
                title={parts.length > 1 ? `${lesson.title} — ${parts[Math.min(part, parts.length - 1)].label}` : lesson.title}
              />
              {full && <Watermark />}
            </div>
          )}
          {playing && player.kind === 'iframe' && (
            // Ceo kadar snimka je podrazumevano vidljiv (bez sečenja); okvir dobija tačan oblik
            // snimka i staje unutar ekrana, centriran preko zamućene pozadine iznad. Uz „Uvećaj“
            // se blago zumira iz centra (vidi fitBox), a višak odseca overflow-hidden na stageRef.
            <div className="absolute top-1/2 left-1/2" style={fitBox}>
              <iframe
                key={player.src}
                src={player.src}
                title={parts.length > 1 ? `${lesson.title} — ${parts[Math.min(part, parts.length - 1)].label}` : lesson.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                // Bez allow-popups: plejer ne može da otvori video u novom tabu (i tako otkrije link)
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
                className="absolute inset-0 size-full"
              />
              {player.shield && <span aria-hidden="true" className="absolute top-0 right-0 size-[3.75rem] bg-black" />}
              {full && <Watermark />}
            </div>
          )}
          {playing && player.kind === 'file' && (
            <div className="absolute top-1/2 left-1/2" style={fitBox}>
              <video key={player.src} src={player.src} controls autoPlay playsInline className="absolute inset-0 size-full bg-black" />
              {full && <Watermark />}
            </div>
          )}

          {!playing && (
            <>
              <img src={lesson.thumbnail} alt="" className="absolute inset-0 size-full object-cover object-[50%_30%]" />
              <div className="absolute inset-0 bg-linear-to-t from-espreso/80 via-espreso/10 to-transparent" />

              {player ? (
                <button
                  type="button"
                  ref={playRef}
                  onClick={play}
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
      </div>

      {parts.length > 1 && (
        <div role="group" aria-label="Delovi lekcije" className="flex flex-wrap items-center gap-2 px-1 pt-3 sm:px-0">
          <span className="mr-1 text-[0.72rem] font-semibold tracking-[0.16em] text-karamel-tamni uppercase">
            Lekcija ima {parts.length} dela
          </span>
          {parts.map((p, i) => (
            <button
              key={p.url}
              type="button"
              aria-pressed={part === i}
              onClick={() => choosePart(i)}
              className={`border px-3.5 py-2 text-sm font-semibold transition-colors ${
                part === i ? 'border-bobica-tamna bg-bobica-tamna text-vanila' : 'border-okvir text-espreso hover:border-bobica/60'
              }`}
            >
              {p.label}
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
