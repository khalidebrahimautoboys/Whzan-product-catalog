# Component Testing

## The proper way: Storybook

Storybook is ideal for this - isolate each component, test different states, document usage.

But for this prototype, it's overkill. Setting up Storybook takes time and adds complexity we don't need right now.

## Quick approach: visual test page

Instead, we'll create a simple test page that renders all components with mock data. Run the app, eyeball everything works, move on.

This is throwaway code - delete it before shipping.

## What to check
- Header: logo links work, favorites count shows
- SearchBar: typing works, icon shows
- FilterPanel: dropdowns open, options visible
- SortSelect: all options show, selection works
- ProductCard: image loads, favorite toggle works, links work
- ProductGrid: responsive layout (resize browser)

## How to run
1. `npm run dev` (starts both frontend + backend)
2. Open http://localhost:5173
3. The App.jsx will show the test page temporarily
