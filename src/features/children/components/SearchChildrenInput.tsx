"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft as ArrowLeft, Search } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Typography } from "@/components/ui/typography";

export default function SearchChildrenInput() {
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

    params.delete("search");

    setSearchString("");
    setExpanded(false);

    // ADD THIS LINE: Apply the changes to the URL
    router.replace(`${pathname}?${params.toString()}`);
  }

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search"); // Removes the param if the input is cleared
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return expanded ? (
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
        onChange={(e) => {
          setSearchString(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </>
  ) : (
    <>
      <Typography variant="H1" className="flex-1">
        Infancia Misionera
      </Typography>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={handleSearchButtonClick}
      >
        <Search />
      </Button>
    </>
  );
}
