# Catalog Explorer

A product catalog application built with React for the Whzan Senior Frontend Developer assignment.

## Features

- Browse products with search, filter by category/availability, and sort
- View detailed product information
- Save favorites (persists across sessions via localStorage)
- Shareable URLs (filters sync to URL params)
- Mobile-responsive design (2/3/4 column grid)
- Accessible (ARIA labels, keyboard navigation, skip links)
- Error boundary and 404 handling

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
npm install
```

## Running Locally

```bash
# Start development server (frontend + backend)
npm run dev
```

This starts:
- Frontend at http://localhost:5173
- Backend (json-server) at http://localhost:3001

## Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Running Production Build Locally

```bash
# Terminal 1: Start the backend
npm run server

# Terminal 2: Build and preview
npm run build
npm run preview
```

Note: For full production deployment, you'd need to deploy json-server separately or replace with a real backend.

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- React Router v7
- json-server (mock REST API)

## Project Structure

```
src/
├── api/           # API client functions
├── components/    # Reusable UI components
├── context/       # React Context (Favorites)
├── hooks/         # Custom hooks (useDebounce, useProducts)
├── pages/         # Route pages
├── App.jsx        # Router setup
└── main.jsx       # Entry point

server/
└── db.json        # Mock database (100 products)
```

## Routes

- `/` - Product catalog
- `/product/:id` - Product details
- `/favorites` - Saved items
