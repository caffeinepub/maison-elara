import { useEffect } from "react";

interface MetaTagsOptions {
  title: string;
  description: string;
  image?: string;
  type?: string;
}

export function useMetaTags({
  title,
  description,
  image,
  type = "website",
}: MetaTagsOptions) {
  useEffect(() => {
    const fullTitle = `${title} | Maison Elara`;
    document.title = fullTitle;

    const setMeta = (selector: string, attr: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta") as HTMLMetaElement;
        document.head.appendChild(el);
      }
      el.setAttribute(attr, content);
      el.content = content;
    };

    setMeta('meta[name="description"]', "name", "description");
    (
      document.querySelector('meta[name="description"]') as HTMLMetaElement
    ).content = description;

    const ogTitle = document.querySelector(
      'meta[property="og:title"]',
    ) as HTMLMetaElement | null;
    const ogt =
      ogTitle ??
      (() => {
        const el = document.createElement("meta");
        el.setAttribute("property", "og:title");
        document.head.appendChild(el);
        return el;
      })();
    ogt.content = fullTitle;

    const ogDesc = document.querySelector(
      'meta[property="og:description"]',
    ) as HTMLMetaElement | null;
    const ogd =
      ogDesc ??
      (() => {
        const el = document.createElement("meta");
        el.setAttribute("property", "og:description");
        document.head.appendChild(el);
        return el;
      })();
    ogd.content = description;

    const ogType = document.querySelector(
      'meta[property="og:type"]',
    ) as HTMLMetaElement | null;
    const ogt2 =
      ogType ??
      (() => {
        const el = document.createElement("meta");
        el.setAttribute("property", "og:type");
        document.head.appendChild(el);
        return el;
      })();
    ogt2.content = type;

    const twitterCard = document.querySelector(
      'meta[name="twitter:card"]',
    ) as HTMLMetaElement | null;
    const tc =
      twitterCard ??
      (() => {
        const el = document.createElement("meta");
        el.setAttribute("name", "twitter:card");
        document.head.appendChild(el);
        return el;
      })();
    tc.content = image ? "summary_large_image" : "summary";

    if (image) {
      const absImage = image.startsWith("http")
        ? image
        : `${window.location.origin}${image}`;

      const ogImg = document.querySelector(
        'meta[property="og:image"]',
      ) as HTMLMetaElement | null;
      const ogi =
        ogImg ??
        (() => {
          const el = document.createElement("meta");
          el.setAttribute("property", "og:image");
          document.head.appendChild(el);
          return el;
        })();
      ogi.content = absImage;
    }
  }, [title, description, image, type]);
}
