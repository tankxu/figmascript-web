# FigmaScript Web

A web application for generating Figma scripts with a user-friendly interface.

## Features

- **Code Generator**: Generate Figma scripts with variable inputs
- **Task Builder**: Build complex scripts by combining multiple operations
- **Drag & Drop**: Reorder tasks in the script builder
- **Multiple Input Types**: Support for text, number, select, color, and boolean inputs
- **Conditional Code Generation**: Only generate code for filled fields
- **Helper Functions**: Automatic inclusion of required helper functions
- **Real-time Preview**: See generated code as you type
- **Runnable Template**: Automatically wraps code in executable template

## Code Generator Structure

The application uses a flexible data structure to define code generators in `app/figma-scripts-content/figma-scripts.ts`:

### Input Field Types

```typescript
interface InputField {
  key: string;                    // Variable name in template
  label: string;                  // Display label
  type: 'text' | 'number' | 'select' | 'color' | 'boolean';
  placeholder?: string;           // Input placeholder
  defaultValue?: string | number | boolean;
  required?: boolean;             // Required field (usually false for conditional generation)
  
  // For select type
  options?: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  
  // For number type
  min?: number;
  max?: number;
  step?: number;
  
  // For color type
  colorFormat?: 'hex' | 'rgb' | 'hsl';
}
```

### Code Generator Definition

```typescript
interface CodeGenerator {
  id: string;                     // Unique identifier
  name: string;                   // Display name
  description: string;            // Description
  types: string[];                // Supported layer types
  
  inputs: InputField[];           // Input fields
  displayCode: string;            // Code to display (for preview)
  codeTemplate: string;           // Code template with conditional logic
  
  helpers?: HelperDependency[];   // Required helper functions
  addComment?: boolean;           // Add comment before code
  commentTemplate?: string;       // Comment template
}
```

### Conditional Code Generation

The template engine supports conditional code generation using `{{#if variable}}...{{/if}}` syntax:

```typescript
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
      placeholder: "100",
      defaultValue: 100,
      required: false  // Not required - can be skipped
    },
    {
      key: "y",
      label: "Y Position", 
      type: "number",
      placeholder: "200",
      defaultValue: 200,
      required: false  // Not required - can be skipped
    }
  ],
  displayCode: `node.x = 100;
node.y = 200;`,
  codeTemplate: `{{#if x}}node.x = {{x}};{{/if}}{{#if y}}{{#if x}}
{{/if}}node.y = {{y}};{{/if}}`,
  addComment: true,
  commentTemplate: "// Set node position"
}
```

### Complex Example with Multiple Inputs

```typescript
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
      placeholder: "Hello World",
      defaultValue: "Hello World",
      required: true
    },
    {
      key: "fontFamily",
      label: "Font Family",
      type: "text",
      placeholder: "Inter",
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
        { value: "Italic", label: "Italic" }
      ],
      required: true
    },
    {
      key: "fontSize",
      label: "Font Size",
      type: "number",
      placeholder: "16",
      defaultValue: 16,
      min: 8,
      max: 200,
      step: 1
    },
    {
      key: "color",
      label: "Text Color",
      type: "color",
      placeholder: "#000000",
      defaultValue: "#000000",
      colorFormat: "hex"
    }
  ],
  displayCode: `// Load fonts first
await loadFonts([node]);

// Apply text styling
node.characters = "Hello World";
node.fontName = { family: "Inter", style: "Regular" };
node.fontSize = 16;
node.fills = [{ type: 'SOLID', color: convertColor('#000000'), opacity: 1 }];`,
  codeTemplate: `// Load fonts first
await loadFonts([node]);

// Apply text styling
{{#if content}}node.characters = "{{content}}";{{/if}}
{{#if fontFamily}}{{#if fontStyle}}node.fontName = { family: "{{fontFamily}}", style: "{{fontStyle}}" };{{/if}}{{/if}}
{{#if fontSize}}node.fontSize = {{fontSize}};{{/if}}
{{#if color}}node.fills = [{ type: 'SOLID', color: convertColor('{{color}}'), opacity: 1 }];{{/if}}`,
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
```

## Template Engine

The application includes a simple template engine that supports:

- **Variable replacement**: `{{variable}}` → replaced with user input
- **Conditional blocks**: `{{#if variable}}...{{/if}}` → only included if variable has a value
- **Nested conditions**: Support for complex conditional logic
- **Automatic cleanup**: Removes empty lines and trims whitespace

## Helper Functions

The application automatically includes required helper functions when generating code. Available helpers:

- `convertColor()`: Convert hex, rgb, hsl colors to Figma RGB object
- `convertColorWithOpacity()`: Convert colors with opacity to Figma RGB object
- `loadFonts()`: Load fonts for text nodes

## Runnable Template

All generated code is automatically wrapped in the standard Figma script template:

```javascript
const selection = figma.currentPage.selection;
for (const node of selection) {
  // Generated code goes here
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Technologies Used

- React + TypeScript
- Remix
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Shiki (code highlighting)
