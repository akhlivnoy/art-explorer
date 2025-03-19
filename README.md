# Art Explorer

Art Explorer is a modern web application built with React, Vite, TypeScript, and Tailwind CSS. It provides an intuitive interface for exploring and discovering artwork.

## 🚀 Key Technologies

- **React 19** — Modern UI framework
- **Vite** — Fast build tool
- **TypeScript** — Static typing
- **Zustand** — State management
- **TanStack Query** — Data fetching and caching
- **TanStack Router** — Type-safe routing
- **i18next** — Internationalization
- **Tailwind CSS** — Styling
- **shadcn/ui** — Pre-built accessible UI components
- **ESLint & Prettier** — Code formatting and linting

## 📋 Requirements

- **Node.js** >= 20.5.0
- **Yarn** 3.6.4 (a locally installed version is used)

## 🖥 Recommended IDE Setup

We recommend using **VS Code** for development.

### 🔌 Recommended Extensions:

Install the following extensions for an optimal development experience:

- **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)** (`dbaeumer.vscode-eslint`) — Linting support
- **[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)** (`esbenp.prettier-vscode`) — Code formatting
- **[File Watcher](https://marketplace.visualstudio.com/items?itemName=appulate.filewatcher)** (`appulate.filewatcher`) — File monitoring
- **[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)** (`bradlc.vscode-tailwindcss`) — Autocomplete and class suggestions

To automatically install recommended extensions, open VS Code and accept the **workspace recommendations**.

## 🔑 Environment Variables

This project uses environment variables for configuration.

### Default `.env` file:

```env
VITE_API_BASE_URL=https://dummyjson.com
```

### Optional:

You can optionally add the following variables to `.env.local` to configure the default browser for launching the development server:

```env
BROWSER=chrome
BROWSER_ARGS=--incognito
```

## 🔧 Installation and Setup

### 1️⃣ Install dependencies

```sh
corepack enable
yarn install
```

### 2️⃣ Run the development server

```sh
yarn dev
```

This starts a local development server with hot module replacement.

### 3️⃣ Build the project

```sh
yarn build
```

This compiles the application for production.

### 4️⃣ Preview the production build

```sh
yarn preview
```

## Typography

![Typography](./assets/typography.png 'Typography')

### 📝 Notes

- The project uses a **locally installed** version of Yarn to ensure consistency across the team.
- Husky is configured to run pre-commit hooks.
- Make sure to use the correct Node.js version for compatibility.
