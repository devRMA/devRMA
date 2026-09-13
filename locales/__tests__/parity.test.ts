import { describe, expect, it } from "vitest";
import en from "../en";
import ptBR from "../pt-BR";

function flattenKeyPaths(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") {
    return [prefix];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flattenKeyPaths(item, `${prefix}[${index}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      flattenKeyPaths(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

function flattenLeaves(value: unknown, prefix = ""): Record<string, unknown> {
  if (Array.isArray(value)) {
    return value.reduce<Record<string, unknown>>(
      (acc, item, index) => Object.assign(acc, flattenLeaves(item, `${prefix}[${index}]`)),
      {},
    );
  }
  if (value && typeof value === "object") {
    return Object.entries(value).reduce<Record<string, unknown>>(
      (acc, [key, child]) =>
        Object.assign(acc, flattenLeaves(child, prefix ? `${prefix}.${key}` : key)),
      {},
    );
  }
  return { [prefix]: value };
}

describe("locale parity", () => {
  it("has identical key paths in both locales", () => {
    const ptPaths = flattenKeyPaths(ptBR).sort();
    const enPaths = flattenKeyPaths(en).sort();
    expect(ptPaths).toEqual(enPaths);
  });

  it("has a non-empty string at every leaf, in both locales", () => {
    const ptLeaves = flattenLeaves(ptBR);
    const enLeaves = flattenLeaves(en);
    for (const [path, value] of Object.entries(ptLeaves)) {
      expect(typeof value, `pt-BR ${path}`).toBe("string");
      expect((value as string).length, `pt-BR ${path}`).toBeGreaterThan(0);
    }
    for (const [path, value] of Object.entries(enLeaves)) {
      expect(typeof value, `en ${path}`).toBe("string");
      expect((value as string).length, `en ${path}`).toBeGreaterThan(0);
    }
  });

  it("contains the spot-checked new keys", () => {
    const spotKeys = [
      "projects.case.kindDiagram",
      "projects.cases.a1.shots.acuity",
      "projects.cases.electrolux.shots.report",
      "experience.phases.scale.title",
      "a11y.scrollToExperience",
    ];
    const ptPaths = new Set(flattenKeyPaths(ptBR));
    const enPaths = new Set(flattenKeyPaths(en));
    for (const key of spotKeys) {
      expect(ptPaths.has(key), key).toBe(true);
      expect(enPaths.has(key), key).toBe(true);
    }
  });

  it("does not carry the retired certificates keys", () => {
    const retiredPrefixes = [
      "certificates",
      "nav.certificates",
      "a11y.viewCertificate",
      "skills.bento.architectureTitle",
      "skills.bento.architectureDescription",
    ];
    const ptPaths = flattenKeyPaths(ptBR);
    const enPaths = flattenKeyPaths(en);
    for (const prefix of retiredPrefixes) {
      expect(ptPaths.some((path) => path === prefix || path.startsWith(`${prefix}.`))).toBe(false);
      expect(enPaths.some((path) => path === prefix || path.startsWith(`${prefix}.`))).toBe(false);
    }
  });
});
