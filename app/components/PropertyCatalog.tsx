import { useState } from "react";
import { LayerChips } from "~/components/LayerChips";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { CodeBlock } from "~/components/CodeBlock";
import { Copy, ListPlus } from "lucide-react";
import { useTaskList } from "~/context/TaskListContext";
import { toast } from "sonner";

const CATALOG = [
  {
    section: "Geometry & Transform",
    items: [
      { id: "position", name: "Position (X / Y)", desc: "Set the x and y position", types: ["FRAME", "RECTANGLE", "ELLIPSE", "TEXT", "INSTANCE", "GROUP", "VECTOR"], code: `node.x = 100;\nnode.y = 200;` },
      { id: "size", name: "Size (Width / Height)", desc: "Resize node", types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR", "TEXT"], code: `node.resizeWithoutConstraints(200, 100);` },
      { id: "rotation", name: "Rotation", desc: "Set rotation angle (degrees)", types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR", "TEXT", "INSTANCE", "GROUP"], code: `node.rotation = 45;` },
      { id: "corner-radius", name: "Corner Radius", desc: "Set unified corner radius", types: ["RECTANGLE", "FRAME", "COMPONENT", "INSTANCE"], code: `node.cornerRadius = 8;` },
      { id: "individual-corner-radius", name: "Individual Corner Radius", desc: "Set each corner's radius", types: ["RECTANGLE", "FRAME", "COMPONENT", "INSTANCE"], code: `node.topLeftRadius = 4;\nnode.topRightRadius = 8;\nnode.bottomRightRadius = 16;\nnode.bottomLeftRadius = 0;` },
    ],
  },
  {
    section: "Auto Layout",
    items: [
      { id: "layout-direction", name: "Direction (Horizontal/Vertical)", desc: "Set auto layout direction", types: ["FRAME", "COMPONENT"], code: `node.layoutMode = 'HORIZONTAL|VERTICAL';` },
      { id: "item-spacing", name: "Item Spacing", desc: "Set gap between children", types: ["FRAME", "COMPONENT"], code: `node.itemSpacing = 24;` },
      { id: "padding", name: "Padding", desc: "Set paddings", types: ["FRAME", "COMPONENT"], code: `node.paddingLeft = 16;\nnode.paddingRight = 16;\nnode.paddingTop = 8;\nnode.paddingBottom = 8;` },
      { id: "horizontal-resizing", name: "Horizontal Resizing", desc: "Set horizontal resizing mode", types: ["FRAME", "COMPONENT"], code: `node.layoutSizingHorizontal = "FILL|FIXED|HUG";` },
      { id: "vertical-resizing", name: "Vertical Resizing", desc: "Set vertical resizing mode", types: ["FRAME", "COMPONENT"], code: `node.layoutSizingVertical = "FILL|FIXED|HUG";` },
      { id: "primary-axis-align-items", name: "Primary Axis Align Items", desc: "Align children on primary axis", types: ["FRAME", "COMPONENT"], code: `node.primaryAxisAlignItems = 'MIN|CENTER|MAX|SPACE_BETWEEN'\n
// Auto layout frame
// +------------------------------------+
// | +-----------++-----------+         |
// | |           ||           |         |
// | |  Child 1  ||  Child 2  |         |
// | |           ||           |         |
// | +-----------++-----------+         |
// +------------------------------------+
node.primaryAxisAlignItems = 'MIN'

// Auto layout frame
// +------------------------------------+
// |          +-----------++-----------+|
// |          |           ||           ||
// |          |  Child 1  ||  Child 2  ||
// |          |           ||           ||
// |          +-----------++-----------+|
// +------------------------------------+
node.primaryAxisAlignItems = 'MAX'

// Auto layout frame
// +------------------------------------+
// |     +-----------++-----------+     |
// |     |           ||           |     |
// |     |  Child 1  ||  Child 2  |     |
// |     |           ||           |     |
// |     +-----------++-----------+     |
// +------------------------------------+
node.primaryAxisAlignItems = 'CENTER'

// Auto layout frame
// +------------------------------------+
// |+-----------+          +-----------+|
// ||           |          |           ||
// ||  Child 1  |          |  Child 2  ||
// ||           |          |           ||
// |+-----------+          +-----------+|
// +------------------------------------+
node.primaryAxisAlignItems = 'SPACE_BETWEEN'
;` },
      { id: "cross-axis-align-items", name: "Cross Axis Align Items", desc: "Align children on cross axis", types: ["FRAME", "COMPONENT"], code: `node.counterAxisAlignItems = 'MIN|CENTER|MAX|BASELINE'\n
// Auto layout frame
// +--------------------------+
// |+-----------++----+       |
// ||           ||    |       |
// ||  Child 1  ||asdf|       |
// ||           ||    |       |
// |+-----------++----+       |
// |                          |
// |                          |
// +--------------------------+
node.counterAxisAlignItems = 'MIN'

// Auto layout frame
// +--------------------------+
// |                          |
// |                          |
// |+-----------++----+       |
// ||           ||    |       |
// ||  Child 1  ||asdf|       |
// ||           ||    |       |
// |+-----------++----+       |
// +--------------------------+
node.counterAxisAlignItems = 'MAX'

// Auto layout frame
// +--------------------------+
// |                          |
// |+-----------++----+       |
// ||           ||    |       |
// ||  Child 1  ||asdf|       |
// ||           ||    |       |
// |+-----------++----+       |
// |                          |
// +--------------------------+
node.counterAxisAlignItems = 'CENTER'

// Auto layout frame
// +--------------------------+
// |+-----------+             |
// ||           |+----+       |
// ||  Child 1  ||    |       |
// ||           ||asdf|       |
// |+-----------+|    |       |
// |             +----+       |
// |                          |
// +--------------------------+
node.counterAxisAlignItems = 'BASELINE'
;` },
    ],
  },
  {
    section: "Fill & Stroke",
    items: [
      { id: "fill-solid", name: "Solid Fill", desc: "Set a solid fill color (uses convertColor() helper)", types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR", "TEXT"], code: `node.fills = [{ type: 'SOLID', color: convertColor('#000') }, opacity: 1]; // use convertColor() helper to convert hex, rgb(), hsl() to Figma RGB object` },
      { id: "remove-fills", name: "Remove All Fills", desc: "Remove all fills", types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR", "TEXT"], code: `node.fills = [];` },
      { id: "apply-variable-fill", name: "Apply Fill Variable", desc: "Apply fill variable", types: ["RECTANGLE", "FRAME", "VECTOR", "COMPONENT", "INSTANCE"], code: `figma.variables.setBoundVariableForPaint(node, 0, 'fills', VARIABLE_ID);` },
      { id: "stroke-color-weight", name: "Stroke Color & Weight", desc: "Set stroke color and weight", types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR", "TEXT"], code: `node.strokes = [{ type: 'SOLID', color: convertColor('#000') }, opacity: 1]; // use convertColor() helper to convert hex, rgb(), hsl() to Figma RGB object\nnode.strokeWeight = 2; ` },
      { id: "stroke-align", name: "Stroke Align", desc: "Set stroke alignment", types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR"], code: `node.strokeAlign = 'CENTER|INSIDE|OUTSIDE';` },
      { id: "stroke-dash-pattern", name: "Stroke Dash Pattern", desc: "Set dashed stroke", types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR"], code: `node.dashPattern = [4, 2];` },
      { id: "opacity", name: "Opacity", desc: "Set opacity 0-1", types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR", "TEXT", "GROUP", "INSTANCE"], code: `node.opacity = 0.5;` },
      { id: "blend-mode", name: "Blend Mode", desc: "Set blend mode", types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR", "TEXT", "GROUP", "INSTANCE"], code: `node.blendMode = "MULTIPLY";\n
// Blend mode value list:
// "PASS_THROUGH" 
// "NORMAL" 
// "DARKEN" 
// "MULTIPLY" 
// "LINEAR_BURN" // "Plus darker" in Figma
// "COLOR_BURN" 
// "LIGHTEN" 
// "SCREEN" 
// "LINEAR_DODGE" // "Plus lighter" in Figma
// "COLOR_DODGE" 
// "OVERLAY" 
// "SOFT_LIGHT" 
// "HARD_LIGHT" 
// "DIFFERENCE" 
// "EXCLUSION" 
// "HUE" 
// "SATURATION" 
// "COLOR" 
// "LUMINOSITY"
` },
      { id: "drop-shadow", name: "Drop Shadow", desc: "Add a drop shadow effect", types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR"], code: `node.effects = [{ type: 'DROP_SHADOW', blendMode: 'NORMAL', color: convertColorWithOpacity('rgba(0,0,0,0.5)'), offset: { x: 0, y: 0 }, radius: 10, visible: true }]; // use convertColorWithOpacity() helper to convert hex, rgba(), hsla() to Figma RGB object` },
      { id: "layer-blur", name: "Layer Blur", desc: "Add a layer blur effect", types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR"], code: `node.effects = [{ type: 'LAYER_BLUR', radius: 10, visible: true }];` },
      { id: "background-blur", name: "Background Blur", desc: "Add a background blur effect", types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR"], code: `node.effects = [{ type: 'BACKGROUND_BLUR', radius: 20, visible: true }];` },
    ],
  },
  {
    section: "Text",
    items: [
      { id: "replace-text", name: "Replace Text", desc: "Change the text content", types: ["TEXT"], code: `node.characters = "New Content";` },
      { id: "font-size", name: "Font Size", desc: "Set font size", types: ["TEXT"], code: `node.fontSize = 16;` },
      { id: "font-weight", name: "Font Weight", desc: "Set font weight (style)", types: ["TEXT"], code: `node.fontName = { family: "Inter", style: "Bold" };` },
      { id: "line-height", name: "Line Height", desc: "Set line height (pixels)", types: ["TEXT"], code: `node.lineHeight = { unit: "PIXELS", value: 24 }; // set line height to 24px\nnode.lineHeight = { unit: "PERCENT", value: 150 }; // set line height to 150% of font size\nnode.lineHeight = { unit: "AUTO" }; // set line height to auto` },
      { id: "text-fill", name: "Text Fill Color", desc: "Set text color", types: ["TEXT"], code: `node.fills = [{ type: 'SOLID', color: convertColor('#000') }, opacity: 1]; // use convertColor() helper to convert hex, rgb(), hsl() to Figma RGB object` },
      { id: "export-settings", name: "Export Settings", desc: "Set export options (PNG @2x)", types: ["FRAME", "RECTANGLE", "ELLIPSE", "TEXT", "VECTOR"], code: `node.exportSettings = [{ format: 'PNG', suffix: '@2x', constraint: { type: 'SCALE', value: 2 } }];` },
    ],
  },
];

export function PropertyCatalog() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerCode, setDrawerCode] = useState("");
  const [_, dispatch] = useTaskList();

  return (
    <section id="api" className="bg-neutral-100 py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-8 text-3xl font-bold">Friendly API</h2>
        <p className="mb-6 text-base text-muted-foreground max-w-2xl">
          Figma's official API is not user-friendly for designers. This site is dedicated to providing an easier way to understand and use the Figma API, letting anyone generate fully runnable code with simple UI. Every designer can use Figma scripts.
        </p>
        {/* 1. Layer Types */}
        <h2 className="mb-3 mt-10 text-xl font-bold">1. Layer Types Overview</h2>
        <div className="mb-3 text-muted-foreground">
          Each property in Figma can only be applied to certain layer types. Below is a quick overview of common layer types. You need to select the correct type(s) for your script to work as expected.
        </div>
        <LayerChips />
        {/* 2. Layer Properties */}
        <h2 className="mb-3 mt-12 text-xl font-bold">2. Layer Properties</h2>
        <div className="mb-5 text-muted-foreground">
          Here are the most common Figma layer properties, grouped by category. Each code snippet changes one property of a selected node. Use the code generator below to build a complete runnable script.
        </div>
        {CATALOG.map((group) => (
          <div key={group.section} className="mt-10">
            <h3 className="mb-5 text-lg font-bold">{group.section}</h3>
            <ul className="space-y-10">
              {group.items.map((item) => (
                <li key={item.id}>
                  <div className="flex flex-col gap-2">
                    <div>
                      <div className="font-medium mb-1">{item.name}</div>
                      <div className="mb-2 text-sm text-muted-foreground">{item.desc}</div>
                      <div className="mb-2 flex flex-wrap gap-2">
                        {item.types.map((t) => (
                          <span key={t} className="rounded bg-sky-100 text-sky-800 px-2 py-1 text-xs">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div>
                        <CodeBlock code={item.code} />
                      </div>
                      <div className="mt-2 flex gap-2">
                        <Sheet open={drawerOpen && drawerCode === item.code} onOpenChange={open => { setDrawerOpen(open); if (!open) setDrawerCode(""); }}>
                          <SheetTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => { setDrawerCode(item.code); setDrawerOpen(true); }}
                            >
                              <Copy className="mr-1 h-4 w-4" />
                              Copy executable script
                            </Button>
                          </SheetTrigger>
                          <SheetContent side="right" className="w-[380px]">
                            <div className="p-6">
                              <div className="mb-4 font-semibold">Executable Code Generator</div>
                              <CodeBlock code={`const selection = figma.currentPage.selection;
for (const node of selection) {
  ${item.code}
}`} />
<div className="mt-4">
  <Button variant="outline" size="sm" onClick={() => {
    navigator.clipboard.writeText(`const selection = figma.currentPage.selection;
for (const node of selection) {
  ${item.code}
}`);
toast.success("Copied to clipboard")
  }}>
    <Copy className="h-4 w-4" />
    Copy to clipboard
  </Button>
</div>
                            </div>
                          </SheetContent>
                        </Sheet>
                        <Button
                          variant="outline"
                          size="sm"
                          aria-label="Add to tasks"
                          onClick={() =>
                            dispatch({
                              type: "add",
                              item: {
                                id: item.id,
                                name: item.name,
                                template: item.code,
                                vars: {},
                              },
                            })
                          }
                        >
                          <ListPlus className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {/* 3. Layer Operations */}
        <h2 className="mb-3 mt-16 text-xl font-bold">3. Layer Operations</h2>
        <div className="mb-8 text-muted-foreground">Advanced operations will be available soon.</div>
        {/* 4. Execution Templates & Helpers */}
        <h2 className="mb-3 mt-16 text-xl font-bold">4. Execution Templates & Helper Functions</h2>
        <div className="mb-4 text-muted-foreground">
          To batch-run property changes on all selected nodes, or to use features like color parsing and loading fonts for text, use the following templates and helpers. Paste your node.xxx = xxx code into the for-loop of the template as needed.
        </div>
        <div className="mb-2 font-semibold">Runnable Template:</div>
        <CodeBlock
          code={`const selection = figma.currentPage.selection;
for (const node of selection) {
  // Paste node property code here, e.g. node.cornerRadius = 8;
}`}

        />
        <div className="mt-6 mb-2 font-semibold">Helper: convertColor()</div>
        <CodeBlock
          code={`function convertColor(input) {
  if (typeof input !== 'string') throw new Error('Input must be a string');

  if (input[0] === '#') {
    let hex = input.slice(1);
    if (hex.length === 3) hex = hex.split('').map(x=>x+x).join('');
    if (hex.length === 8) hex = hex.slice(0,6); 
    if (hex.length !== 6) throw new Error('Invalid hex color format');
    const num = parseInt(hex,16);
    return {
      r: ((num >> 16) & 0xFF) / 255,
      g: ((num >> 8) & 0xFF) / 255,
      b: (num & 0xFF) / 255
    };
  }

  // RGB/RGBA
  const rgb = input.match(/^rgba?\(([^)]+)\)$/);
  if (rgb) {
    const parts = rgb[1].split(',').map(v=>v.trim());
    if (parts.length < 3) throw new Error('Invalid rgb(a) format');
    const parse = x => x.endsWith('%') ? parseFloat(x)/100 : (parseFloat(x)>1?parseFloat(x)/255:parseFloat(x));
    return {
      r: parse(parts[0]),
      g: parse(parts[1]),
      b: parse(parts[2])
    };
  }

  // HSL/HSLA
  const hsl = input.match(/^hsla?\(([^)]+)\)$/);
  if (hsl) {
    const [h,s,l] = hsl[1].split(',').map(v=>v.trim());
    // hsl to rgb
    let _h = parseFloat(h)/360, _s = parseFloat(s)/100, _l = parseFloat(l)/100;
    let r,g,b;
    if (_s===0) r=g=b=_l;
    else {
      const q = _l<0.5 ? _l*(1+_s) : _l+_s-_l*_s;
      const p = 2*_l-q;
      const hue2rgb = (p,q,t)=>{
        if(t<0)t+=1;if(t>1)t-=1;
        if(t<1/6)return p+(q-p)*6*t;
        if(t<1/2)return q;
        if(t<2/3)return p+(q-p)*(2/3-t)*6;
        return p;
      };
      r = hue2rgb(p,q,_h+1/3);
      g = hue2rgb(p,q,_h);
      b = hue2rgb(p,q,_h-1/3);
    }
    return { r, g, b };
  }
  throw new Error('Unsupported color format');
}`}
        />
         <div className="mt-6 mb-2 font-semibold">Helper: convertColorWithOpacity()</div>
        <CodeBlock
          code={`function convertColorWithOpacity(input) {
  // Returns { r, g, b, a } for Figma; all values in [0,1]
  if (typeof input !== 'string') throw new Error('Input must be a string');

  if (input[0] === '#') {
    let hex = input.slice(1);
    if (hex.length === 3) {
      hex = hex.split('').map(x=>x+x).join('');
    }
    if (hex.length === 6) hex += 'FF';
    if (hex.length !== 8) throw new Error('Invalid hex color format');
    const num = parseInt(hex,16);
    return {
      r: ((num >> 24) & 0xFF) / 255,
      g: ((num >> 16) & 0xFF) / 255,
      b: ((num >> 8) & 0xFF) / 255,
      a: (num & 0xFF) / 255
    };
  }

  const rgbRegex = /^rgba?\(([^)]+)\)$/;
  let m = input.match(rgbRegex);
  if (m) {
    const parts = m[1].split(',').map(v => v.trim());
    if (parts.length < 3) throw new Error('Invalid rgb(a) format');
    let [r,g,b,a] = parts;
    function parseRgb(x) {
      if (x.endsWith('%')) return parseFloat(x)/100;
      let n = parseFloat(x);
      return n>1 ? n/255 : n;
    }
    r = parseRgb(r); g = parseRgb(g); b = parseRgb(b);
    a = parts[3]!==undefined ? parseFloat(parts[3]) : 1;
    if (isNaN(r)||isNaN(g)||isNaN(b)||isNaN(a)) throw new Error('Invalid rgb(a) value');
    return { r: r, g: g, b: b, a: a };
  }

  const hslRegex = /^hsla?\(([^)]+)\)$/;
  m = input.match(hslRegex);
  if (m) {
    const parts = m[1].split(',').map(v => v.trim());
    if (parts.length < 3) throw new Error('Invalid hsl(a) format');
    let [h,s,l,a] = parts;
    h = parseFloat(h);
    s = parseFloat(s)/100;
    l = parseFloat(l)/100;
    a = parts[3]!==undefined ? parseFloat(parts[3]) : 1;
    function hue2rgb(p,q,t) {
      if (t<0) t+=1;
      if (t>1) t-=1;
      if (t<1/6) return p+(q-p)*6*t;
      if (t<1/2) return q;
      if (t<2/3) return p+(q-p)*(2/3-t)*6;
      return p;
    }
    let r,g,b;
    if (s===0) {
      r=g=b=l;
    } else {
      const q = l < 0.5 ? l*(1+s) : l+s-l*s;
      const p = 2*l-q;
      r = hue2rgb(p,q,h/360+1/3);
      g = hue2rgb(p,q,h/360);
      b = hue2rgb(p,q,h/360-1/3);
    }
    if ([r,g,b,a].some(x=>isNaN(x))) throw new Error('Invalid hsl(a) value');
    return { r: r, g: g, b: b, a: a };
  }

  throw new Error('Unsupported color format');
}`}
        />
        <div className="mt-6 mb-2 font-semibold">Helper: loadFonts()</div>
        <CodeBlock
          code={`async function loadFonts(selection = figma.currentPage.selection) {
  const fonts = [];
  selection.forEach(node => {
    if (node.type === 'TEXT') {
      if (typeof node.fontName === 'object' && 'family' in node.fontName) {
        const font = node.fontName;
        if (!fonts.some(f => f.family === font.family && f.style === font.style)) {
          fonts.push(font);
        }
      }
      if ('getRangeFontName' in node) {
        for (let i = 0; i < node.characters.length; i++) {
          try {
            const font = node.getRangeFontName(i, i + 1);
            if (!fonts.some(f => f.family === font.family && f.style === font.style)) {
              fonts.push(font);
            }
          } catch (e) {}
        }
      }
    }
  });
  for (const font of fonts) {
    await figma.loadFontAsync(font);
  }
}`}

        />
      </div>
    </section>
  );
}