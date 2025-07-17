import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet";
import { Input } from "~/components/ui/input";
import { useTaskList } from "~/context/TaskListContext";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <code className="text-xs">{renderedSnippet}</code>
      </CardContent>
      <CardFooter className="flex gap-2">
        {/* Copy full script */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" variant="secondary">
              Copy&nbsp;full&nbsp;script
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[360px]">
            <SheetHeader>
              <SheetTitle>{name}</SheetTitle>
            </SheetHeader>

            <div className="space-y-4 py-4">
              {vars.map((v) => (
                <Input
                  key={v.key}
                  type={v.type}
                  placeholder={v.label}
                  value={values[v.key]}
                  onChange={(e) =>
                    setValues({ ...values, [v.key]: e.target.value })
                  }
                />
              ))}

              {/* -- ad slot placeholder -- */}
              <div className="h-16 w-full rounded-md bg-muted text-center text-sm leading-[3.5rem]">
                [Ad]
              </div>

              <pre className="max-h-64 overflow-auto rounded-md bg-muted p-4 text-xs">
{renderedTemplate}
              </pre>
            </div>

            <SheetFooter>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(renderedTemplate);
                }}
              >
                Copy&nbsp;to&nbsp;clipboard
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Add to list */}
        <Button size="sm" variant="outline" onClick={addToList}>
          Add&nbsp;to&nbsp;tasks
        </Button>
      </CardFooter>
    </Card>
  );
}