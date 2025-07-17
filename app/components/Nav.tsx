import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold">
          Figma Script
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="#api" className="hover:text-primary sm:block hidden">
            Friendly API
          </Link>
          <Link
            to="mailto:tankxuu@gmail.com"
            className="hover:text-primary"
          >
            Custom Script Service
          </Link>
          {/* <Button size="sm" variant="outline" asChild>
            <Link to="#api">Get Started</Link>
          </Button> */}
        </nav>
      </div>
    </header>
  );
}