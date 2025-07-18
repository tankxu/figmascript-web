import { Badge } from "~/components/ui/badge";

const types = [
  "FRAME",
  "RECTANGLE",
  "ELLIPSE",
  "TEXT",
  "INSTANCE",
  "GROUP",
  "VECTOR",
];

export function LayerChips() {
  return (
    <div className="flex flex-wrap gap-2">
      {types.map((t) => (
        <Badge key={t} variant="secondary" className="bg-sky-100 text-sky-800">
          {t}
        </Badge>
      ))}
    </div>
  );
}