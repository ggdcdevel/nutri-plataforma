"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin } from "lucide-react";
import type { CidadeOption } from "@/lib/cidades";

function norm(str: string) {
  return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  options: CidadeOption[];
  placeholder?: string;
  inputClassName?: string;
  onEnter?: () => void;
}

export default function CityAutocomplete({
  value,
  onChange,
  options,
  placeholder = "Sua cidade...",
  inputClassName,
  onEnter,
}: CityAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = value.trim()
    ? options
        .filter(
          (o) =>
            norm(o.cidade).includes(norm(value)) ||
            o.estado.toLowerCase().startsWith(value.toLowerCase())
        )
        .slice(0, 8)
    : [];

  const showDropdown = open && filtered.length > 0;

  function select(o: CidadeOption) {
    onChange(`${o.cidade}, ${o.estado}`);
    setOpen(false);
    setIdx(0);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (showDropdown) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIdx((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        select(filtered[idx]);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    } else if (e.key === "Enter") {
      onEnter?.();
    }
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        autoComplete="off"
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setIdx(0);
        }}
        onFocus={() => value.trim() && setOpen(true)}
        onKeyDown={handleKeyDown}
        className={inputClassName}
      />
      {showDropdown && (
        <ul className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-lg border border-border bg-card shadow-lg">
          {filtered.map((o, i) => (
            <li
              key={`${o.cidade}-${o.estado}`}
              onMouseDown={(e) => {
                e.preventDefault();
                select(o);
              }}
              onMouseEnter={() => setIdx(i)}
              className={`flex cursor-pointer items-center gap-2 px-3 py-2 text-sm transition-colors ${
                i === idx
                  ? "bg-nutri-green/10 text-nutri-green"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span>{o.cidade}</span>
              <span className="ml-auto text-xs font-medium text-muted-foreground">
                {o.estado}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
