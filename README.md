<p align="center">
  <img src="https://img.shields.io/badge/Lucent_UI-Design_System-3186FF?style=for-the-badge&logo=angular&logoColor=white" alt="Lucent UI" />
</p>

<h1 align="center">✨ Lucent UI</h1>

<p align="center">
  <strong>A modern Angular component library, designed in Figma and documented with Storybook.</strong>
</p>

<p align="center">
  <a href="https://btloc2304.github.io/story_book_demo/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-GitHub_Pages-222?style=flat-square&logo=github" alt="Live Demo" />
  </a>
  <a href="https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI">
    <img src="https://img.shields.io/badge/🎨_Figma-Design_File-F24E1E?style=flat-square&logo=figma&logoColor=white" alt="Figma" />
  </a>
  <a href="https://github.com/btloc2304/story_book_demo/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/btloc2304/story_book_demo/deploy-storybook.yml?style=flat-square&label=Deploy" alt="Deploy Status" />
  </a>
  <a href="https://github.com/btloc2304/story_book_demo">
    <img src="https://img.shields.io/github/last-commit/btloc2304/story_book_demo?style=flat-square" alt="Last Commit" />
  </a>
</p>

---

## 📖 About

**Lucent UI** is an Angular-based design system that bridges the gap between **design** and **development**. Every component is:

- 🎨 **Designed in Figma** — pixel-perfect specs from a shared design file.
- 🧩 **Built as Angular Standalone Components** — modern, tree-shakable, zero NgModule boilerplate.
- 📚 **Documented in Storybook** — interactive playground with controls, accessibility checks, and visual regression tests.
- 🚀 **Auto-deployed** — every push to `master` builds and publishes to GitHub Pages via CI/CD.

> This project is a **Storybook demo**, not an npm package. It serves as a living style guide and component catalog.

---

## 🧩 Components

| Component | Description | Status |
|---|---|---|
| **Accordion** | Expandable/collapsible content sections | ✅ Ready |
| **Badge** | Status indicators with solid, dim, and ghost styles | ✅ Ready |
| **Button** | Primary action element with solid, dim, ghost variants | ✅ Ready |
| **Checkbox** | Multi-select toggle control | ✅ Ready |
| **Dialog** | Modal overlay with backdrop, ESC-to-close | ✅ Ready |
| **Icon** | SVG icon wrapper with size variants | ✅ Ready |
| **Input** | Text field with focus, error, disabled states | ✅ Ready |
| **Menu** | Dropdown menu with click-outside dismiss | ✅ Ready |
| **Progress Bar** | Determinate/indeterminate loading indicator | ✅ Ready |
| **Radio** | Single-select option control | ✅ Ready |
| **Segmented Control** | Tabbed toggle with animated indicator | ✅ Ready |
| **Slider** | Range input with labeled variants | ✅ Ready |
| **Tab** | Navigation tabs with active state tracking | ✅ Ready |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/btloc2304/story_book_demo.git
cd story_book_demo

# Install dependencies (--legacy-peer-deps required due to Storybook/Angular peer conflicts)
npm ci --legacy-peer-deps
```

### Run Storybook locally

```bash
npm run storybook
```

Storybook will be available at **http://localhost:6008/**.

### Build Storybook for production

```bash
npm run build-storybook
```

Output will be in `./storybook-static/`.

---

## 🏗️ Project Structure

```
story_book_demo/
├── .github/workflows/       # CI/CD (deploy + Chromatic)
├── .storybook/               # Storybook configuration
├── projects/lucent-ui/
│   └── src/lib/
│       ├── lucent-accordion/
│       ├── lucent-badge/
│       ├── lucent-button/
│       ├── lucent-checkbox/
│       ├── lucent-dialog/
│       ├── lucent-icon/
│       ├── lucent-input/
│       ├── lucent-menu/
│       ├── lucent-progress-bar/
│       ├── lucent-radio/
│       ├── lucent-segmented-control/
│       ├── lucent-slider/
│       └── lucent-tab/
├── fix-figma-links.js        # Auto-sync Figma node IDs → stories
├── AGENTS.md                 # AI agent verification rules
└── README.md                 # ← You are here
```

Each component folder contains:
- `*.component.ts` — Angular component logic (standalone)
- `*.component.scss` — Styles
- `*.stories.ts` — Storybook stories with controls & docs
- `*.component.spec.ts` — Unit test scaffold

---

## 🔗 Links

| Resource | URL |
|---|---|
| 🚀 **Live Demo** | [btloc2304.github.io/story_book_demo](https://btloc2304.github.io/story_book_demo/) |
| 🎨 **Figma Design** | [Lucent UI on Figma](https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI) |
| 📦 **GitHub Repo** | [btloc2304/story_book_demo](https://github.com/btloc2304/story_book_demo) |

---

## 🛠️ Tech Stack

<p>
  <img src="https://img.shields.io/badge/Angular-18-DD0031?style=flat-square&logo=angular&logoColor=white" />
  <img src="https://img.shields.io/badge/Storybook-8-FF4785?style=flat-square&logo=storybook&logoColor=white" />
  <img src="https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white" />
  <img src="https://img.shields.io/badge/Chromatic-FC521F?style=flat-square&logo=chromatic&logoColor=white" />
</p>

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/my-component`)
3. Commit changes (`git commit -m "feat: add my-component"`)
4. Push to your fork (`git push origin feat/my-component`)
5. Open a Pull Request

> **Note:** Please read [AGENTS.md](./AGENTS.md) for verification rules that apply to all contributors (human and AI).

---

## 📄 License

This project is for demo and educational purposes.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/btloc2304">Bui Ta Loc</a>
</p>
