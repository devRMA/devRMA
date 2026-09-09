import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LanguageProvider } from "../language-provider";
import { InteractiveTerminal } from "../molecules/interactive-terminal";

function renderTerminal() {
  return render(
    <LanguageProvider>
      <InteractiveTerminal />
    </LanguageProvider>,
  );
}

describe("InteractiveTerminal", () => {
  it("renders terminal prompt and input", () => {
    renderTerminal();

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("executes suggested command when clicked", async () => {
    const user = userEvent.setup();
    renderTerminal();

    const helpButtons = screen.getAllByRole("button", { name: /^help$/i });
    await user.click(helpButtons[0]);

    expect(screen.getByText(/Tecnologias e ferramentas principais/i)).toBeInTheDocument();
  });

  it("handles empty submission without adding entries", async () => {
    const user = userEvent.setup();
    renderTerminal();

    const input = screen.getByRole("textbox");
    await user.type(input, "   {enter}");

    expect(screen.queryByText(/Comando não reconhecido/)).not.toBeInTheDocument();
  });

  it("executes help command via text input", async () => {
    const user = userEvent.setup();
    renderTerminal();

    const input = screen.getByRole("textbox");
    await user.type(input, "help{enter}");

    expect(screen.getByText(/Tecnologias e ferramentas principais/i)).toBeInTheDocument();
  });

  it("executes stack command via text input", async () => {
    const user = userEvent.setup();
    renderTerminal();

    const input = screen.getByRole("textbox");
    await user.type(input, "stack{enter}");

    expect(screen.getByText(/Backend:/i)).toBeInTheDocument();
  });

  it("executes architecture command via text input", async () => {
    const user = userEvent.setup();
    renderTerminal();

    const input = screen.getByRole("textbox");
    await user.type(input, "architecture{enter}");

    expect(screen.getByText(/Ecossistema Logístico/i)).toBeInTheDocument();
  });

  it("executes experience command via text input", async () => {
    const user = userEvent.setup();
    renderTerminal();

    const input = screen.getByRole("textbox");
    await user.type(input, "experience{enter}");

    expect(screen.getByText(/Tech Lead/i)).toBeInTheDocument();
  });

  it("executes contact command via text input", async () => {
    const user = userEvent.setup();
    renderTerminal();

    const input = screen.getByRole("textbox");
    await user.type(input, "contact{enter}");

    expect(screen.getByText(/• E-mail: contact@devrma.com/i)).toBeInTheDocument();
  });

  it("executes curl devrma.com/cv command via text input", async () => {
    const user = userEvent.setup();
    renderTerminal();

    const input = screen.getByRole("textbox");
    await user.type(input, "curl devrma.com/cv{enter}");

    expect(screen.getByText("RAFAEL MARTINS ALVES")).toBeInTheDocument();
  });

  it("executes sudo command via text input", async () => {
    const user = userEvent.setup();
    renderTerminal();

    const input = screen.getByRole("textbox");
    await user.type(input, "sudo{enter}");

    expect(screen.getByText(/Acesso root negado/i)).toBeInTheDocument();
  });

  it("executes clear command to reset history", async () => {
    const user = userEvent.setup();
    renderTerminal();

    const input = screen.getByRole("textbox");
    await user.type(input, "help{enter}");
    expect(screen.getByText(/Tecnologias e ferramentas principais/i)).toBeInTheDocument();

    await user.type(input, "clear{enter}");
    expect(screen.queryByText(/Tecnologias e ferramentas principais/i)).not.toBeInTheDocument();
  });

  it("handles unknown commands gracefully", async () => {
    const user = userEvent.setup();
    renderTerminal();

    const input = screen.getByRole("textbox");
    await user.type(input, "foobar123{enter}");

    expect(screen.getByText(/Comando não reconhecido: "foobar123"/i)).toBeInTheDocument();
  });
});
