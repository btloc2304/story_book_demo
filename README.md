<p align="center">
  <img src="https://img.shields.io/badge/Lucent_UI-Design_System-3186FF?style=for-the-badge&logo=angular&logoColor=white" alt="Lucent UI" />
</p>

<h1 align="center">✨ Lucent UI</h1>

<p align="center">
  <strong>A modern Angular 18 component library, designed in Figma, documented with Storybook 8, and secured with Cloudflare Zero Trust (Google SSO).</strong>
</p>

<p align="center">
  <a href="https://lucent-storybook.pages.dev/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI">
    <img src="https://img.shields.io/badge/🎨_Figma-Design_File-F24E1E?style=flat-square&logo=figma&logoColor=white" alt="Figma" />
  </a>
  <a href="https://github.com/btloc2304/story_book_demo/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/btloc2304/story_book_demo/chromatic.yml?style=flat-square&label=Chromatic" alt="CI Status" />
  </a>
  <a href="https://github.com/btloc2304/story_book_demo">
    <img src="https://img.shields.io/github/last-commit/btloc2304/story_book_demo?style=flat-square" alt="Last Commit" />
  </a>
</p>

---

## 📖 About

**Lucent UI** is an enterprise-ready Angular design system that bridges the gap between **design** and **development**. Every component is:

- 🎨 **Designed in Figma** — pixel-perfect specs from a shared design token system.
- 🧩 **Built as Angular Standalone Components** — modern, tree-shakable, zero NgModule boilerplate.
- 📚 **Documented in Storybook 8** — interactive playground with controls, accessibility checks, and visual regression tests.
- 🔒 **Enterprise-Secured** — protected by **Cloudflare Zero Trust (Access)** with Google Workspace / Google OAuth 2.0 SSO and an integrated logout control.
- 🚀 **Auto-deployed** — continuous deployment to **Cloudflare Pages** on every push to `master`.

> This project is a living style guide and component catalog for the **Lucent UI** design system.

---

## 🔒 Authentication & Security

This Storybook deployment is fortified with **server-side authentication** at the Cloudflare Edge network:

* **Authentication Provider:** Cloudflare Zero Trust (Access).
* **Identity Provider (IdP):** Google OAuth 2.0 (Google Workspace / Whitelisted Accounts).
* **Protection Level:** Edge-level gate (unauthorized users cannot download or view any static assets).
* **Session Management:** 24-hour token duration with an integrated **🚪 Logout button** in the Storybook UI.
* 📘 **Setup Documentation:** Full step-by-step IT guide available in [`docs/cloudflare-access-setup.md`](./docs/cloudflare-access-setup.md).

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

- **Node.js** ≥ 20
- **npm** ≥ 10

### Installation

```bash
# Clone the repository
git clone https://github.com/btloc2304/story_book_demo.git
cd story_book_demo

# Install dependencies (handled automatically via .npmrc)
npm ci --legacy-peer-deps
```

### Run Storybook locally

```bash
npm run storybook
```

Storybook will be available at **http://localhost:6006/**.

### Build Storybook for production

```bash
npm run build-storybook
```

Output will be generated in `./storybook-static/`.

---

## 🏗️ Project Structure

```
story_book_demo/
├── .github/workflows/       # CI/CD (Chromatic & Cloudflare deploy workflows)
├── docs/                     # Setup & architecture guides
│   └── cloudflare-access-setup.md
├── projects/lucent-ui/
│   ├── .storybook/           # Storybook configuration & manager customizations
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
├── .npmrc                    # npm legacy-peer-deps configuration
├── fix-figma-links.js        # Auto-sync Figma node IDs → stories
├── AGENTS.md                 # AI agent verification rules
└── README.md                 # ← You are here
```

---

## 🔗 Links & Resources

| Resource | URL |
|---|---|
| 🚀 **Live Demo (Secured)** | [lucent-storybook.pages.dev](https://lucent-storybook.pages.dev/) |
| 🎨 **Figma Design** | [Lucent UI on Figma](https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI) |
| 📦 **GitHub Repository** | [btloc2304/story_book_demo](https://github.com/btloc2304/story_book_demo) |
| 🔒 **Access Setup Guide** | [Cloudflare Access Guide](./docs/cloudflare-access-setup.md) |

---

## 🛠️ Tech Stack

<p>
  <img src="https://img.shields.io/badge/Angular-18-DD0031?style=flat-square&logo=angular&logoColor=white" />
  <img src="https://img.shields.io/badge/Storybook-8-FF4785?style=flat-square&logo=storybook&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudflare_Zero_Trust-F38020?style=flat-square&logo=cloudflare&logoColor=white" />
  <img src="https://img.shields.io/badge/Google_OAuth_2.0-4285F4?style=flat-square&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white" />
  <img src="https://img.shields.io/badge/Chromatic-FC521F?style=flat-square&logo=chromatic&logoColor=white" />
</p>

---

## 📄 License

This project is created for demonstration and enterprise design system showcases.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/btloc2304">Bui Ta Loc</a>
</p>
