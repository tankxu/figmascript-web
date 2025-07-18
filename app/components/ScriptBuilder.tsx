import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger } from "~/components/ui/sheet";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Badge } from "~/components/ui/badge";
import { useTaskList } from "~/context/TaskListContext";
import { GripVertical, ClipboardList } from "lucide-react";


export function ScriptBuilderFAB() {
  const [tasks] = useTaskList();
  const count = tasks.length;

  /* merge templates by simply concatenating (and replacing vars) */
  function generateMerged() {
    return tasks
      .map((t) => {
        let code = t.template;
        Object.entries(t.vars).forEach(([k, v]) => {
          code = code.replaceAll(`{{${k}}}`, v as string);
        });
        return code;
      })
      .join("\n\n");
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg">
        <ClipboardList className="h-5 w-5 opacity-75" />
          {count > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 w-5 justify-center rounded-full p-0 text-[11px]">
              {count}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[380px]">
        <SheetHeader>
          <SheetTitle>Task List ({count})</SheetTitle>
        </SheetHeader>

        <ScrollArea className="my-4 h-[55vh]">
          <ol className="space-y-2">
            {tasks.map((t, idx) => (
              <li key={t.id} className="flex items-center gap-2">
                <GripVertical className="mr-1 h-4 w-4 cursor-move text-muted-foreground" />
                <span className="flex-1 rounded-full bg-muted px-3 py-1 text-sm">
                  {t.name}
                </span>
              </li>
            ))}
            {count === 0 && (
              <p className="text-sm text-muted-foreground">
                No tasks yet. Use “Add to tasks” on any property.
              </p>
            )}
          </ol>
        </ScrollArea>

        {/* -- ad slot placeholder -- */}
        <div className="h-16 w-full rounded-md bg-muted text-center text-sm leading-[3.5rem]">
          [Ad]
        </div>

        <SheetFooter>
          <Button
            disabled={count === 0}
            onClick={() => {
              const merged = generateMerged();
              navigator.clipboard.writeText(merged);
            }}
          >
            Copy&nbsp;merged&nbsp;script
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}