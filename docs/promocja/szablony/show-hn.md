# Show HN: wt. 1.12.2026, ok. 15:00 czasu polskiego

> Zasady (news.ycombinator.com/showhn.html): coś, co **można od razu wypróbować**, zbudowane przez autora,
> który rozmawia w wątku · bez landing page'y i stron z zapisem · **nie proś nikogo o upvote'y ani komentarze** ·
> najlepiej bez rejestracji.
> Link prowadzi **bezpośrednio do grywalnej wersji** (itch.io albo `piotrsowiak.pl/<slug>/play/`), nie do landingu z formularzem.

**Title** (≤80 znaków, bez wykrzykników i superlatywów):
```
Show HN: {NAZWA_GRY} – a falling-floor arcade game in TypeScript and Canvas
```
**URL:** `{LINK_ITCH}` (bez UTM)

**Pierwszy komentarz (od razu po publikacji):**
```
Hi HN, I'm Piotr. I write .NET business software for a living; this is the first game I've
finished, built in evenings over ~6 weeks.

The idea is simple: every tile you step on collapses shortly after you leave it, so you
can't backtrack. A run takes {DLUGOSC_SESJI}.

Some technical notes:
- No engine: TypeScript + the Canvas 2D API, {ROZMIAR_KB} KB gzipped.
- {DECYZJA_TECHNICZNA_1}  (np. fixed-timestep loop, how tiles are pooled)
- The Android build is the same code wrapped with Capacitor. The main surprises were
  {NIESPODZIANKA_ANDROID}.

It's free in the browser. The Android version (Dec 12) is free with a one-time unlock
and no ads – I wanted a monetization model I'd be fine with as a player.

I'd love feedback on how it feels in the first minute, and on performance on older
machines.
```

**Podczas wątku:** Piotr odpowiada sam, technicznie i krótko. Szkice odpowiedzi na typowe pytania przygotowuje
`community` (np. „why not Godot/Unity?”, „why Capacitor instead of TWA?”, „how do you handle input latency on mobile?”).
