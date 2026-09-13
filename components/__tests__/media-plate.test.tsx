import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MediaPlate } from "../molecules/media-plate";

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src, onError }: { alt: string; src: string; onError: () => void }) => (
    <img alt={alt} src={src} onError={onError} />
  ),
}));

describe("MediaPlate", () => {
  const captureProps = {
    variant: "capture" as const,
    kindLabel: "Capture",
    year: "2026",
    alt: "A screenshot of the case",
    aspect: "16/10" as const,
    src: "/projects/case.webp",
    width: 1280,
    height: 720,
    sizes: "(max-width: 640px) 100vw, 340px",
  };

  it("renders a capture with its alt text and caption", () => {
    render(<MediaPlate {...captureProps} />);

    expect(screen.getByRole("img", { name: "A screenshot of the case" })).toBeInTheDocument();
    expect(screen.getByText("Capture")).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
  });

  it("renders diagram children instead of an image", () => {
    render(
      <MediaPlate
        variant="diagram"
        kindLabel="Diagram"
        year="2025"
        alt="A schematic"
        aspect="16/10"
      >
        <svg data-testid="schematic" />
      </MediaPlate>,
    );

    expect(screen.getByTestId("schematic")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("marks a diagram plate with a dashed frame", () => {
    const { container: diagramContainer } = render(
      <MediaPlate
        variant="diagram"
        kindLabel="Diagram"
        year="2025"
        alt="A schematic"
        aspect="16/10"
      >
        <svg />
      </MediaPlate>,
    );
    const { container: captureContainer } = render(<MediaPlate {...captureProps} />);

    expect(diagramContainer.querySelector("figure")).toHaveClass("border-dashed");
    expect(captureContainer.querySelector("figure")).not.toHaveClass("border-dashed");
  });

  it("renders the note when provided", () => {
    render(<MediaPlate {...captureProps} note="Diagram drawn for this portfolio." />);

    expect(screen.getByText("Diagram drawn for this portfolio.")).toBeInTheDocument();
  });

  it("omits the note when not provided", () => {
    const { container } = render(<MediaPlate {...captureProps} />);

    expect(container.querySelector("figcaption + p")).not.toBeInTheDocument();
  });

  it("falls back to the alt text when the image fails", () => {
    render(<MediaPlate {...captureProps} />);

    const img = screen.getByRole("img", { name: "A screenshot of the case" });
    fireEvent.error(img);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("A screenshot of the case")).toBeInTheDocument();
  });

  it("keeps the glare attenuation under reduced motion", () => {
    const { container } = render(<MediaPlate {...captureProps} />);

    const well = container.querySelector("figure > div");
    expect(well).toHaveClass("dark:opacity-90");
    expect(well?.className).not.toMatch(/motion-reduce:/);
  });

  it.each([
    ["16/10", "aspect-[16/10]"],
    ["9/16", "aspect-[9/16]"],
    ["11/16", "aspect-[11/16]"],
  ] as const)("applies the requested aspect ratio (%s)", (aspect, expectedClass) => {
    const { container } = render(<MediaPlate {...captureProps} aspect={aspect} />);

    const well = container.querySelector("figure > div");
    expect(well).toHaveClass(expectedClass);
  });

  it("frames a portrait document at its own ratio", () => {
    const { container } = render(<MediaPlate {...captureProps} aspect="11/16" />);

    const well = container.querySelector("figure > div");
    expect(well).toHaveClass("aspect-[11/16]");
  });

  it("keeps caption, note and fallback on the AA-safe foreground", () => {
    const { container } = render(<MediaPlate {...captureProps} note="n" />);

    const figcaption = container.querySelector("figcaption");
    const note = screen.getByText("n");
    expect(figcaption).toHaveClass("text-foreground/70");
    expect(figcaption).not.toHaveClass("text-muted-foreground");
    expect(note).toHaveClass("text-foreground/70");
    expect(note).not.toHaveClass("text-muted-foreground");

    const img = screen.getByRole("img", { name: "A screenshot of the case" });
    fireEvent.error(img);
    const fallback = screen.getByText("A screenshot of the case");
    expect(fallback).toHaveClass("text-foreground/70");
    expect(fallback).not.toHaveClass("text-muted-foreground");
  });
});
