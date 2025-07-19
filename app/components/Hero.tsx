import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center gap-8 px-4 pt-8 pb-16 text-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-1/4 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-blue-200/50 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          No programming knowledge required
        </div>
        
        <h1 className="text-balance text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
          Generate{" "}
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Figma scripts
          </span>{" "}
          effortlessly
        </h1>
        
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          Readable API docs and one-click generators that super-charge your design workflow. 
          Build powerful automation scripts with simple clicks—no coding experience needed.
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button size="lg" className="group relative overflow-hidden" asChild>
            <Link to="#api" className="relative z-10">
              <span className="mr-2">Start exploring</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" className="group" asChild>
            <Link to="/custom-script">
              <span className="mr-2">Custom Service</span>
              <span className="transition-transform group-hover:scale-110">✨</span>
            </Link>
          </Button>
        </div>
        
        {/* Stats or features */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">50+</div>
            <div className="text-sm text-gray-600">API Properties</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">1-Click</div>
            <div className="text-sm text-gray-600">Code Generation</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">AI-Ready</div>
            <div className="text-sm text-gray-600">Script Format</div>
          </div>
        </div>
      </div>
    </section>
  );
}