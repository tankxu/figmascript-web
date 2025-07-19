// 定义输入字段类型
export interface InputField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'color' | 'boolean';
  placeholder?: string;
  defaultValue?: string | number | boolean;
  required?: boolean;
  // 用于 select 类型的选项
  options?: Array<{
    value: string;
    label: string;
  }>;
  // 用于 number 类型的范围
  min?: number;
  max?: number;
  step?: number;
  // 用于 color 类型的格式提示
  colorFormat?: 'hex' | 'rgb' | 'hsl';
}

// 定义 helper 函数依赖
export interface HelperDependency {
  name: string;
  import: string; // 从哪个文件导入
  description: string;
}

// 定义代码生成器
export interface CodeGenerator {
  // 基础信息
  id: string;
  name: string;
  description: string;
  types: string[]; // 支持的图层类型
  
  // 输入字段定义
  inputs: InputField[];
  
  // 显示代码（用于预览，不包含变量）
  displayCode: string;
  
  // 代码模板（使用 {{变量名}} 格式，支持条件性生成）
  codeTemplate: string;
  
  // 需要的 helper 函数
  helpers?: HelperDependency[];
  
  // 是否需要在代码前添加注释
  addComment?: boolean;
  commentTemplate?: string;
}

// 定义分类
export interface CatalogSection {
  section: string;
  items: CodeGenerator[];
}

export const CATALOG: CatalogSection[] = [
  {
    section: "Geometry & Transform",
    items: [
      {
        id: "position",
        name: "Position (X / Y)",
        description: "Set the x and y position",
        types: ["FRAME", "RECTANGLE", "ELLIPSE", "TEXT", "INSTANCE", "GROUP", "VECTOR"],
        inputs: [
          {
            key: "x",
            label: "X Position",
            type: "number",
            placeholder: "Enter X position",
            defaultValue: 100,
            required: false
          },
          {
            key: "y",
            label: "Y Position", 
            type: "number",
            placeholder: "Enter Y position",
            defaultValue: 200,
            required: false
          }
        ],
        displayCode: `node.x = 100;
node.y = 200;`,
        codeTemplate: `{{#if x}}node.x = {{x}};{{/if}}
{{#if y}}node.y = {{y}};{{/if}}`,
        addComment: true,
        commentTemplate: "// Set node position"
      },
      {
        id: "size",
        name: "Size (Width / Height)",
        description: "Resize node",
        types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR", "TEXT"],
        inputs: [
          {
            key: "width",
            label: "Width",
            type: "number",
            placeholder: "Enter width",
            defaultValue: 200,
            required: false,
            min: 1
          },
          {
            key: "height",
            label: "Height",
            type: "number", 
            placeholder: "Enter height",
            defaultValue: 100,
            required: false,
            min: 1
          }
        ],
        displayCode: `node.resizeWithoutConstraints(200, 100);`,
        codeTemplate: `{{#if width}}{{#if height}}node.resizeWithoutConstraints({{width}}, {{height}});{{else}}node.resizeWithoutConstraints({{width}}, node.height);{{/if}}{{else}}{{#if height}}node.resizeWithoutConstraints(node.width, {{height}});{{/if}}{{/if}}`,
        addComment: true,
        commentTemplate: "// Resize node"
      },
      {
        id: "rotation",
        name: "Rotation",
        description: "Set rotation angle (degrees)",
        types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR", "TEXT", "INSTANCE", "GROUP"],
        inputs: [
          {
            key: "angle",
            label: "Rotation Angle (degrees)",
            type: "number",
            placeholder: "Enter rotation angle",
            defaultValue: 45,
            min: -360,
            max: 360,
            step: 1
          }
        ],
        displayCode: `node.rotation = 45;`,
        codeTemplate: `{{#if angle}}node.rotation = {{angle}};{{/if}}`,
        addComment: true,
        commentTemplate: "// Set rotation"
      },
      {
        id: "corner-radius",
        name: "Corner Radius",
        description: "Set unified corner radius",
        types: ["RECTANGLE", "FRAME", "COMPONENT", "INSTANCE"],
        inputs: [
          {
            key: "radius",
            label: "Corner Radius",
            type: "number",
            placeholder: "Enter corner radius",
            defaultValue: 8,
            min: 0,
            step: 1
          }
        ],
        displayCode: `node.cornerRadius = 8;`,
        codeTemplate: `{{#if radius}}node.cornerRadius = {{radius}};{{/if}}`,
        addComment: true,
        commentTemplate: "// Set corner radius"
      },
      {
        id: "individual-corner-radius",
        name: "Individual Corner Radius",
        description: "Set each corner's radius",
        types: ["RECTANGLE", "FRAME", "COMPONENT", "INSTANCE"],
        inputs: [
          {
            key: "topLeft",
            label: "Top Left Radius",
            type: "number",
            placeholder: "Enter top-left radius",
            defaultValue: 4,
            min: 0
          },
          {
            key: "topRight",
            label: "Top Right Radius",
            type: "number",
            placeholder: "Enter top-right radius",
            defaultValue: 8,
            min: 0
          },
          {
            key: "bottomRight",
            label: "Bottom Right Radius",
            type: "number",
            placeholder: "Enter bottom-right radius",
            defaultValue: 16,
            min: 0
          },
          {
            key: "bottomLeft",
            label: "Bottom Left Radius",
            type: "number",
            placeholder: "Enter bottom-left radius",
            defaultValue: 0,
            min: 0
          }
        ],
        displayCode: `node.topLeftRadius = 4;
node.topRightRadius = 8;
node.bottomRightRadius = 16;
node.bottomLeftRadius = 0;`,
        codeTemplate: `{{#if topLeft}}node.topLeftRadius = {{topLeft}};{{/if}}
{{#if topRight}}node.topRightRadius = {{topRight}};{{/if}}
{{#if bottomRight}}node.bottomRightRadius = {{bottomRight}};{{/if}}
{{#if bottomLeft}}node.bottomLeftRadius = {{bottomLeft}};{{/if}}`,
        addComment: true,
        commentTemplate: "// Set individual corner radius"
      }
    ]
  },
  {
    section: "Auto Layout",
    items: [
      {
        id: "layout-direction",
        name: "Direction (Horizontal/Vertical)",
        description: "Set auto layout direction",
        types: ["FRAME", "COMPONENT"],
        inputs: [
          {
            key: "direction",
            label: "Layout Direction",
            type: "select",
            defaultValue: "HORIZONTAL",
            options: [
              { value: "HORIZONTAL", label: "Horizontal" },
              { value: "VERTICAL", label: "Vertical" }
            ],
            required: true
          }
        ],
        displayCode: `node.layoutMode = 'HORIZONTAL';`,
        codeTemplate: `{{#if direction}}node.layoutMode = '{{direction}}';{{/if}}`,
        addComment: true,
        commentTemplate: "// Set auto layout direction"
      },
      {
        id: "item-spacing",
        name: "Item Spacing",
        description: "Set gap between children",
        types: ["FRAME", "COMPONENT"],
        inputs: [
          {
            key: "spacing",
            label: "Item Spacing",
            type: "number",
            placeholder: "Enter item spacing",
            defaultValue: 24,
            min: 0
          }
        ],
        displayCode: `node.itemSpacing = 24;`,
        codeTemplate: `{{#if spacing}}node.itemSpacing = {{spacing}};{{/if}}`,
        addComment: true,
        commentTemplate: "// Set item spacing"
      },
      {
        id: "padding",
        name: "Padding",
        description: "Set paddings",
        types: ["FRAME", "COMPONENT"],
        inputs: [
          {
            key: "left",
            label: "Left Padding",
            type: "number",
            placeholder: "Enter left padding",
            defaultValue: 16,
            min: 0
          },
          {
            key: "right",
            label: "Right Padding",
            type: "number",
            placeholder: "Enter right padding",
            defaultValue: 16,
            min: 0
          },
          {
            key: "top",
            label: "Top Padding",
            type: "number",
            placeholder: "Enter top padding",
            defaultValue: 8,
            min: 0
          },
          {
            key: "bottom",
            label: "Bottom Padding",
            type: "number",
            placeholder: "Enter bottom padding",
            defaultValue: 8,
            min: 0
          }
        ],
        displayCode: `node.paddingLeft = 16;\nnode.paddingRight = 16;\nnode.paddingTop = 8;\nnode.paddingBottom = 8;`,
        codeTemplate: `node.paddingLeft = {{left}};\nnode.paddingRight = {{right}};\nnode.paddingTop = {{top}};\nnode.paddingBottom = {{bottom}};`,
        addComment: true,
        commentTemplate: "// Set padding"
      },
      {
        id: "horizontal-resizing",
        name: "Horizontal Resizing",
        description: "Set horizontal resizing mode",
        types: ["FRAME", "COMPONENT"],
        inputs: [
          {
            key: "mode",
            label: "Horizontal Resizing Mode",
            type: "select",
            defaultValue: "FIXED",
            options: [
              { value: "FILL", label: "Fill" },
              { value: "FIXED", label: "Fixed" },
              { value: "HUG", label: "Hug" }
            ],
            required: true
          }
        ],
        displayCode: `node.layoutSizingHorizontal = "FIXED";`,
        codeTemplate: `node.layoutSizingHorizontal = "{{mode}}";`,
        addComment: true,
        commentTemplate: "// Set horizontal resizing mode"
      },
      {
        id: "vertical-resizing",
        name: "Vertical Resizing",
        description: "Set vertical resizing mode",
        types: ["FRAME", "COMPONENT"],
        inputs: [
          {
            key: "mode",
            label: "Vertical Resizing Mode",
            type: "select",
            defaultValue: "FIXED",
            options: [
              { value: "FILL", label: "Fill" },
              { value: "FIXED", label: "Fixed" },
              { value: "HUG", label: "Hug" }
            ],
            required: true
          }
        ],
        displayCode: `node.layoutSizingVertical = "FIXED";`,
        codeTemplate: `node.layoutSizingVertical = "{{mode}}";`,
        addComment: true,
        commentTemplate: "// Set vertical resizing mode"
      },
      {
        id: "primary-axis-align-items",
        name: "Primary Axis Align Items",
        description: "Align children on primary axis",
        types: ["FRAME", "COMPONENT"],
        inputs: [
          {
            key: "alignment",
            label: "Primary Axis Alignment",
            type: "select",
            defaultValue: "MIN",
            options: [
              { value: "MIN", label: "Start" },
              { value: "CENTER", label: "Center" },
              { value: "MAX", label: "End" },
              { value: "SPACE_BETWEEN", label: "Space Between" }
            ],
            required: true
          }
        ],
        displayCode: `node.primaryAxisAlignItems = 'MIN';`,
        codeTemplate: `node.primaryAxisAlignItems = '{{alignment}}';`,
        addComment: true,
        commentTemplate: "// Set primary axis alignment"
      },
      {
        id: "cross-axis-align-items",
        name: "Cross Axis Align Items",
        description: "Align children on cross axis",
        types: ["FRAME", "COMPONENT"],
        inputs: [
          {
            key: "alignment",
            label: "Cross Axis Alignment",
            type: "select",
            defaultValue: "MIN",
            options: [
              { value: "MIN", label: "Start" },
              { value: "CENTER", label: "Center" },
              { value: "MAX", label: "End" },
              { value: "BASELINE", label: "Baseline" }
            ],
            required: true
          }
        ],
        displayCode: `node.counterAxisAlignItems = 'MIN';`,
        codeTemplate: `node.counterAxisAlignItems = '{{alignment}}';`,
        addComment: true,
        commentTemplate: "// Set cross axis alignment"
      }
    ]
  },
  {
    section: "Fill & Stroke",
    items: [
      {
        id: "fill-solid",
        name: "Solid Fill",
        description: "Set a solid fill color",
        types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR", "TEXT"],
        inputs: [
          {
            key: "color",
            label: "Fill Color",
            type: "color",
            placeholder: "Enter fill color (e.g., #000000)",
            defaultValue: "#000000",
            colorFormat: "hex",
            required: true
          },
          {
            key: "opacity",
            label: "Opacity",
            type: "number",
            placeholder: "Enter opacity (0-1)",
            defaultValue: 1,
            min: 0,
            max: 1,
            step: 0.1
          }
        ],
        displayCode: `node.fills = [{ type: 'SOLID', color: convertColor('#000000'), opacity: 1 }];`,
        codeTemplate: `node.fills = [{ type: 'SOLID', color: convertColor('{{color}}'), opacity: {{opacity}} }];`,
        helpers: [
          {
            name: "convertColor",
            import: "helper-functions",
            description: "Convert hex, rgb, hsl colors to Figma RGB object"
          }
        ],
        addComment: true,
        commentTemplate: "// Set solid fill color"
      },
      {
        id: "remove-fills",
        name: "Remove All Fills",
        description: "Remove all fills",
        types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR", "TEXT"],
        inputs: [],
        displayCode: `node.fills = [];`,
        codeTemplate: `node.fills = [];`,
        addComment: true,
        commentTemplate: "// Remove all fills"
      },
      {
        id: "stroke-color-weight",
        name: "Stroke Color & Weight",
        description: "Set stroke color and weight",
        types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR", "TEXT"],
        inputs: [
          {
            key: "color",
            label: "Stroke Color",
            type: "color",
            placeholder: "Enter stroke color (e.g., #000000)",
            defaultValue: "#000000",
            colorFormat: "hex",
            required: true
          },
          {
            key: "weight",
            label: "Stroke Weight",
            type: "number",
            placeholder: "Enter stroke weight",
            defaultValue: 2,
            min: 0,
            step: 0.5
          },
          {
            key: "opacity",
            label: "Opacity",
            type: "number",
            placeholder: "Enter opacity (0-1)",
            defaultValue: 1,
            min: 0,
            max: 1,
            step: 0.1
          }
        ],
        displayCode: `node.strokes = [{ type: 'SOLID', color: convertColor('#000000'), opacity: 1 }];\nnode.strokeWeight = 2;`,
        codeTemplate: `node.strokes = [{ type: 'SOLID', color: convertColor('{{color}}'), opacity: {{opacity}} }];\nnode.strokeWeight = {{weight}};`,
        helpers: [
          {
            name: "convertColor",
            import: "helper-functions",
            description: "Convert hex, rgb, hsl colors to Figma RGB object"
          }
        ],
        addComment: true,
        commentTemplate: "// Set stroke color and weight"
      },
      {
        id: "stroke-align",
        name: "Stroke Align",
        description: "Set stroke alignment",
        types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR"],
        inputs: [
          {
            key: "align",
            label: "Stroke Alignment",
            type: "select",
            defaultValue: "CENTER",
            options: [
              { value: "CENTER", label: "Center" },
              { value: "INSIDE", label: "Inside" },
              { value: "OUTSIDE", label: "Outside" }
            ],
            required: true
          }
        ],
        displayCode: `node.strokeAlign = 'CENTER';`,
        codeTemplate: `node.strokeAlign = '{{align}}';`,
        addComment: true,
        commentTemplate: "// Set stroke alignment"
      },
      {
        id: "opacity",
        name: "Opacity",
        description: "Set opacity 0-1",
        types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR", "TEXT", "GROUP", "INSTANCE"],
        inputs: [
          {
            key: "opacity",
            label: "Opacity",
            type: "number",
            placeholder: "Enter opacity (0-1)",
            defaultValue: 0.5,
            min: 0,
            max: 1,
            step: 0.1
          }
        ],
        displayCode: `node.opacity = 0.5;`,
        codeTemplate: `node.opacity = {{opacity}};`,
        addComment: true,
        commentTemplate: "// Set opacity"
      },
      {
        id: "blend-mode",
        name: "Blend Mode",
        description: "Set blend mode",
        types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR", "TEXT", "GROUP", "INSTANCE"],
        inputs: [
          {
            key: "mode",
            label: "Blend Mode",
            type: "select",
            defaultValue: "NORMAL",
            options: [
              { value: "NORMAL", label: "Normal" },
              { value: "MULTIPLY", label: "Multiply" },
              { value: "SCREEN", label: "Screen" },
              { value: "OVERLAY", label: "Overlay" },
              { value: "DARKEN", label: "Darken" },
              { value: "LIGHTEN", label: "Lighten" },
              { value: "COLOR_DODGE", label: "Color Dodge" },
              { value: "COLOR_BURN", label: "Color Burn" },
              { value: "HARD_LIGHT", label: "Hard Light" },
              { value: "SOFT_LIGHT", label: "Soft Light" },
              { value: "DIFFERENCE", label: "Difference" },
              { value: "EXCLUSION", label: "Exclusion" },
              { value: "HUE", label: "Hue" },
              { value: "SATURATION", label: "Saturation" },
              { value: "COLOR", label: "Color" },
              { value: "LUMINOSITY", label: "Luminosity" }
            ],
            required: true
          }
        ],
        displayCode: `node.blendMode = "NORMAL";`,
        codeTemplate: `node.blendMode = "{{mode}}";`,
        addComment: true,
        commentTemplate: "// Set blend mode"
      },
      {
        id: "drop-shadow",
        name: "Drop Shadow",
        description: "Add a drop shadow effect",
        types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR"],
        inputs: [
          {
            key: "color",
            label: "Shadow Color",
            type: "color",
            placeholder: "Enter shadow color (e.g., rgba(0,0,0,0.5))",
            defaultValue: "rgba(0,0,0,0.5)",
            colorFormat: "rgb",
            required: true
          },
          {
            key: "offsetX",
            label: "Offset X",
            type: "number",
            placeholder: "Enter offset X",
            defaultValue: 0
          },
          {
            key: "offsetY",
            label: "Offset Y",
            type: "number",
            placeholder: "Enter offset Y",
            defaultValue: 0
          },
          {
            key: "radius",
            label: "Blur Radius",
            type: "number",
            placeholder: "Enter blur radius",
            defaultValue: 10,
            min: 0
          }
        ],
        displayCode: `node.effects = [{ type: 'DROP_SHADOW', blendMode: 'NORMAL', color: convertColorWithOpacity('rgba(0,0,0,0.5)'), offset: { x: 0, y: 0 }, radius: 10, visible: true }];`,
        codeTemplate: `node.effects = [{ type: 'DROP_SHADOW', blendMode: 'NORMAL', color: convertColorWithOpacity('{{color}}'), offset: { x: {{offsetX}}, y: {{offsetY}} }, radius: {{radius}}, visible: true }];`,
        helpers: [
          {
            name: "convertColorWithOpacity",
            import: "helper-functions",
            description: "Convert colors with opacity to Figma RGB object"
          }
        ],
        addComment: true,
        commentTemplate: "// Add drop shadow effect"
      },
      {
        id: "layer-blur",
        name: "Layer Blur",
        description: "Add a layer blur effect",
        types: ["FRAME", "RECTANGLE", "ELLIPSE", "VECTOR"],
        inputs: [
          {
            key: "radius",
            label: "Blur Radius",
            type: "number",
            placeholder: "Enter blur radius",
            defaultValue: 10,
            min: 0
          }
        ],
        displayCode: `node.effects = [{ type: 'LAYER_BLUR', radius: 10, visible: true }];`,
        codeTemplate: `node.effects = [{ type: 'LAYER_BLUR', radius: {{radius}}, visible: true }];`,
        addComment: true,
        commentTemplate: "// Add layer blur effect"
      }
    ]
  },
  {
    section: "Text",
    items: [
      {
        id: "replace-text",
        name: "Replace Text",
        description: "Change the text content",
        types: ["TEXT"],
        inputs: [
          {
            key: "content",
            label: "Text Content",
            type: "text",
            placeholder: "Enter new text content",
            defaultValue: "New Content",
            required: true
          }
        ],
        displayCode: `node.characters = "New Content";`,
        codeTemplate: `node.characters = "{{content}}";`,
        addComment: true,
        commentTemplate: "// Replace text content"
      },
      {
        id: "font-size",
        name: "Font Size",
        description: "Set font size",
        types: ["TEXT"],
        inputs: [
          {
            key: "size",
            label: "Font Size",
            type: "number",
            placeholder: "Enter font size",
            defaultValue: 16,
            min: 1
          }
        ],
        displayCode: `node.fontSize = 16;`,
        codeTemplate: `node.fontSize = {{size}};`,
        addComment: true,
        commentTemplate: "// Set font size"
      },
      {
        id: "font-weight",
        name: "Font Weight",
        description: "Set font weight (style)",
        types: ["TEXT"],
        inputs: [
          {
            key: "family",
            label: "Font Family",
            type: "text",
            placeholder: "Enter font family (e.g., Inter)",
            defaultValue: "Inter",
            required: true
          },
          {
            key: "style",
            label: "Font Style",
            type: "select",
            defaultValue: "Regular",
            options: [
              { value: "Regular", label: "Regular" },
              { value: "Bold", label: "Bold" },
              { value: "Italic", label: "Italic" },
              { value: "Bold Italic", label: "Bold Italic" },
              { value: "Light", label: "Light" },
              { value: "Medium", label: "Medium" },
              { value: "SemiBold", label: "SemiBold" },
              { value: "ExtraBold", label: "ExtraBold" },
              { value: "Black", label: "Black" }
            ],
            required: true
          }
        ],
        displayCode: `node.fontName = { family: "Inter", style: "Bold" };`,
        codeTemplate: `node.fontName = { family: "{{family}}", style: "{{style}}" };`,
        addComment: true,
        commentTemplate: "// Set font family and style"
      },
      {
        id: "line-height",
        name: "Line Height",
        description: "Set line height",
        types: ["TEXT"],
        inputs: [
          {
            key: "unit",
            label: "Line Height Unit",
            type: "select",
            defaultValue: "PIXELS",
            options: [
              { value: "PIXELS", label: "Pixels" },
              { value: "PERCENT", label: "Percentage" },
              { value: "AUTO", label: "Auto" }
            ],
            required: true
          },
          {
            key: "value",
            label: "Line Height Value",
            type: "number",
            placeholder: "Enter line height value",
            defaultValue: 24,
            min: 0
          }
        ],
        displayCode: `node.lineHeight = { unit: "PIXELS", value: 24 };`,
        codeTemplate: `node.lineHeight = { unit: "{{unit}}", value: {{value}} };`,
        addComment: true,
        commentTemplate: "// Set line height"
      },
      {
        id: "text-fill",
        name: "Text Fill Color",
        description: "Set text color",
        types: ["TEXT"],
        inputs: [
          {
            key: "color",
            label: "Text Color",
            type: "color",
            placeholder: "Enter text color (e.g., #000000)",
            defaultValue: "#000000",
            colorFormat: "hex",
            required: true
          },
          {
            key: "opacity",
            label: "Opacity",
            type: "number",
            placeholder: "Enter opacity (0-1)",
            defaultValue: 1,
            min: 0,
            max: 1,
            step: 0.1
          }
        ],
        displayCode: `node.fills = [{ type: 'SOLID', color: convertColor('#000000'), opacity: 1 }];`,
        codeTemplate: `node.fills = [{ type: 'SOLID', color: convertColor('{{color}}'), opacity: {{opacity}} }];`,
        helpers: [
          {
            name: "convertColor",
            import: "helper-functions",
            description: "Convert hex, rgb, hsl colors to Figma RGB object"
          }
        ],
        addComment: true,
        commentTemplate: "// Set text color"
      },
      {
        id: "complex-text-styling",
        name: "Complex Text Styling",
        description: "Apply multiple text properties with font loading",
        types: ["TEXT"],
        inputs: [
          {
            key: "content",
            label: "Text Content",
            type: "text",
            placeholder: "Enter text content",
            defaultValue: "Hello World",
            required: true
          },
          {
            key: "fontFamily",
            label: "Font Family",
            type: "text",
            placeholder: "Enter font family (e.g., Inter)",
            defaultValue: "Inter",
            required: true
          },
          {
            key: "fontStyle",
            label: "Font Style",
            type: "select",
            defaultValue: "Regular",
            options: [
              { value: "Regular", label: "Regular" },
              { value: "Bold", label: "Bold" },
              { value: "Italic", label: "Italic" },
              { value: "Medium", label: "Medium" },
              { value: "SemiBold", label: "SemiBold" }
            ],
            required: true
          },
          {
            key: "fontSize",
            label: "Font Size",
            type: "number",
            placeholder: "Enter font size",
            defaultValue: 16,
            min: 8,
            max: 200,
            step: 1
          },
          {
            key: "color",
            label: "Text Color",
            type: "color",
            placeholder: "Enter text color (e.g., #000000)",
            defaultValue: "#000000",
            colorFormat: "hex"
          },
          {
            key: "lineHeight",
            label: "Line Height (px)",
            type: "number",
            placeholder: "Enter line height (px)",
            defaultValue: 24,
            min: 0
          }
        ],
        displayCode: `// Load fonts first
await loadFonts([node]);

// Apply text styling
node.characters = "Hello World";
node.fontName = { family: "Inter", style: "Bold" };
node.fontSize = 16;
node.lineHeight = { unit: "PIXELS", value: 24 };
node.fills = [{ type: 'SOLID', color: convertColor('#000000'), opacity: 1 }];`,
        codeTemplate: `// Load fonts first
await loadFonts([node]);

// Apply text styling
node.characters = "{{content}}";
node.fontName = { family: "{{fontFamily}}", style: "{{fontStyle}}" };
node.fontSize = {{fontSize}};
node.lineHeight = { unit: "PIXELS", value: {{lineHeight}} };
node.fills = [{ type: 'SOLID', color: convertColor('{{color}}'), opacity: 1 }];`,
        helpers: [
          {
            name: "loadFonts",
            import: "helper-functions",
            description: "Load fonts for text nodes"
          },
          {
            name: "convertColor",
            import: "helper-functions",
            description: "Convert hex, rgb, hsl colors to Figma RGB object"
          }
        ],
        addComment: true,
        commentTemplate: "// Apply complex text styling with font loading"
      }
    ]
  }
];

// 为了向后兼容，保留旧的简单格式
export const CATALOG_LEGACY = [
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

