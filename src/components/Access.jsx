import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { INSTAGRAM_DM_URL, INSTAGRAM_HANDLE } from '../data/accessKeys';
import { rights } from '../data/content';
import { site } from '../data/site';
import {
  ACCESS_STORAGE_KEY,
  AccessContext,
  isValidKey,
  normalizeKey,
  readStoredKey,
  storeKey,
  useAccess,
} from '../lib/access';
import { ENROLL_FIELDS, sendEnrollment, validateEnrollment } from '../lib/enroll';
import LessonIcon, { iconTint } from './LessonIcon';
import { Button, Icon } from './ui';

export function AccessProvider({ children }) {
  const [key, setKey] = useState(readStoredKey);
  // null = zatvoren prozor; objekat = otvoren ({ intent, lesson, onUnlocked })
  const [modal, setModal] = useState(null);

  // Otključavanje u jednom tabu važi i u ostalim otvorenim tabovima
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === ACCESS_STORAGE_KEY) setKey(readStoredKey());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const unlock = useCallback((input) => {
    if (!isValidKey(input)) return false;
    const normalized = normalizeKey(input);
    storeKey(normalized);
    setKey(normalized);
    return true;
  }, []);

  const lock = useCallback(() => {
    storeKey(null);
    setKey(null);
  }, []);

  // intent: 'enroll' (upis — fokus ostaje na prozoru) ili 'code' (fokus odmah u polje za kod)
  const openUnlock = useCallback((options = {}) => setModal({ intent: 'enroll', ...options }), []);

  const value = useMemo(() => ({ hasAccess: Boolean(key), unlock, lock, openUnlock }), [key, unlock, lock, openUnlock]);

  return (
    <AccessContext.Provider value={value}>
      {children}
      <AccessModal options={modal} onClose={() => setModal(null)} />
    </AccessContext.Provider>
  );
}

// Dugme za upis: otvara prozor za upis i pristup, a posle otključavanja vodi na lekcije
export function EnrollButton({ children = 'Upiši program', unlockedLabel = 'Pogledaj lekcije', ...props }) {
  const { hasAccess, openUnlock } = useAccess();
  if (hasAccess) {
    return (
      <Button href="#video-lekcije" {...props}>
        {unlockedLabel}
      </Button>
    );
  }
  return (
    <Button type="button" aria-haspopup="dialog" onClick={() => openUnlock({ intent: 'enroll' })} {...props}>
      {children}
    </Button>
  );
}

// Tekstualno dugme za one koji već imaju kod
export function UnlockLink({ children = 'Imam pristupni kod', className = '' }) {
  const { hasAccess, openUnlock } = useAccess();
  if (hasAccess) return null;
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => openUnlock({ intent: 'code' })}
      className={`inline-flex min-h-11 items-center gap-2 font-semibold text-espreso underline decoration-karamel decoration-1 underline-offset-[5px] transition hover:decoration-2 ${className}`}
    >
      <Icon.Key width="16" height="16" className="text-karamel-tamni" />
      {children}
    </button>
  );
}

function AccessKeyForm({ onSuccess }) {
  const { unlock } = useAccess();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const rowRef = useRef(null);
  const id = useId();

  // Blago zatresi polje kada kod nije ispravan (osim ako je smanjeno kretanje uključeno)
  const shake = () => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    rowRef.current?.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-6px)' },
        { transform: 'translateX(5px)' },
        { transform: 'translateX(-3px)' },
        { transform: 'translateX(0)' },
      ],
      { duration: 380, easing: 'ease-out' },
    );
  };

  const submit = (e) => {
    e.preventDefault();
    if (!normalizeKey(value)) {
      setError('Upiši pristupni kod koji si dobila u poruci.');
      shake();
      return;
    }
    if (unlock(value)) {
      setError('');
      onSuccess?.();
    } else {
      setError('Ovaj kod ne otvara lekcije. Proveri da li je prepisan tačno kao u poruci ili piši Maji na Instagramu.');
      shake();
    }
  };

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor={`${id}-kod`} className="sr-only">
        Unesi pristupni kod
      </label>
      <div ref={rowRef} className="flex flex-col gap-3 sm:flex-row">
        <input
          id={`${id}-kod`}
          data-pristupni-kod
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError('');
          }}
          autoComplete="off"
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          placeholder="Unesi pristupni kod"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-greska` : undefined}
          className={`min-w-0 flex-1 border bg-vanila px-4 py-3.5 font-semibold tracking-[0.14em] text-espreso uppercase transition outline-none placeholder:font-normal placeholder:tracking-normal placeholder:text-kakao/60 placeholder:normal-case focus:border-bobica focus:bg-krem ${
            error ? 'border-bobica-tamna' : 'border-lan-tamni'
          }`}
        />
        <Button type="submit" arrow={false} className="shrink-0">
          Otključaj ceo program
        </Button>
      </div>
      <p id={`${id}-greska`} role="alert" className={`text-sm text-bobica-tamna text-pretty ${error ? 'mt-3' : 'sr-only'}`}>
        {error}
      </p>
    </form>
  );
}

function Field({ id, label, error, className = '', ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[0.82rem] font-semibold">
        {label} <span aria-hidden="true" className="text-bobica-tamna">*</span>
      </label>
      <input
        id={id}
        aria-required="true"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-greska` : undefined}
        className={`mt-1.5 w-full min-w-0 border bg-vanila px-4 py-3.5 text-espreso transition outline-none placeholder:text-kakao/60 focus:border-bobica focus:bg-krem ${
          error ? 'border-bobica-tamna' : 'border-lan-tamni'
        }`}
        {...props}
      />
      {error && (
        <p id={`${id}-greska`} role="alert" className="mt-1.5 text-sm text-bobica-tamna text-pretty">
          {error}
        </p>
      )}
    </div>
  );
}

// Prijava za upis: sva tri polja su obavezna, podaci se šalju mejlom (vidi src/lib/enroll.js)
function EnrollForm() {
  const id = useId();
  const [values, setValues] = useState({ ime: '', prezime: '', telefon: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
  const trapRef = useRef(null);
  const sentRef = useRef(null);

  useEffect(() => {
    if (status === 'sent') sentRef.current?.focus();
  }, [status]);

  const change = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
    if (status === 'failed') setStatus('idle');
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const found = validateEnrollment(values);
    setErrors(found);
    const firstInvalid = ENROLL_FIELDS.find((name) => found[name]);
    if (firstInvalid) {
      e.currentTarget.elements[firstInvalid]?.focus();
      return;
    }
    setStatus('sending');
    try {
      await sendEnrollment(values, trapRef.current?.value);
      setStatus('sent');
    } catch (err) {
      console.error('Prijava nije poslata:', err);
      setStatus('failed');
    }
  };

  if (status === 'sent') {
    return (
      <div
        ref={sentRef}
        tabIndex={-1}
        role="status"
        className="mt-4 flex gap-3 border border-zalfija/40 bg-zalfija-magla p-4 text-sm outline-none"
      >
        <Icon.Check className="mt-0.5 shrink-0 text-zalfija-tamna" width="18" height="18" strokeWidth={2} />
        <div className="text-pretty">
          <p className="font-semibold">Prijava je poslata.</p>
          <p className="mt-1 text-kakao">
            Maja će ti se javiti na {values.telefon.trim()} da dogovorite upis i uplatu. Kad dobiješ kod, unesi ga
            ispod.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate aria-busy={status === 'sending'} className="mt-4">
      <div className="grid gap-x-3 gap-y-4 sm:grid-cols-2">
        <Field
          id={`${id}-ime`}
          name="ime"
          label="Ime"
          type="text"
          autoComplete="given-name"
          value={values.ime}
          onChange={change('ime')}
          error={errors.ime}
        />
        <Field
          id={`${id}-prezime`}
          name="prezime"
          label="Prezime"
          type="text"
          autoComplete="family-name"
          value={values.prezime}
          onChange={change('prezime')}
          error={errors.prezime}
        />
        <Field
          id={`${id}-telefon`}
          className="sm:col-span-2"
          name="telefon"
          label="Broj telefona"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="npr. 064 123 4567"
          value={values.telefon}
          onChange={change('telefon')}
          error={errors.telefon}
        />
      </div>

      {/* Zamka za robote: ljudi ovo polje ne vide, a robot ga obično popuni */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input ref={trapRef} type="text" name="_honey" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <Button
          type="submit"
          arrow={status !== 'sending'}
          disabled={status === 'sending'}
          className="w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {status === 'sending' ? 'Šaljem…' : 'Pošalji prijavu'}
        </Button>
        <p className="text-xs text-kakao">* Sva polja su obavezna.</p>
      </div>

      {status === 'failed' && (
        <p role="alert" className="mt-4 text-sm text-bobica-tamna text-pretty">
          Prijava nije poslata. Proveri internet vezu i pokušaj ponovo ili piši Maji na{' '}
          <a href={INSTAGRAM_DM_URL} target="_blank" rel="noopener" className="font-semibold underline underline-offset-4">
            Instagramu
            <span className="sr-only"> (@{INSTAGRAM_HANDLE}, otvara se u novom prozoru)</span>
          </a>
          .
        </p>
      )}
    </form>
  );
}

// Na telefonu sadržaj koraka zauzima punu širinu; od tableta je poravnat sa naslovom
function Step({ number, title, children }) {
  return (
    <div>
      <div className="flex items-baseline gap-3 sm:gap-4">
        <span aria-hidden="true" className="w-7 shrink-0 font-display kurziv text-[2rem] leading-none text-karamel brojke sm:w-10">
          {number}.
        </span>
        <h3 className="font-display text-[1.35rem] leading-tight">{title}</h3>
      </div>
      <div className="sm:pl-14">{children}</div>
    </div>
  );
}

function AccessModal({ options, onClose }) {
  const ref = useRef(null);
  const headingRef = useRef(null);
  const [justUnlocked, setJustUnlocked] = useState(false);
  const open = options !== null;
  const lesson = options?.lesson;

  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) {
      setJustUnlocked(false);
      dialog.showModal();
      // showModal fokusira prvo dugme (Zatvori); fokus ide na polje za kod ili na naslov prozora
      if (options.intent === 'code') dialog.querySelector('[data-pristupni-kod]')?.focus();
      else headingRef.current?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open, options]);

  const continueToLessons = () => {
    const next = options?.onUnlocked;
    onClose();
    requestAnimationFrame(() => {
      if (next) next();
      else document.getElementById('video-lekcije')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-labelledby="pristup-naslov"
      className="modal-lekcija m-auto max-h-[92dvh] w-[min(92vw,36rem)] overflow-y-auto border border-okvir bg-krem p-2.5 text-espreso sm:p-3"
    >
      {open && (
        <div className="relative border border-okvir/70">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-0 right-0 z-10 grid size-11 place-items-center bg-krem text-espreso transition hover:bg-puter"
            aria-label="Zatvori"
          >
            <Icon.Close />
          </button>

          {justUnlocked ? (
            <div className="px-6 pt-10 pb-8 sm:px-9 sm:pt-12 sm:pb-9" aria-live="polite">
              <span className="grid size-12 place-items-center bg-zalfija-tamna text-vanila">
                <Icon.Check width="22" height="22" />
              </span>
              <p className="mt-7 eyebrow">Pristup otključan</p>
              <h2 id="pristup-naslov" className="mt-4 font-display text-[clamp(1.9rem,1.5rem+1.4vw,2.5rem)] leading-[1.08]">
                Dobrodošla u <span className="kurziv text-bobica">Akademiju</span>
              </h2>
              <p className="mt-4 text-kakao text-pretty">
                Sve video lekcije su otključane i ostaju dostupne na ovom uređaju. Na drugom telefonu ili računaru samo
                ponovo unesi isti kod.
              </p>
              <Button type="button" onClick={continueToLessons} className="mt-8 w-full">
                {lesson ? 'Pogledaj lekciju' : 'Pogledaj lekcije'}
              </Button>
            </div>
          ) : (
            <>
              {lesson && (
                <div className="flex gap-4 border-b border-okvir bg-puter/60 p-4 pr-12 sm:gap-5 sm:p-5 sm:pr-14">
                  <span className={`relative grid aspect-[4/5] w-20 shrink-0 place-items-center overflow-hidden sm:w-24 ${iconTint(lesson.id)}`}>
                    <LessonIcon name={lesson.icon} className="size-12 translate-y-1.5 sm:size-14" />
                    <span className="absolute top-0 left-0 grid size-7 place-items-center bg-bobica-tamna text-vanila">
                      <Icon.Lock width="13" height="13" />
                    </span>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-karamel-tamni uppercase">
                      Zaključana lekcija · {lesson.label}
                    </p>
                    <p className="mt-2 font-display text-[1.45rem] leading-tight">{lesson.title}</p>
                    {lesson.description && (
                      <p className="mt-1.5 line-clamp-3 text-sm text-kakao text-pretty">
                        {lesson.details.length ? lesson.details.join(' ') : lesson.description}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="px-5 pt-9 pb-8 sm:px-9 sm:pt-10 sm:pb-9">
                <div ref={headingRef} tabIndex={-1} className="outline-none">
                  <p className="eyebrow">Upis i pristup</p>
                  <h2 id="pristup-naslov" className="mt-4 font-display text-[clamp(1.9rem,1.5rem+1.4vw,2.5rem)] leading-[1.08] text-balance">
                    Otključaj <span className="kurziv text-bobica">program</span>
                  </h2>
                  <p className="mt-3 text-kakao text-pretty">
                    „{site.program}“ se otključava pristupnim kodom koji dobijaš nakon uplate.
                  </p>
                </div>

                <div className="mt-8 space-y-7">
                  <Step number={1} title="Pošalji prijavu">
                    <p className="mt-1 text-sm text-kakao text-pretty">
                      Upiši podatke, a Maja će ti se javiti da dogovorite upis i uplatu.
                    </p>
                    <EnrollForm />
                  </Step>

                  <div className="border-t border-okvir pt-7">
                    <Step number={2} title="Unesi pristupni kod">
                      <p className="mt-1 mb-4 text-sm text-kakao text-pretty">Kod dobijaš u poruci nakon uplate.</p>
                      <AccessKeyForm onSuccess={() => setJustUnlocked(true)} />
                      <p className="mt-4 text-xs text-kakao text-pretty">{rights.access}</p>
                    </Step>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </dialog>
  );
}
