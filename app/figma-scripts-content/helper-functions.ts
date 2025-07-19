// Helper functions
export const convertColor = `function convertColor(input: string) {
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
}`;

export const convertColorWithOpacity = `function convertColorWithOpacity(input: string) {
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
}`;

export const loadFonts = `async function loadFonts(selection: any[] = figma.currentPage.selection) {
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
}`;