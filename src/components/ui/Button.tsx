import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type ButtonLinkProps = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonElementProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = ButtonLinkProps | ButtonElementProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-accent bg-accent text-background shadow-[0_0_24px_rgba(0,229,255,0.18)] hover:border-accent-hover hover:bg-accent-hover",
  secondary:
    "border-border bg-surface text-text-primary hover:border-accent hover:text-accent",
  ghost:
    "border-transparent bg-transparent text-text-secondary hover:text-text-primary",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    size = "md",
    variant = "primary",
    ...rest
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorProps } = rest;

    return (
      <a className={classes} href={href} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
