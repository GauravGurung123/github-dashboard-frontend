# GitHub Dashboard - Frontend

React + TypeScript + Vite application for GitHub contributor analytics.

## Features

- GitHub OAuth Authentication
- Repository Selection
- Contributor Analytics
- Interactive Charts (Recharts)
- Responsive Design (Tailwind CSS)

## Setup

1. Install dependencies:
```bash
   npm install
```

2. Configure environment:
```bash
   cp .env.example .env
```
   Edit `.env` with your settings.

3. Run development server:
```bash
   npm run dev
```

4. Build for production:
```bash
   npm run build
```

## Project Structure

- `/src/api` - API client and endpoints
- `/src/components` - Reusable React components
- `/src/pages` - Page components
- `/src/hooks` - Custom React hooks
- `/src/context` - Context providers
- `/src/types` - TypeScript type definitions
- `/src/utils` - Utility functions

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- Axios
- React Router
- Lucide Icons
```

## Final Structure Overview
```
frontend/
├── public/
├── src/
│   ├── api/
│   │   ├── authApi.ts
│   │   ├── client.ts
│   │   ├── dashboardApi.ts
│   │   └── repositoryApi.ts
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginButton.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── common/
│   │   │   ├── Loading.tsx
│   │   │   └── Navbar.tsx
│   │   ├── dashboard/
│   │   │   ├── ActivityTimeline.tsx
│   │   │   ├── CodeStatsChart.tsx
│   │   │   ├── CommitChart.tsx
│   │   │   ├── DashboardCard.tsx
│   │   │   └── IssuesChart.tsx
│   │   └── repository/
│   │       ├── RepoList.tsx
│   │       └── RepoSelector.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── RepositoryContext.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useDashboard.ts
│   │   └── useRepository.ts
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── NotFound.tsx
│   │   ├── RepositoryDetail.tsx
│   │   └── RepositorySelect.tsx
│   ├── types/
│   │   ├── api.ts
│   │   ├── dashboard.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── chartConfig.ts
│   │   └── helpers.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts