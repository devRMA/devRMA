import { Button, type ButtonProps } from "@/components/ui/button";
import Link from "next/link";
import type React from "react";
import { forwardRef } from "react";

interface ButtonLinkProps extends ButtonProps {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}

export const ButtonLink = forwardRef<HTMLButtonElement, ButtonLinkProps>(
  ({ href, external = false, children, ...props }, ref) => {
    if (external) {
      return (
        <Button asChild ref={ref} {...props}>
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        </Button>
      );
    }

    return (
      <Button asChild ref={ref} {...props}>
        <Link href={href}>{children}</Link>
      </Button>
    );
  },
);

ButtonLink.displayName = "ButtonLink";
