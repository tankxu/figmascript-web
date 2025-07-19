import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet";
import { Input } from "~/components/ui/input";
import { useTaskList } from "~/context/TaskListContext";
import { Code, Plus, Copy, Sparkles } from "lucide-react";

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
}

export function PropertyCard({ id, name, vars, snippet, template }: PropertyCardProps) {
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

  const renderedTemplate = vars.reduce(
    (acc, v) => acc.replaceAll(`{{${v.key}}}`, values[v.key]),
    template,
  );

  function addToList() {
    dispatch({
      type: "add",
      item: { id, name, template, vars: values },
    });
  }

  function handleGenerate() {
    setGeneratedCode(renderedTemplate);
    setShowCode(true);
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

          <div className="flex-1 p-6 space-y-6">
            {vars.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">Configure Parameters</h3>
                <div className="space-y-4">
                  {vars.map((v) => (
                    <div key={v.key} className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {v.label}
                      </label>
                      <Input
                        type={v.type}
                        placeholder={v.label}
                        value={values[v.key]}
                        onChange={(e) =>
                          setValues({ ...values, [v.key]: e.target.value })
                        }
                        className="transition-colors focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Button onClick={handleGenerate} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Code
              </Button>

              {showCode && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900">Generated Script</h4>
                  <div className="bg-gray-50 rounded-lg border overflow-hidden">
                    <pre className="max-h-48 overflow-auto p-4 text-xs font-mono text-gray-800">
                      {generatedCode}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          <SheetFooter className="p-6 border-t bg-white">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(renderedTemplate);
              }}
              className="w-full"
              variant="outline"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy to clipboard
            </Button>
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