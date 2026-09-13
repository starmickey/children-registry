"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft as ArrowLeft, Search } from "lucide-react";
import { useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function ChildrenSearchInput({
  className = "",
}: {
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const defaultSearchString = searchParams.get("q")?.toString();

  const expanded = defaultSearchString != null;

  const [searchString, setSearchString] = useState<string>(
    defaultSearchString ?? "",
  );

  function handleSearchButtonClick() {
    const params = new URLSearchParams(searchParams);
    params.set("q", "");
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleReturnButtonClick() {
    const params = new URLSearchParams(searchParams);

    params.delete("q");
    params.delete("ya"); // if enabled, quit filter that shows other years data

    setSearchString("");

    // ADD THIS LINE: Apply the changes to the URL
    router.replace(`${pathname}?${params.toString()}`);
  }

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("q", term);
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className={`flex ${className}`}>
      {expanded ? (
        <>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={handleReturnButtonClick}
          >
            <ArrowLeft />
          </Button>
          <Input
            placeholder="Ingrese un nombre"
            value={searchString}
            ref={searchInputRef}
            className="sm:w-64"
            onChange={(e) => {
              setSearchString(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </>
      ) : (
        <>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={handleSearchButtonClick}
          >
            <Search />
          </Button>
        </>
      )}
    </div>
  );
}
