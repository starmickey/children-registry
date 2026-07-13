"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft as ArrowLeft, Search } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function FetchChildHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultSearchString = searchParams.get("search")?.toString();

  const [expanded, setExpanded] = useState<boolean>(
    defaultSearchString != null,
  );
  const [searchString, setSearchString] = useState<string>(
    defaultSearchString ?? "",
  );

  function handleSearchButtonClick() {
    setExpanded(true);
  }

  function handleReturnButtonClick() {
    const params = new URLSearchParams(searchParams);

    setExpanded(false);

    params.delete("search"); // Removes the param if the input is cleared
    setSearchString("");
  }

  const handleSearch = useDebouncedCallback((term: string) => {
    setSearchString(term);

    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search"); // Removes the param if the input is cleared
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <header className="flex mb-4 items-center">
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
            onChange={(e) => handleSearch(e.target.value)}
          />
        </>
      ) : (
        <>
          <h1 className="title flex-1">Children</h1>
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
    </header>
  );
}
