import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ContactSection } from "../organisms/contact-section";

const sectionHeadingMock = vi.fn(({ title, description }: { title: string; description: string }) => (
  <div data-testid="section-heading" data-title={title} data-description={description} />
));

const contactMethodMock = vi.fn((_props: unknown) => null);

const translationMap = {
  "contact.title": "Let's connect",
  "contact.description": "Reach out through any of the channels below.",
  "contact.connect.title": "Say hello",
  "contact.connect.description": "Open to collaborations and conversations.",
  "contact.connect.email": "Email",
  "contact.connect.github": "GitHub",
  "contact.connect.linkedin": "LinkedIn",
};

vi.mock("@/components/language-provider", () => ({
  useLanguage: () => ({
    t: (key: keyof typeof translationMap) => translationMap[key],
  }),
}));

vi.mock("@/components/atoms/section-heading", () => ({
  SectionHeading: (props: { title: string; description: string }) => sectionHeadingMock(props),
}));

vi.mock("@/components/molecules/contact-method", () => ({
  ContactMethod: (props: any) => {
    contactMethodMock(props);
    return <div data-testid={`contact-${props.title}`} />;
  },
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: ReactNode }) => <div data-testid="card">{children}</div>,
  CardHeader: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  CardTitle: ({ children }: { children: ReactNode }) => <h3>{children}</h3>,
  CardDescription: ({ children }: { children: ReactNode }) => <p>{children}</p>,
  CardContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  },
}));

describe("ContactSection", () => {
  beforeEach(() => {
    sectionHeadingMock.mockClear();
    contactMethodMock.mockClear();
  });

  it("renders the heading and contact methods using translations", () => {
    render(<ContactSection />);

    expect(sectionHeadingMock).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Let's connect", description: translationMap["contact.description"] }),
    );

    expect(contactMethodMock).toHaveBeenCalledTimes(3);
    expect(contactMethodMock).toHaveBeenCalledWith(
      expect.objectContaining({
        href: "mailto:contact@devrma.com",
        title: "Email",
        value: "contact@devrma.com",
      }),
    );
    expect(contactMethodMock).toHaveBeenCalledWith(
      expect.objectContaining({ href: "https://github.com/devRMA", title: "GitHub" }),
    );
    expect(contactMethodMock).toHaveBeenCalledWith(
      expect.objectContaining({ href: "https://linkedin.com/in/devRMA", title: "LinkedIn" }),
    );
  });
});
