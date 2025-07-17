import { useEffect, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";

let highlighterCache: Highlighter | null = null;

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
    (async () => {
      try {
        setLoading(true);
        
        if (!highlighterCache) {
          highlighterCache = await createHighlighter({
            themes: ["snazzy-light"],
            langs: ["typescript", "javascript", "jsx", "tsx"],
          });
        }

        const html = highlighterCache.codeToHtml(code, {
          lang: "typescript",
          theme: "snazzy-light",
        });
        
        setHtml(html);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHtml(`<pre><code>${code}</code></pre>`);
      } finally {
        setLoading(false);
      }
    })();
  }, [code]);

  if (loading) {
    return (
      <pre>
        <code>Loading...</code>
      </pre>
    );
  }

  return (
    <div className="rounded-lg text-sm max-w-2xl mt-4 p-5 bg-white border border-[0.5px] border-neutral-200 overflow-x-scroll"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}