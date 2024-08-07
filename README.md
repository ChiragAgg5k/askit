| ![](public/light_landscape.png) | ![](public/dark_portrait.png) |
| :-----------------------------: | :---------------------------: |

**ASKIT** is a community-driven Q&A platform that leverages ChatGPT to expand, enhance, and get more in-depth answers to various questions from a diverse range of categories. It is built using Next.js, Prisma, and NextAuth.js.

- [🚀 Demo](https://www.askit.study/)
- [🤝 Contributing Guidelines](CONTRIBUTING.md)
- [📜 License](LICENSE.md)

## Table of Contents

- [Table of Contents](#table-of-contents)
- [✨ Features](#-features)
- [Getting Started](#getting-started)
  - [🛠️Prerequisites](#️prerequisites)
  - [Installation](#installation)
    - [Prisma](#prisma)
    - [Next Auth](#next-auth)
    - [GitHub OAuth](#github-oauth)
    - [Google OAuth](#google-oauth)
    - [OpenAI API Key](#openai-api-key)
- [🌟Usage](#usage)
- [Technologies and Services Used](#technologies-and-services-used)
- [📋 License](#-license)

## ✨ Features

- **Diverse Categories:** ASKIT offers a wide variety of categories, not limited to just tech. Users can find answers to
  their questions on topics ranging from technology to arts, science, and more.

<img src="public/diverse_categories.png" alt="Auth" width="400" height="auto" style="margin: 0 auto; display: block;">

- **AI-Powered Search:** Our AI-driven search engine makes it easier to find relevant answers quickly.

<img src="public/ai_analyzer.png" alt="AI Analyze" width="400" height="auto" style="margin: 0 auto; display: block;">

- **Secure Authentication:** We use NextAuth.js for secure and customizable authentication.

<img src="public/authentication.png" alt="Auth" width="400" height="auto" style="margin: 0 auto; display: block;">

- **Efficient Data Handling:** Prisma ensures efficient data handling and database operations.

- **Modern UI:** ASKIT boasts a clean and user-friendly interface powered by Tailwind CSS.

- **APIs:** We use tRPC for efficient and type-safe API communication.

## Getting Started

### 🛠️Prerequisites

- Node.js
- NPM or Yarn or PNPM
- Your favorite code editor

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ChiragAgg5k/askit
   cd askit
   ```

2. Install dependencies using your favorite package manager:

   ```bash
   npm install
   # pnpm install
   # yarn install
   ```

3. Create a .env file in the root directory with the following environment variables and values:

#### Prisma

- #### Specify the database connection string in the `DATABASE_URL` environment variable in the `.env` file:

```bash
DATABASE_URL="file:./db.sqlite"
```

#### Next Auth

- #### You can generate a new secret on the command line with:

  ```bash
  openssl rand -base64 32
  ```

  More info [here](https://next-auth.js.org/configuration/options#secret).

- #### NextAuth URL, specify the URL of your application for signing in and callback URLs
  ```bash
  NEXTAUTH_URL="http://localhost:3000"
  ```

#### GitHub OAuth

```bash
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

#### Google OAuth

```bash
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

#### OpenAI API Key

```bash
OPENAI_API_KEY=""
```

4. Migrate the database:

   ```bash
   npm prisma migrate dev
   ```

5. Run the development server:

   ```bash
   npm run dev
   # pnpm run dev
   # yarn dev
   ```

   Your ASKIT instance should now be running at http://localhost:3000.

## 🌟Usage

- Visit the ASKIT website [here](https://www.askit.study/).
- Sign in or create an account.
- Ask any question on any topic you would like, if it exists you will be redirected to the question page, if not you will be redirected to the create question page.
- Ask questions, provide answers, or upvote and comment on existing posts.

## Technologies and Services Used

- [T3-stack](https://create.t3.gg) - A fullstack template for Next.js, Prisma, and NextAuth.js.
- [Next.js](https://nextjs.org/) - The React Framework with Hybrid Static & Server Rendering.
- [NextAuth.js](https://next-auth.js.org) - Authentication for Next.js.
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs made easy.

## 📋 License

This project is licensed under the [MIT License](LICENSE.md) License - see the LICENSE file for details.
