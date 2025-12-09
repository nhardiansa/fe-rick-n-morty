# Frontend Developer Assessment - Rick and Morty

## Setup Instructions

1. First, run the development server:

```bash
git clone https://github.com/nhardiansa/fe-rick-n-morty.git
```

2. Install the dependencies:

```bash
pnpm install
```

3. Install the dependencies:

```bash
pnpm run dev
```

## Time Tracking

Total time spent: 10 hours 50 minutes

### Breakdown by Task

#### 1. Setup - 15 minutes

Set up the project and installed dependencies.

#### 2. Copying UI and Adjust in Project from v0 - 20 minutes

Migrating UI components and adjusting them into the new project structure.

#### 3. Making Filter for List - 4.5 hours

Implemented the filter functionality for the character list.
The process involved switching from SSR (Server-Side Rendering) to SSG (Static Site Generation).

#### 4. Making Details Character - 4.6 hours

Created the character detail page. This task included:

- Refactoring code.
- Moving data-fetching style from SSR to SSG because I failed to build using cloudflare.
- Implementing features like a loading indicator and ensuring responsiveness.

#### 5. Deployment - 30 minutes

Deployed the application. Initially faced issues with SSR build but resolved them by switching to SSG.
