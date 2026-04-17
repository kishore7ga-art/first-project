"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  value: string;
  onChange?: (value: string) => void;
  tagName?: keyof React.JSX.IntrinsicElements;
  className?: string;
  readOnly?: boolean;
  placeholder?: string;
}

export function EditableText({
  value,
  onChange,
  tagName = "span",
  className,
  readOnly = false,
  placeholder,
}: EditableTextProps) {
  const contentEditableRef = useRef<HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isEditing || !contentEditableRef.current) {
      return;
    }

    if (contentEditableRef.current.innerText !== value) {
      contentEditableRef.current.innerText = value;
    }
  }, [isEditing, value]);

  if (readOnly) {
    const ReadOnlyTag = tagName as React.ElementType;
    return tagName === "br" ? null : <ReadOnlyTag className={className}>{value}</ReadOnlyTag>;
  }

  const multiline = tagName === "p" || tagName === "div";
  const EditableTag = tagName as React.ElementType;

  return (
    <EditableTag
      ref={contentEditableRef}
      contentEditable
      suppressContentEditableWarning
      className={cn("builder-editor cursor-text outline-none", "p-1 -m-1", className)}
      data-placeholder={placeholder}
      onFocus={() => setIsEditing(true)}
      onBlur={(event: React.FocusEvent<HTMLElement>) => {
        setIsEditing(false);
        onChange?.(event.currentTarget.innerText.trim() || placeholder || "");
      }}
      onInput={(event: React.FormEvent<HTMLElement>) => {
        onChange?.(event.currentTarget.innerText);
      }}
      onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
        event.stopPropagation();

        if (event.key === "Enter" && !multiline) {
          event.preventDefault();
          event.currentTarget.blur();
        }
      }}
      onMouseDown={(event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
      }}
    >
      {value}
    </EditableTag>
  );
}
