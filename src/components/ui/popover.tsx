"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "center" | "end";
}

export function Popover({
  children,
  content,
  isOpen = false,
  onOpenChange,
  align = "start",
}: PopoverProps) {
  const [localOpen, setLocalOpen] = React.useState(false);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const open = isOpen !== undefined ? isOpen : localOpen;
  const setOpen = onOpenChange || setLocalOpen;

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        open &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  const child = React.Children.only(children) as React.ReactElement<
    React.HTMLAttributes<HTMLButtonElement>
  >;
  const childWithHandler = React.cloneElement(child, {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(!open);
      child.props.onClick?.(e);
    },
  } as Partial<React.HTMLAttributes<HTMLButtonElement>>);

  return (
    <div className="relative" ref={popoverRef}>
      {childWithHandler}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={contentRef}
            className={cn(
              "absolute top-full z-[100] mt-2 w-full rounded-md border border-black/10 bg-white p-5 shadow-xl",
              alignClasses[align],
            )}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
