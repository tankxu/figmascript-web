import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger } from "~/components/ui/sheet";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useTaskList } from "~/context/TaskListContext";
import { GripVertical, ClipboardList, X, Code, Copy, Sparkles } from "lucide-react";
import { motion, Reorder } from "framer-motion";
import { type InputField } from "~/figma-scripts-content/figma-scripts";
import { convertColor, convertColorWithOpacity, loadFonts } from "~/figma-scripts-content/helper-functions";
import { renderTemplate } from "~/lib/utils";
import { toast } from "sonner";

export function ScriptBuilderFAB() {
  const [tasks, dispatch] = useTaskList();
  const [generatedCode, setGeneratedCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const count = tasks.length;

  /* merge templates by simply concatenating (and replacing vars) */
  function generateMerged() {
    const codeParts = tasks
      .map((t) => {
        let code = renderTemplate(t.template, t.vars);
        if (code.trim()) {
          return code;
        }
        return null;
      })
      .filter(Boolean);
    
    return codeParts.join("\n\n");
  }

  function handleGenerate() {
    const merged = generateMerged();
    if (merged.trim()) {
      const runnableTemplate = `const selection = figma.currentPage.selection;
for (const node of selection) {
  ${merged}
}`;
      setGeneratedCode(runnableTemplate);
      setShowCode(true);
    } else {
      setGeneratedCode("");
      setShowCode(false);
    }
  }

  function handleRemoveTask(id: string) {
    dispatch({ type: "remove", id });
  }

  function handleUpdateVars(id: string, vars: Record<string, string>) {
    dispatch({ type: "updateVars", id, vars });
  }

  function renderInputField(field: InputField, value: string, onChange: (value: string) => void) {
    switch (field.type) {
      case 'text':
        return (
          <Input
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            className="text-sm"
          />
        );
      
      case 'number':
        return (
          <Input
            type="number"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            min={field.min}
            max={field.max}
            step={field.step}
            required={field.required}
            className="text-sm"
          />
        );
      
      case 'select':
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
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
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              required={field.required}
              className="text-sm flex-1"
            />
          </div>
        );
      
      case 'boolean':
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
        );
      
      default:
        return (
          <Input
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="text-sm"
          />
        );
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="group fixed bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 z-50">
          <ClipboardList className="h-6 w-6 transition-transform group-hover:scale-110" />
          {count > 0 && (
            <Badge className="absolute -right-2 -top-2 h-6 w-6 justify-center rounded-full p-0 text-xs bg-orange-500 hover:bg-orange-600 animate-pulse">
              {count}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[480px] p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <SheetTitle className="text-xl">Script Builder</SheetTitle>
              <p className="text-sm text-muted-foreground">{count} tasks queued</p>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[50vh] px-6 py-4">
            {count > 0 ? (
              <Reorder.Group axis="y" values={tasks} onReorder={(newOrder) => {
                // Find the moved item and its new position
                const movedItem = newOrder.find((item, index) => 
                  tasks.findIndex(t => t.id === item.id) !== index
                );
                if (movedItem) {
                  const oldIndex = tasks.findIndex(t => t.id === movedItem.id);
                  const newIndex = newOrder.findIndex(t => t.id === movedItem.id);
                  dispatch({ type: "reorder", from: oldIndex, to: newIndex });
                }
              }}>
                <div className="space-y-3">
                  {tasks.map((task, index) => (
                    <Reorder.Item key={task.id} value={task} as="div">
                      <motion.div
                        layout
                        className="group flex items-center gap-3 p-4 rounded-xl border-2 border-gray-100 bg-white hover:border-blue-200 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex-shrink-0 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center text-xs font-medium text-blue-800">
                            {index + 1}
                          </span>
                          <GripVertical className="h-4 w-4 cursor-move text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="flex-1 text-sm font-medium text-gray-900">
                          {task.name}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveTask(task.id)}
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </Reorder.Item>
                  ))}
                </div>
              </Reorder.Group>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <ClipboardList className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
                <p className="text-sm text-gray-500">
                  Use "Add to tasks" on any property to get started
                </p>
              </div>
            )}
          </ScrollArea>

          {/* Variable Input Form */}
          {count > 0 && (
            <div className="border-t bg-gray-50/50 px-6 py-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-900">Configure Variables</h3>
                  {tasks.some(task => Object.keys(task.vars).length > 1) && (
                    <Badge variant="secondary" className="text-xs">
                      Optional fields
                    </Badge>
                  )}
                </div>
                
                {tasks.some(task => Object.keys(task.vars).length > 1) && (
                  <p className="text-xs text-gray-600">
                    Leave fields empty to skip those properties
                  </p>
                )}
                
                <div className="space-y-6">
                  {tasks.map((task) => (
                    <div key={task.id} className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-blue-100 flex items-center justify-center text-xs text-blue-700">
                          {tasks.indexOf(task) + 1}
                        </span>
                        {task.name}
                      </h4>
                      <div className="space-y-3 pl-6">
                        {Object.entries(task.vars).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <label className="text-xs font-medium text-gray-600 capitalize">
                              {key}
                            </label>
                            <Input
                              placeholder={`Enter ${key}...`}
                              value={value}
                              onChange={(e) => {
                                const newVars = { ...task.vars, [key]: e.target.value };
                                handleUpdateVars(task.id, newVars);
                              }}
                              className="text-sm h-9"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Generated Code Display */}
          {showCode && generatedCode && (
            <div className="border-t bg-blue-50/30 px-6 py-4">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Generated Script
                </h3>
                <div className="bg-white rounded-lg border overflow-hidden">
                  <pre className="max-h-32 overflow-auto p-4 text-xs font-mono text-gray-800">
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
            </div>
          )}
        </div>

        <SheetFooter className="p-6 border-t bg-white">
          <Button
            disabled={count === 0}
            onClick={handleGenerate}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Script
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}