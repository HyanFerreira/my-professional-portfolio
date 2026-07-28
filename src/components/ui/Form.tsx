"use client";

import { Check, ChevronDown } from "lucide-react";
import {
  type ButtonHTMLAttributes,
  forwardRef,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type LabelHTMLAttributes,
  type TextareaHTMLAttributes,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type LabelProps = Omit<LabelHTMLAttributes<HTMLLabelElement>, "htmlFor"> & {
  htmlFor: string;
  required?: boolean;
};

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export type SelectOption = {
  disabled?: boolean;
  label: string;
  value: string;
};

type SelectProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "name" | "onChange" | "value"
> & {
  invalid?: boolean;
  name?: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  value: string;
};

const fieldClassName =
  "w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-secondary/70 focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60";

const invalidFieldClassName =
  "border-red-500 focus:border-red-500 focus:ring-red-500/20";

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, htmlFor, required = false, ...props }, ref) => (
    <label
      className={cn(
        "mb-2 block text-sm font-medium text-text-primary transition-colors",
        className,
      )}
      htmlFor={htmlFor}
      ref={ref}
      {...props}
    >
      {children}
      {required ? (
        <span aria-hidden="true" className="ml-1 text-red-500">
          *
        </span>
      ) : null}
    </label>
  ),
);

Label.displayName = "Label";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid = false, ...props }, ref) => (
    <input
      className={cn(
        fieldClassName,
        invalid && invalidFieldClassName,
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid = false, ...props }, ref) => (
    <textarea
      className={cn(
        fieldClassName,
        "max-h-[300px]",
        invalid && invalidFieldClassName,
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      className,
      disabled = false,
      id,
      invalid = false,
      name,
      onBlur,
      onKeyDown,
      onValueChange,
      options,
      placeholder = "Selecione",
      value,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const listboxId = `${selectId}-listbox`;
    const buttonRef = useRef<HTMLButtonElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(() =>
      Math.max(
        0,
        options.findIndex((option) => option.value === value),
      ),
    );
    const selectedOption = options.find((option) => option.value === value);

    useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

    useEffect(() => {
      if (!isOpen) {
        return;
      }

      function handlePointerDown(event: PointerEvent) {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      }

      document.addEventListener("pointerdown", handlePointerDown);

      return () => {
        document.removeEventListener("pointerdown", handlePointerDown);
      };
    }, [isOpen]);

    useEffect(() => {
      const selectedIndex = options.findIndex(
        (option) => option.value === value,
      );

      if (selectedIndex >= 0) {
        setActiveIndex(selectedIndex);
      }
    }, [options, value]);

    function selectOption(option: SelectOption) {
      if (option.disabled) {
        return;
      }

      onValueChange(option.value);
      setIsOpen(false);
      buttonRef.current?.focus();
    }

    function moveActiveIndex(direction: 1 | -1) {
      const enabledOptions = options.filter((option) => !option.disabled);

      if (enabledOptions.length === 0) {
        return;
      }

      const currentOption = options[activeIndex];
      const enabledIndex = Math.max(
        0,
        enabledOptions.findIndex(
          (option) => option.value === currentOption?.value,
        ),
      );
      const nextEnabledOption =
        enabledOptions[
          (enabledIndex + direction + enabledOptions.length) %
            enabledOptions.length
        ];
      const nextIndex = options.findIndex(
        (option) => option.value === nextEnabledOption.value,
      );

      setActiveIndex(nextIndex);
    }

    function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        setIsOpen(true);
        moveActiveIndex(event.key === "ArrowDown" ? 1 : -1);
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
          return;
        }

        const activeOption = options[activeIndex];

        if (activeOption) {
          selectOption(activeOption);
        }
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    return (
      <div className="relative" ref={wrapperRef}>
        {name ? (
          <input name={name} readOnly type="hidden" value={value} />
        ) : null}
        <button
          aria-activedescendant={
            isOpen ? `${listboxId}-option-${activeIndex}` : undefined
          }
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className={cn(
            fieldClassName,
            "flex cursor-pointer items-center justify-between gap-3 pr-3 text-left",
            invalid && invalidFieldClassName,
            !selectedOption && "text-text-secondary/70",
            className,
          )}
          disabled={disabled}
          id={selectId}
          onBlur={onBlur}
          onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
          onKeyDown={handleKeyDown}
          ref={buttonRef}
          role="combobox"
          type="button"
          {...props}
        >
          <span className="min-w-0 flex-1 truncate">
            {selectedOption?.label || placeholder}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "shrink-0 text-text-secondary transition",
              isOpen && "rotate-180 text-accent",
            )}
          >
            <ChevronDown className="size-4" strokeWidth={2.25} />
          </span>
        </button>

        {isOpen ? (
          <div
            className="form-select-listbox absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-md border border-border bg-surface-elevated p-1 shadow-[var(--shadow-popover)] ring-1 ring-white/5"
            id={listboxId}
            role="listbox"
          >
            {options.map((option, index) => (
              <button
                aria-selected={option.value === value}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-3 rounded-[5px] px-3 py-2.5 text-left text-sm text-text-primary transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50",
                  index === activeIndex && "bg-surface",
                  option.value === value && "bg-accent/10 text-accent",
                )}
                disabled={option.disabled}
                id={`${listboxId}-option-${index}`}
                key={option.value}
                onClick={() => selectOption(option)}
                onMouseEnter={() => setActiveIndex(index)}
                role="option"
                type="button"
              >
                <span className="min-w-0 flex-1 truncate">{option.label}</span>
                <Check
                  aria-hidden="true"
                  className={cn(
                    "size-4 shrink-0 transition-opacity",
                    option.value === value ? "opacity-100" : "opacity-0",
                  )}
                  strokeWidth={2.4}
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    );
  },
);

Select.displayName = "Select";
