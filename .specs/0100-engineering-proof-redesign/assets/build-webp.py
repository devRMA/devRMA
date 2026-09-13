from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[3]
SCREENSHOTS = Path(__file__).resolve().parent / "screenshots"
PUBLIC_PROJECTS = ROOT / "public" / "projects"

DERIVATIVES = [
    (ROOT / "public" / "app-iship.png", None, (1280, 720), "iship-card.webp"),
    (SCREENSHOTS / "a1-test-acuity-desktop.png", (760, 0, 3080, 1450), (1200, 750), "a1-card.webp"),
    (SCREENSHOTS / "electrolux-acuity-desktop.png", (850, 230, 2990, 1567), (1200, 750), "electrolux-card.webp"),
    (SCREENSHOTS / "a1-test-setup-desktop.png", (1180, 700, 2740, 1320), (1248, 496), "a1-setup.webp"),
    (SCREENSHOTS / "a1-test-completed-desktop.png", (1180, 640, 2660, 1380), (1200, 600), "a1-completed.webp"),
    (SCREENSHOTS / "a1-test-acuity-mobile.png", (0, 0, 825, 1466), (619, 1100), "a1-mobile-acuity.webp"),
    (SCREENSHOTS / "a1-test-completed-mobile.png", (0, 0, 825, 1466), (619, 1100), "a1-mobile-completed.webp"),
    (SCREENSHOTS / "electrolux-color-desktop.png", (870, 560, 2970, 1870), (1280, 798), "electrolux-ishihara.webp"),
    (SCREENSHOTS / "electrolux-report-desktop.png", (1380, 140, 2470, 1730), (880, 1283), "electrolux-report.webp"),
]


def main() -> None:
    PUBLIC_PROJECTS.mkdir(parents=True, exist_ok=True)
    for src, box, out, name in DERIVATIVES:
        img = Image.open(src).convert("RGB")
        if box is not None:
            img = img.crop(box)
        img.resize(out, Image.LANCZOS).save(PUBLIC_PROJECTS / name, "WEBP", quality=82, method=6)
        print(f"{name}: {(PUBLIC_PROJECTS / name).stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
