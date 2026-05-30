## Plan: Mosaic-style projects carousel

Replace the simple single-image carousel with a mosaic layout matching the reference, where each "slide" is a composed cluster of images.

### Layout pattern (per slide cluster)
Each carousel "page" shows a 3-group horizontal arrangement:
- **Left group**: 1 tall image (full height)
- **Center group**: 1 large image on top + 2 smaller images side-by-side underneath (or inverse: 2 small on top + 1 large under — alternating each slide for variety)
- **Right group**: 1 large image + 1 small stacked, or mirror of left

The arrows stay top-right, dots stay bottom-center (as today). Embla still drives sliding, but each slide is a multi-image composition rather than a single `<img>`.

### Implementation
- Rewrite `src/components/ProjectsCarousel.tsx`:
  - Build slide groups by chunking the existing image pool (project + gallery + story + craft images) into sets of ~5 images per cluster.
  - Each cluster renders as a CSS grid: `grid-cols-4 grid-rows-2 gap-3` with images using `col-span`/`row-span` to create the mosaic (tall left, big center-top, two small bottom, tall right).
  - Alternate the pattern every other slide (mirror the layout) so the carousel feels editorial like the reference.
  - Embla settings: `loop: true`, `align: "start"`, slides at `basis-full` (each cluster fills viewport width of carousel).
  - Keep aspect ratio of the whole cluster around 16:7 so it reads like the reference strip.
- Keep arrows + dots styling unchanged.
- No other files touched.

### Out of scope
- No new images added — reuses current asset pool.
- Section heading, surrounding layout, and home page structure unchanged.
