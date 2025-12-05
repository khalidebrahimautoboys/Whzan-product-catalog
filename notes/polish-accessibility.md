# Polish & Accessibility

We need some error handling and better loading.. I'll ask ai what other stuff we can add here

## What we already have

- skip link in Header (jumps to main content)
- aria-labels on icon buttons
- aria-live on results section
- semantic HTML (main, nav, article, section)
- sr-only labels on form inputs
- role="list" on product grid

## Still need

### Error Boundary

Catch React errors so app doesn't white-screen. Show friendly message instead.

### Loading skeleton

Replace "Loading..." text with skeleton cards - feels faster.

### Focus management

When navigating to new page, focus should move to main content.
Currently relies on skip link but could be smoother.

### 404 page

Handle unknown routes gracefully.

## Nice to have but skipping

- dark mode
- animations/transitions polish
- toast notifications for favorite add/remove

## Implementation

1. Create ErrorBoundary component
2. Create LoadingSkeleton component
3. Add 404 route
4. Clean up any remaining a11y issues
