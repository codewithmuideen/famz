import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const variantClasses = {
  primary:
    "bg-brand-navy text-ink-inverse hover:bg-brand-navy-light border border-brand-navy",
  secondary:
    "bg-brand-gold text-brand-navy-dark hover:bg-brand-gold-light border border-brand-gold",
  outline:
    "bg-transparent text-brand-navy border border-brand-navy hover:bg-brand-navy hover:text-ink-inverse",
  dark: "bg-surface-dark text-ink-inverse border border-line-dark hover:bg-surface-dark-alt",
  light:
    "bg-surface-white text-brand-navy border border-line hover:border-brand-navy",
  text: "bg-transparent text-brand-navy border-b border-transparent hover:border-brand-navy px-0",
};

const sizeClasses = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

/**
 * Reusable Button — renders <Link>, <a>, or <button> depending on props.
 */
const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      to,
      href,
      icon = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const base =
      "group inline-flex items-center gap-2 whitespace-nowrap font-medium tracking-wide transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2";
    const isText = variant === "text";
    const shape = isText ? "" : "rounded-full";
    const classes = `${base} ${shape} ${variantClasses[variant]} ${
      isText ? "" : sizeClasses[size]
    } ${className}`;

    const content = (
      <>
        <span>{children}</span>
        {icon && (
          <ArrowUpRight
            size={16}
            className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        )}
      </>
    );

    const isExternalTo = typeof to === "string" && /^(mailto:|tel:|https?:\/\/)/.test(to);

    if (to && !isExternalTo) {
      return (
        <Link ref={ref} to={to} className={classes} {...props}>
          {content}
        </Link>
      );
    }

    if (isExternalTo) {
      return (
        <a ref={ref} href={to} className={classes} {...props}>
          {content}
        </a>
      );
    }

    if (href) {
      return (
        <a ref={ref} href={href} className={classes} {...props}>
          {content}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
