# Uzair Nasir — Photography Portfolio

A brand-new, photography-first website with a premium minimal aesthetic.

## Structure
- `index.html`: main multi-section homepage (Hero, Selected Work, About, Work With Me, Contact)
- `gallery.html`: optional full gallery page
- `styles.css`: visual system, spacing, typography, responsiveness
- `script.js`: category filters, gallery rendering, lightbox, mobile nav
- `assets/photos/`: local photo/placeholders used by hero + gallery
- `vercel.json`: static deployment settings for Vercel

## Updating photos
Edit `galleryItems` in `script.js`:

```js
{
  title: "Your Photo Title",
  category: "Nature / Landscapes",
  src: "assets/photos/your-file.jpg",
  alt: "Accessible image description"
}
```

Add files under `assets/photos/` and point `src` to those local files.

## Contact details
Update email and social links in the Contact section of `index.html`.

## Portrait image
Place your portrait file at project root as `uzair-nasir-headshot.png` (used in the About section).

## Vercel deployment checklist
1. Ensure this commit is on your production branch (`main` by default).
2. In Vercel project settings, set Framework Preset to **Other**.
3. Leave Build Command empty and Output Directory empty.
4. Redeploy latest production build.
