# pintu-challenge

## Table of Contents

- [pintu-challenge](#pintu-challenge)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Testing](#testing)
  - [Architecture](#architecture)
  - [Tech Stack](#tech-stack)
  - [To Improve](#to-improve)

## Getting Started

This section provides instructions on how to set up and run the project locally. Follow the steps below:

1. Copy the `.env.example` file to `.env.local` and fill in the necessary values.
2. Install the project dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

   You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

   API routes can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`. The `pages/api` directory is mapped to `/api/*` and treated as API routes instead of React pages.

   This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to optimize and load the Inter font, a custom Google Font.

## Testing

To run tests, follow these steps:

1. Create a file called `index.spec.(ts|tsx)` in the corresponding folder to write your test cases using `jest` and `react-testing-library`.
2. Run the tests using the command:

   ```bash
   npm run test
   # or
   yarn test
   # or
   pnpm run test
   ```

## Architecture

To understand the project's architecture, refer to the [architecture documentation](./docs/architecture.md).

## Tech Stack

- Next.js (pages routing)
- React Table
- React Query
- Tailwind CSS
- TypeScript
- Jest
- React Testing Library

If you're curios about the rationale behind the tech stack, refer to the [tech stack background documentation](./docs/tech-stack-background.md).

## To Improve

- Add logging
- Add GA4 tracking
- Improve accessibility
  - Add `aria-label` to links
  - Add shortcut for Search (e.g., `CMD + K`)
  - Ensure dropdown and search functionality can be accessed using the keyboard
- Add E2E tests
