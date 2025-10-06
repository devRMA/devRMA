import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Toaster } from "../ui/toaster";

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toasts: [
      {
        id: "1",
        title: "Saved",
        description: "Your settings were saved",
        open: true,
      },
    ],
  }),
}));

describe("Toaster", () => {
  it("renders toast items from the toast hook", () => {
    render(<Toaster />);

    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Your settings were saved")).toBeInTheDocument();
  });
});
