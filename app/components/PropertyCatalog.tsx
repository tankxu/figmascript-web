import React, { useMemo, useState } from "react";
import { PropertyCard } from "~/components/PropertyCard";
import { LayerChips } from "~/components/LayerChips";
import { CodeBlock } from "~/components/CodeBlock";
import { CATALOG } from "~/figma-scripts-content/figma-scripts";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";

export function PropertyCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const filteredCatalog = useMemo(() => {
    return CATALOG.map(section => ({
      ...section,
      items: section.items.filter(item => {
        const matchesSearch = searchQuery === "" || 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesType = selectedTypes.length === 0 || 
          item.types.some(type => selectedTypes.includes(type));
        
        return matchesSearch && matchesType;
      })
    })).filter(section => section.items.length > 0);
  }, [searchQuery, selectedTypes]);

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const allTypes = [...new Set(CATALOG.flatMap(section => 
    section.items.flatMap(item => item.types)
  ))];

  return (
    <section id="api" className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Friendly API Documentation
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Figma's official API is not user-friendly for designers. This site provides an easier way 
            to understand and use the Figma API, letting anyone generate fully runnable code with simple UI. 
            Every designer can use Figma scripts.
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {allTypes.map(type => (
              <Badge
                key={type}
                variant={selectedTypes.includes(type) ? "default" : "secondary"}
                className="cursor-pointer transition-colors"
                onClick={() => {
                  setSelectedTypes(prev => 
                    prev.includes(type) 
                      ? prev.filter(t => t !== type)
                      : [...prev, type]
                  );
                }}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {/* Layer Types Overview */}
        <div className="mb-16 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">🏗️</span>
            Layer Types Overview
          </h3>
          <p className="text-gray-600 mb-6">
            Each property in Figma can only be applied to certain layer types. Below is a quick overview 
            of common layer types. You need to select the correct type(s) for your script to work as expected.
          </p>
          <LayerChips />
        </div>

        {/* Layer Properties */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            Layer Properties
          </h3>
          <p className="text-gray-600 mb-8">
            Here are the most common Figma layer properties, grouped by category. Each code snippet changes 
            one property of a selected node. Use the code generator below to build a complete runnable script.
          </p>
        </div>

        {/* Properties by category */}
        <div className="space-y-8">
          {filteredCatalog.map((group) => {
            const isExpanded = expandedSections[group.section] !== false; // Default to expanded
            const itemCount = group.items.length;
            
            return (
              <div key={group.section} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection(group.section)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h4 className="text-xl font-bold text-gray-900">{group.section}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {itemCount} properties
                      </Badge>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="border-t border-gray-100 p-6 bg-gray-50/30">
                    <div className="grid gap-6 lg:grid-cols-2">
                      {group.items.map((item) => {
                        const defaultVars = Object.fromEntries(
                          item.inputs.map(input => [
                            input.key, 
                            input.defaultValue?.toString() || ""
                          ])
                        );
                        
                        return (
                          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="space-y-4">
                              <div>
                                <h5 className="font-semibold text-lg text-gray-900 mb-2">{item.name}</h5>
                                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {item.types.map((t) => (
                                    <Badge key={t} variant="outline" className="text-xs">
                                      {t}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="bg-gray-50 rounded-lg overflow-hidden border">
                                <CodeBlock code={item.displayCode} />
                              </div>
                              
                              <PropertyCard
                                id={item.id}
                                name={item.name}
                                vars={item.inputs.map(input => ({
                                  key: input.key,
                                  label: input.label,
                                  type: input.type,
                                  default: input.defaultValue?.toString() || ""
                                }))}
                                snippet={item.displayCode}
                                template={item.codeTemplate}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredCatalog.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}