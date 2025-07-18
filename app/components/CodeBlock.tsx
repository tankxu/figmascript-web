import { useEffect, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";

// custom css
const customCss = `
  .shiki {
    background: #fff !important;
  }
`;

if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.textContent = customCss;
  document.head.appendChild(style);
}

export function CodeBlock({ code }: { code: string }) {
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);

      if (typeof window !== "undefined") {
        if (!(window as any).__shikiHighlighter) {
          (window as any).__shikiHighlighter = await createHighlighter({
            themes: ["slack-ochin"],
            langs: ["typescript", "javascript", "jsx", "tsx"],
          });
        }
        const highlighter: Highlighter = (window as any).__shikiHighlighter;
        const html = highlighter.codeToHtml(code, {
          lang: "typescript",
          theme: "slack-ochin",
        });
        if (isMounted) setHtml(html);
      } else {
        if (isMounted) setHtml(`<pre><code>${code}</code></pre>`);
      }
      if (isMounted) setLoading(false);
    })();
    return () => {
      isMounted = false;
    };
  }, [code]);

  if (loading) {
    return (
      <pre>
        <code>Loading...</code>
      </pre>
    );
  }

  return (
    <div
      className="rounded-lg text-sm max-w-2xl mt-4 p-5 bg-white border border-[0.5px] border-neutral-200 overflow-x-scroll"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}