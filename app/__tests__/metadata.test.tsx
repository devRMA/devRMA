import { describe, expect, it, vi } from "vitest";
import AppleIcon, { contentType as appleContentType, size as appleSize } from "../apple-icon";
import Icon, { contentType as iconContentType, size as iconSize } from "../icon";
import manifest from "../manifest";
import OpengraphImage, {
  alt as ogAlt,
  contentType as ogContentType,
  size as ogSize,
} from "../opengraph-image";
import robots from "../robots";
import sitemap from "../sitemap";

vi.mock("next/og", () => ({
  ImageResponse: vi.fn().mockImplementation((element, options) => ({
    element,
    options,
    status: 200,
  })),
}));

describe("App Metadata and OpenGraph Routes", () => {
  it("generates correct manifest configuration", () => {
    const result = manifest();
    expect(result.name).toBe("Rafael Martins Alves Portfolio");
    expect(result.short_name).toBe("devRMA");
    expect(result.start_url).toBe("/");
    expect(result.icons).toHaveLength(2);
  });

  it("generates correct robots configuration", () => {
    const result = robots();
    expect(result.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(result.sitemap).toBe("https://devrma.com/sitemap.xml");
    expect(result.host).toBe("https://devrma.com");
  });

  it("generates valid sitemap entries", () => {
    const result = sitemap();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].url).toBe("https://devrma.com");
    expect(result[0].changeFrequency).toBe("monthly");
    expect(result[0].priority).toBe(1);
  });

  it("generates standard icon ImageResponse", () => {
    expect(iconSize).toEqual({ width: 64, height: 64 });
    expect(iconContentType).toBe("image/png");

    const response = Icon();
    expect(response).toBeDefined();
  });

  it("generates apple touch icon ImageResponse", () => {
    expect(appleSize).toEqual({ width: 180, height: 180 });
    expect(appleContentType).toBe("image/png");

    const response = AppleIcon();
    expect(response).toBeDefined();
  });

  it("generates OpenGraph card ImageResponse", () => {
    expect(ogSize).toEqual({ width: 1200, height: 630 });
    expect(ogContentType).toBe("image/png");
    expect(ogAlt).toBe("Rafael Martins Alves - Tech Lead & Systems Architect");

    const response = OpengraphImage();
    expect(response).toBeDefined();
  });
});
