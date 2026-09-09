import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { cloneElement, isValidElement, type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { certificatesData } from "@/data/certificates";
import { CertificatesSection } from "../organisms/certificates-section";

const sectionHeadingMock = vi.fn(
  ({ title, description }: { title: string; description: string }) => (
    <header data-testid="heading" data-title={title} data-description={description} />
  ),
);

const certificateCardMock = vi.fn((props: any) => (
  <button type="button" data-testid={`certificate-${props.id}`} onClick={props.onClick}>
    {props.title}
  </button>
));

const translationMap: Record<string, string | undefined> = {
  "certificates.title": "Certifications",
  "certificates.description": "Continuous learning milestones.",
  "certificates.tabs.frontend": "Frontend",
  "certificates.tabs.backend": "Backend",
  "certificates.tabs.devops": "DevOps",
  "certificates.tabs.other": "Other",
  "certificates.verify": "Verify credential",
};

for (const category of Object.values(certificatesData)) {
  for (const certificate of category) {
    translationMap[`certificates.items.${certificate.id}.title`] = `${certificate.title}*`;
    translationMap[`certificates.items.${certificate.id}.issuer`] = `${certificate.issuer} Ltd.`;
  }
}

vi.mock("@/components/language-provider", () => ({
  useLanguage: () => ({
    t: (key: string) => translationMap[key],
  }),
}));

vi.mock("@/components/atoms/section-heading", () => ({
  SectionHeading: (props: { title: string; description: string }) => sectionHeadingMock(props),
}));

vi.mock("@/components/molecules/certificate-card", () => ({
  CertificateCard: (props: any) => certificateCardMock(props),
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild, ...props }: any) => {
    if (asChild && isValidElement(children)) {
      return cloneElement(children, props);
    }
    return (
      <button type="button" {...props}>
        {children}
      </button>
    );
  },
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ open, children }: { open: boolean; children: ReactNode }) => (open ? children : null),
  DialogContent: ({ children }: { children: ReactNode }) => (
    <div role="dialog" aria-modal="true">
      {children}
    </div>
  ),
  DialogHeader: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DialogTitle: ({ children }: { children: ReactNode }) => <h3>{children}</h3>,
  DialogDescription: ({ children }: { children: ReactNode }) => <p>{children}</p>,
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src = "/test.jpg" }: { alt: string; src?: string }) => (
    <img src={src} alt={alt} data-testid="certificate-image" />
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  },
}));

describe("CertificatesSection", () => {
  beforeEach(() => {
    sectionHeadingMock.mockClear();
    certificateCardMock.mockClear();
  });

  it("opens a dialog with the selected certificate details", async () => {
    const user = userEvent.setup();
    render(<CertificatesSection />);

    expect(sectionHeadingMock).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Certifications" }),
    );

    const firstCertificate = certificatesData.frontend[0];
    const [firstTrigger] = screen.getAllByTestId(`certificate-${firstCertificate.id}`);
    await user.click(firstTrigger);

    expect(screen.getByRole("heading", { name: `${firstCertificate.title}*` })).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes(`${firstCertificate.issuer} Ltd.`)),
    ).toBeInTheDocument();
    expect(screen.getByTestId("certificate-image")).toHaveAttribute(
      "alt",
      `${firstCertificate.title}*`,
    );
    expect(screen.getByRole("link", { name: "Verify credential" })).toHaveAttribute(
      "href",
      firstCertificate.url,
    );
  });
});
