import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-white font-bold text-sm">FS</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Figma Script
          </span>
        </Link>
        
        <nav className="flex items-center gap-8 text-sm">
          <Link 
            to="/#api" 
            className="hidden sm:block font-medium text-gray-600 hover:text-blue-600 transition-colors relative group"
          >
            Friendly API
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
          </Link>
          <Link
            to="/custom-script"
            className="font-medium text-gray-600 hover:text-purple-600 transition-colors relative group"
          >
            Custom Service
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full" />
          </Link>
          <Button size="sm" variant="outline" className="hidden sm:flex border-blue-200 text-blue-600 hover:bg-blue-50" asChild>
            <Link to="/#api">Get Started</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}