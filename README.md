# Kelly Buxton Aesthetics

A bespoke five-page editorial website for Kelly Buxton Aesthetics, Mickleover, Derby.

## Pages
- Home: Kelly’s introduction and full face rejuvenation focus
- About Kelly
- Treatments: service overview and current That Time pricing link
- Results: filterable client gallery with keyboard-accessible lightbox
- Contact: clinic details, opening hours, directions and WhatsApp enquiry composer

## Run
Requires Node.js 20 or newer. No npm dependencies.

```sh
npm run build
npm run check
npm run dev
```

The initial client photo import uses the standard Library transfer helper and private build configuration. After import, the static photo assets are retained on the original Vercel deployment and subsequent builds use that immutable asset origin. For a fully offline build, place the 14 photos listed in `src/asset-manifest.json` in a root `assets/` folder.

`SITE_URL` sets canonical URLs. Update it when a custom domain is selected.
`SKIP_ASSETS=1 npm run build` allows HTML and metadata checks without downloading photos.

## Content decisions
- Uses Kelly’s supplied biography, contact details and treatment categories.
- All consultation and treatment booking links point to the supplied That Time page.
- Current prices remain on That Time; no prices or reviews are fabricated.
- Deposit, booking and aftercare information remains with the existing booking system.
- No backend, analytics, advertising trackers or enquiry storage.
- WhatsApp form composes a message locally; the visitor reviews and sends it in WhatsApp.
- Photographs are unretouched supplied client images. No generated results or portraits.

## Deployment
Vercel is configured to run `node build.mjs` and serve `public/`.
