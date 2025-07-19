import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useTaskList } from "~/context/TaskListContext";
import { Code, Plus, Copy, Sparkles } from "lucide-react";
import { type CodeGenerator, type InputField } from "~/figma-scripts-content/figma-scripts";
import { convertColor, convertColorWithOpacity, loadFonts } from "~/figma-scripts-content/helper-functions";
import { renderTemplate } from "~/lib/utils";
import { toast } from "sonner";

interface VarDef {
  key: string;
  label: string;
  type: string;
  default: string;
}

export interface PropertyCardProps {
  id: string;
  name: string;
  vars: VarDef[];
  snippet: string;
  template: string;
  // 添加这些属性以支持完整的代码生成
  helpers?: Array<{
    name: string;
    import: string;
    description: string;
  }>;
  addComment?: boolean;
  commentTemplate?: string;
}

export function PropertyCard({ 
  id, 
  name, 
  vars, 
  snippet, 
  template,
  helpers,
  addComment,
  commentTemplate
}: PropertyCardProps) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(vars.map((v) => [v.key, v.default])),
  );
  const [generatedCode, setGeneratedCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [queue, dispatch] = useTaskList();

  const renderedSnippet = vars.reduce(
    (acc, v) => acc.replaceAll(`{{${v.key}}}`, values[v.key]),
    snippet,
  );

  function addToList() {
    dispatch({
      type: "add",
      item: { id, name, template, vars: values },
    });
  }

  function handleGenerateCode() {
    // 使用模板引擎生成代码
    let generated = renderTemplate(template, values);
    
    // 如果没有生成任何代码，返回空字符串
    if (!generated.trim()) {
      setGeneratedCode("");
      setShowCode(false);
      return;
    }

    // 添加注释
    if (addComment && commentTemplate) {
      generated = `${commentTemplate}\n${generated}`;
    }

    // 添加 helper 函数导入
    if (helpers && helpers.length > 0) {
      const helperImports = helpers.map(helper => 
        `// ${helper.description}\n${helper.import === 'helper-functions' ? 
          (helper.name === 'convertColor' ? convertColor : 
           helper.name === 'convertColorWithOpacity' ? convertColorWithOpacity : 
           helper.name === 'loadFonts' ? loadFonts : '') : ''}`
      ).join('\n\n');
      generated = `${helperImports}\n\n${generated}`;
    }

    // 套入 Runnable Template
    const runnableTemplate = `const selection = figma.currentPage.selection;
for (const node of selection) {
  ${generated}
}`;

    setGeneratedCode(runnableTemplate);
    setShowCode(true);
  }

  // 检查是否有有效的输入
  function hasValidInputs(): boolean {
    // 如果没有输入字段，总是允许生成
    if (vars.length === 0) {
      return true;
    }
    
    // 检查是否有至少一个非空输入
    return vars.some(v => {
      const value = values[v.key];
      return value && value.trim() !== '';
    });
  }

  function renderInputField(field: VarDef, value: string, onChange: (value: string) => void) {
    switch (field.type) {
      case 'text':
        return (
          <Input
            placeholder={field.label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="transition-colors focus:border-blue-500 focus:ring-blue-500"
          />
        );
      
      case 'number':
        return (
          <Input
            type="number"
            placeholder={field.label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="transition-colors focus:border-blue-500 focus:ring-blue-500"
          />
        );
      
      case 'select':
        // 注意：这里需要预定义选项，因为简化的VarDef接口没有options
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder={field.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HORIZONTAL">Horizontal</SelectItem>
              <SelectItem value="VERTICAL">Vertical</SelectItem>
              <SelectItem value="Regular">Regular</SelectItem>
              <SelectItem value="Bold">Bold</SelectItem>
              <SelectItem value="Italic">Italic</SelectItem>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
        );
      
      case 'color':
        return (
          <div className="flex gap-2">
            <Input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-12 h-10 p-1 border-2"
            />
            <Input
              placeholder={field.label}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="text-sm flex-1 transition-colors focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        );
      
      default:
        return (
          <Input
            placeholder={field.label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="transition-colors focus:border-blue-500 focus:ring-blue-500"
          />
        );
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {/* Copy full script */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:border-blue-200">
            <Code className="h-4 w-4 mr-2" />
            Copy script
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[420px] p-0 flex flex-col">
          <SheetHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                <Code className="h-4 w-4 text-white" />
              </div>
              <SheetTitle className="text-lg">{name}</SheetTitle>
            </div>
          </SheetHeader>

          <div className="flex-1 pt-2 pb-6 px-6 space-y-6">
            {vars.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">Configure Parameters</h3>
                {vars.length > 1 && (
                  <p className="text-xs text-gray-600 mt-[-10px]">
                    Leave fields empty to skip those properties
                  </p>
                )}
                <div className="space-y-4">
                  {vars.map((v) => (
                    <div key={v.key} className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {v.label}
                      </label>
                      {renderInputField(
                        v,
                        values[v.key],
                        (value) => setValues({ ...values, [v.key]: value })
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Helper Functions Info */}
            {helpers && helpers.length > 0 && (
              <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Required Helper Functions</h4>
                {helpers.map((helper, index) => (
                  <div key={index} className="text-xs text-blue-700">
                    • {helper.description}
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3">
              <Button 
                onClick={handleGenerateCode} 
                disabled={!hasValidInputs()}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Code
              </Button>

              {showCode && generatedCode && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900">Generated Script</h4>
                  <div className="bg-gray-50 rounded-lg border overflow-hidden">
                    <pre className="max-h-48 overflow-auto p-4 text-xs font-mono text-gray-800">
                      {generatedCode}
                    </pre>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      navigator.clipboard.writeText(generatedCode);
                      toast.success("Copied to clipboard!")
                    }}
                    className="w-full"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy to clipboard
                  </Button>
                </div>
              )}
            </div>
          </div>

          <SheetFooter className="p-6 border-t bg-white">
            <p className="text-xs text-gray-600 text-center py-6">AD</p>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Add to tasks */}
      <Button size="sm" variant="outline" onClick={addToList} className="hover:bg-green-50 hover:border-green-200">
        <Plus className="h-4 w-4 mr-2" />
        Add to tasks
      </Button>
    </div>
  );
}