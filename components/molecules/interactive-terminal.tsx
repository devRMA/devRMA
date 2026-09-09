"use client";

import { Terminal as TerminalIcon } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";

interface CommandHistoryItem {
  id: string;
  command: string;
  output: string | React.ReactNode;
}

export function InteractiveTerminal() {
  const { t } = useLanguage();
  const [commandInput, setCommandInput] = useState("");

  const initialHistory = useMemo<CommandHistoryItem[]>(
    () => [
      {
        id: "initial-help-command",
        command: "help",
        output: `${t("terminal.availableCommands")} stack, architecture, experience, contact, curl devrma.com/cv, clear`,
      },
    ],
    [t],
  );

  const [historyItems, setHistoryItems] = useState<CommandHistoryItem[]>(initialHistory);
  const terminalScrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistoryItems((currentItems) => {
      if (currentItems.length === 1 && currentItems[0]?.id === "initial-help-command") {
        return initialHistory;
      }
      return currentItems;
    });
  }, [initialHistory]);

  useEffect(() => {
    const scrollContainer = terminalScrollContainerRef.current;
    if (scrollContainer) {
      if (typeof scrollContainer.scrollTo === "function") {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: "smooth",
        });
      } else {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, []);

  const executeCommand = (rawCommand: string) => {
    const trimmedCommand = rawCommand.trim().toLowerCase();

    if (!trimmedCommand) {
      return;
    }

    if (trimmedCommand === "clear") {
      setHistoryItems([]);
      setCommandInput("");
      return;
    }

    let commandResult: React.ReactNode;

    switch (trimmedCommand) {
      case "help":
        commandResult = (
          <div className="space-y-1 text-xs">
            <p className="text-cyan-400">{t("terminal.availableCommands")}</p>
            <p>
              • <span className="text-emerald-400 font-semibold">stack</span>:{" "}
              {t("terminal.helpStack")}
            </p>
            <p>
              • <span className="text-emerald-400 font-semibold">architecture</span>:{" "}
              {t("terminal.helpArchitecture")}
            </p>
            <p>
              • <span className="text-emerald-400 font-semibold">experience</span>:{" "}
              {t("terminal.helpExperience")}
            </p>
            <p>
              • <span className="text-emerald-400 font-semibold">contact</span>:{" "}
              {t("terminal.helpContact")}
            </p>
            <p>
              • <span className="text-emerald-400 font-semibold">curl devrma.com/cv</span>:{" "}
              {t("terminal.helpCv")}
            </p>
            <p>
              • <span className="text-emerald-400 font-semibold">clear</span>:{" "}
              {t("terminal.helpClear")}
            </p>
          </div>
        );
        break;

      case "stack":
        commandResult = (
          <div className="space-y-1 text-xs text-zinc-300">
            <p className="text-cyan-400 font-semibold">{t("terminal.stackTitle")}</p>
            <p>• {t("terminal.stackBackend")}</p>
            <p>• {t("terminal.stackMessaging")}</p>
            <p>• {t("terminal.stackCloud")}</p>
            <p>• {t("terminal.stackDatabases")}</p>
            <p>• {t("terminal.stackFrontend")}</p>
          </div>
        );
        break;

      case "architecture":
        commandResult = (
          <div className="space-y-1 text-xs text-zinc-300">
            <p className="text-cyan-400 font-semibold">{t("terminal.architectureTitle")}</p>
            <p>• {t("terminal.archDriverTelemetry")}</p>
            <p>• {t("terminal.archStreaming")}</p>
            <p>• {t("terminal.archProcessing")}</p>
            <p>• {t("terminal.archInfra")}</p>
          </div>
        );
        break;

      case "experience":
        commandResult = (
          <div className="space-y-1 text-xs text-zinc-300">
            <p className="text-cyan-400 font-semibold">{t("terminal.trajectoryTitle")}</p>
            <p>• {t("terminal.trajectoryItem1")}</p>
            <p>• {t("terminal.trajectoryItem2")}</p>
            <p>• {t("terminal.trajectoryItem3")}</p>
            <p>• {t("terminal.trajectoryItem4")}</p>
          </div>
        );
        break;

      case "contact":
        commandResult = (
          <div className="space-y-1 text-xs text-zinc-300">
            <p className="text-cyan-400 font-semibold">{t("terminal.channelsTitle")}</p>
            <p>• E-mail: contact@devrma.com</p>
            <p>• GitHub: https://github.com/devRMA</p>
            <p>• LinkedIn: https://linkedin.com/in/devRMA</p>
          </div>
        );
        break;

      case "curl devrma.com/cv":
        commandResult = (
          <div className="rounded border border-zinc-800 bg-zinc-900/60 p-3 font-mono text-[11px] text-zinc-300">
            <p className="text-emerald-400 font-bold">RAFAEL MARTINS ALVES</p>
            <p className="text-zinc-400">{t("terminal.cvTitle")}</p>
            <p className="mt-2 text-zinc-300">{t("terminal.cvSpecialty")}</p>
            <p className="text-zinc-400">{t("terminal.cvEducation")}</p>
            <p className="mt-1 text-cyan-400">{t("terminal.cvStatus")}</p>
          </div>
        );
        break;

      case "sudo":
        commandResult = <span className="text-amber-400 text-xs">{t("terminal.rootDenied")}</span>;
        break;

      default:
        commandResult = (
          <span className="text-red-400 text-xs">
            {t("terminal.unknownCommand", { command: rawCommand })}
          </span>
        );
        break;
    }

    const uniqueCommandIdentifier = `${trimmedCommand}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    setHistoryItems((previousItems) => [
      ...previousItems,
      { id: uniqueCommandIdentifier, command: rawCommand, output: commandResult },
    ]);
    setCommandInput("");
  };

  const handleFormSubmit = (submitEvent: React.FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();
    executeCommand(commandInput);
  };

  const executeSuggestedCommand = (suggestedCommand: string) => {
    executeCommand(suggestedCommand);
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 font-mono text-xs shadow-xl">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 font-mono text-xs text-zinc-400">visitor@devrma: ~</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-zinc-500">
          <TerminalIcon className="h-3 w-3" aria-hidden="true" />
          <span>bash</span>
        </div>
      </div>

      <div
        ref={terminalScrollContainerRef}
        className="max-h-64 overflow-y-auto p-4 space-y-3 scroll-smooth"
      >
        {historyItems.map((historyItem) => (
          <div
            key={historyItem.id}
            className="space-y-1 animate-in fade-in-0 slide-in-from-bottom-1 duration-150 ease-out"
          >
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-cyan-400">visitor@devrma:~$</span>
              <span className="text-foreground">{historyItem.command}</span>
            </div>
            <div className="pl-4 text-zinc-300">{historyItem.output}</div>
          </div>
        ))}

        <form onSubmit={handleFormSubmit} className="flex items-center gap-2 pt-1">
          <span className="text-cyan-400 shrink-0">visitor@devrma:~$</span>
          <input
            type="text"
            value={commandInput}
            onChange={(changeEvent) => setCommandInput(changeEvent.target.value)}
            placeholder={t("terminal.placeholder")}
            className="flex-1 bg-transparent text-foreground placeholder:text-zinc-600 focus:outline-none"
            aria-label="Comando de terminal"
          />
          <span
            className="inline-block h-3.5 w-1.5 bg-cyan-400/80 animate-pulse motion-reduce:hidden"
            aria-hidden="true"
          />
        </form>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 border-t border-zinc-800/80 bg-zinc-900/40 px-3 py-2 text-[11px] text-zinc-400">
        <span className="text-zinc-500">{t("terminal.shortcutsLabel")}</span>
        {["help", "stack", "architecture", "curl devrma.com/cv", "clear"].map((shortcutCommand) => (
          <button
            key={shortcutCommand}
            type="button"
            onClick={() => executeSuggestedCommand(shortcutCommand)}
            className="rounded border border-zinc-700 bg-zinc-800/60 px-2 py-0.5 text-[10px] text-zinc-300 transition-[color,background-color,border-color,transform] duration-150 ease-out hover:border-cyan-500/50 hover:bg-zinc-800 hover:text-cyan-300 hover:-translate-y-0.5 active:scale-[0.97]"
          >
            {shortcutCommand}
          </button>
        ))}
      </div>
    </div>
  );
}
