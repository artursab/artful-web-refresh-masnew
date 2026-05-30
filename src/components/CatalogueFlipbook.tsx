import { useEffect, useRef, useState, forwardRef, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

const PDF_URL = "/catalogue.pdf";

type RenderedPage = { src: string; width: number; height: number };

const Page = forwardRef<HTMLDivElement, { src: string; number: number; total: number }>(
  ({ src, number, total }, ref) => (
    <div ref={ref} className="bg-white shadow-md">
      <img
        src={src}
        alt={`Page ${number} sur ${total}`}
        className="block w-full h-full object-contain select-none"
        draggable={false}
      />
    </div>
  ),
);
Page.displayName = "CataloguePage";

export function CatalogueFlipbook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<any>(null);
  const [pages, setPages] = useState<RenderedPage[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [current, setCurrent] = useState(0);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  // Render the PDF to canvases (client-only).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        const workerSrc = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
        pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

        const doc = await pdfjs.getDocument({ url: PDF_URL }).promise;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const targetWidth = 1200; // CSS px target for a single page
        const rendered: RenderedPage[] = [];

        for (let i = 1; i <= doc.numPages; i++) {
          if (cancelled) return;
          const page = await doc.getPage(i);
          const viewport1 = page.getViewport({ scale: 1 });
          const scale = (targetWidth / viewport1.width) * dpr;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("Canvas 2D non disponible");
          await page.render({ canvasContext: ctx, viewport, canvas }).promise;
          rendered.push({
            src: canvas.toDataURL("image/jpeg", 0.85),
            width: viewport1.width,
            height: viewport1.height,
          });
        }
        if (cancelled) return;
        setPages(rendered);
        setStatus("ready");
      } catch (e: unknown) {
        if (cancelled) return;
        const msg = e instanceof Error ? e.message : String(e);
        setErrorMsg(msg);
        setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Compute flipbook size from container width AND viewport height + first page ratio.
  useEffect(() => {
    if (!pages.length || !containerRef.current) return;
    const first = pages[0];
    const ratio = first.height / first.width; // > 1 for portrait A4
    const compute = () => {
      const el = containerRef.current;
      if (!el) return;
      const cw = el.clientWidth;
      const isDouble = cw >= 768;
      // Reserve vertical space for header, page title, controls bar, paddings.
      const reserved = isDouble ? 320 : 260;
      const availableH = Math.max(320, window.innerHeight - reserved);
      const widthByContainer = isDouble ? Math.floor(cw / 2) : cw;
      const widthByHeight = Math.floor(availableH / ratio);
      const pageWidth = Math.max(240, Math.min(widthByContainer, widthByHeight));
      const pageHeight = Math.floor(pageWidth * ratio);
      setSize({ w: pageWidth, h: pageHeight });
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(containerRef.current);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [pages]);

  const prev = useCallback(() => bookRef.current?.pageFlip?.()?.flipPrev(), []);
  const next = useCallback(() => bookRef.current?.pageFlip?.()?.flipNext(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <div className="w-full">
      <div ref={containerRef} className="mx-auto max-w-5xl">
        {status === "loading" && (
          <div className="aspect-[1/1.414] md:aspect-[1.414/1] w-full max-h-[70vh] rounded-lg bg-stone-100 ring-1 ring-charcoal/10 animate-pulse flex items-center justify-center text-charcoal/40 text-sm">
            Chargement du catalogue…
          </div>
        )}

        {status === "error" && (
          <div className="rounded-lg bg-stone-50 ring-1 ring-charcoal/10 p-8 text-center">
            <p className="text-charcoal/70 mb-4">
              Impossible de charger le catalogue ({errorMsg || "erreur inconnue"}).
            </p>
            <a
              href={PDF_URL}
              className="inline-flex items-center gap-2 text-oak underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={14} /> Télécharger le PDF
            </a>
          </div>
        )}

        {status === "ready" && size && pages.length > 0 && (
          <div
            className="mx-auto"
            style={{ maxWidth: size.w * (size.w * 2 <= (containerRef.current?.clientWidth ?? 0) ? 2 : 1) }}
          >
            <HTMLFlipBook
              ref={bookRef}
              width={size.w}
              height={size.h}
              size="stretch"
              minWidth={280}
              maxWidth={1400}
              minHeight={400}
              maxHeight={2000}
              showCover
              mobileScrollSupport
              usePortrait
              drawShadow
              flippingTime={700}
              maxShadowOpacity={0.4}
              className="catalogue-flipbook mx-auto"
              style={{}}
              startPage={0}
              startZIndex={0}
              autoSize
              clickEventForward
              useMouseEvents
              swipeDistance={30}
              showPageCorners
              disableFlipByClick={false}
              onFlip={(e: { data: number }) => setCurrent(e.data)}
            >
              {pages.map((p, i) => (
                <Page key={i} src={p.src} number={i + 1} total={pages.length} />
              ))}
            </HTMLFlipBook>
          </div>
        )}
      </div>

      {status === "ready" && pages.length > 0 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            disabled={current === 0}
            aria-label="Page précédente"
            className="size-10 inline-flex items-center justify-center rounded-full ring-1 ring-charcoal/15 text-charcoal hover:bg-charcoal hover:text-cream transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charcoal"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm text-charcoal/60 tabular-nums min-w-[5rem] text-center">
            {current + 1} / {pages.length}
          </span>
          <button
            type="button"
            onClick={next}
            disabled={current >= pages.length - 1}
            aria-label="Page suivante"
            className="size-10 inline-flex items-center justify-center rounded-full ring-1 ring-charcoal/15 text-charcoal hover:bg-charcoal hover:text-cream transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charcoal"
          >
            <ChevronRight size={18} />
          </button>
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-oak transition-colors"
          >
            <Download size={14} /> PDF
          </a>
        </div>
      )}
    </div>
  );
}

export default CatalogueFlipbook;
