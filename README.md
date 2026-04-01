# Uzair Nasir — Photography Portfolio

A brand-new, photography-first website with a premium minimal aesthetic.

## Structure
- `index.html`: main multi-section homepage (Hero, Selected Work, About, Work With Me, Contact)
- `gallery.html`: optional full gallery page
- `styles.css`: visual system, spacing, typography, responsiveness
- `script.js`: category filters, gallery rendering, lightbox, mobile nav

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
