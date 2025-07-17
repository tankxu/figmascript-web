import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export function Hero() {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="max-w-3xl text-balance text-4xl font-extrabold sm:text-5xl">
        Generate&nbsp;Figma&nbsp;scripts effortlessly.
      </h1>
      <p className="max-w-xl text-muted-foreground">
        Readable API docs and one-click generators that super-charge your design
        workflow—no TypeScript knowledge required.
      </p>
      <Button size="lg" asChild>
        <Link to="#api">Start exploring ↓</Link>
      </Button>
    </section>
  );
}