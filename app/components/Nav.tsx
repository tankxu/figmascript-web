import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold">
          Figma&nbsp;Script
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="#api" className="hover:underline">
            Friendly&nbsp;API
          </Link>
          <Link
            to="https://tally.so/r/PLACEHOLDER"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Custom&nbsp;Script&nbsp;Service
          </Link>
          <Button size="sm" variant="outline" asChild>
            <Link to="#api">Get&nbsp;Started</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}