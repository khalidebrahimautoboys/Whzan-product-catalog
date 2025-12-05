# Solution Document

## Requirements Analysis

### Interpretation

The assignment asks for a catalog explorer with three core features: browsing products, viewing details, and saving favorites. Beyond functionality, the requirements emphasize non-functional qualities—especially mobile experience (70% of traffic), accessibility, and shareable URLs.

I prioritized:

1. **URL-based state** for filters/search/sort (shareability requirement)
2. **Mobile-first responsive design** (70% mobile traffic)
3. **Accessibility from the start** (not bolted on after)
4. **localStorage for favorites** (persist across sessions)

### Assumptions

- **Product count**: The requirement mentions "thousands of products" but doesn't specify exact scale. I implemented pagination (12 items/page) which handles this efficiently without virtualization.
- **Categories**: Used 5 fixed categories (Electronics, Clothing, Home, Sports, Books) based on the mock data rather than dynamically fetching them.
- **Authentication**: Not required—favorites are per-browser, not per-user.

---

## Architecture Decisions

### Project Structure

```
src/
├── api/           # API client (single responsibility)
├── components/    # Reusable UI pieces
├── context/       # React Context for global state
├── hooks/         # Custom hooks for data fetching
├── pages/         # Route-level components
```

**Why this structure?**

- Clear separation of concerns
- Easy to find things—API logic in `api/`, UI in `components/`, etc.
- Scales well as the app grows
- Follows React community conventions

### Alternatives Considered

**State Management**: Could have used Redux or Zustand, but the app's state is simple:

- Filters/search/sort → URL (inherently shareable)
- Favorites → Context + localStorage
- Server data → Local component state via hooks

Adding Redux would be unnecessary complexity for this scale.

**Styling**: Considered CSS Modules, but chose Tailwind CSS because:

- Faster iteration (no context-switching to CSS files)
- Built-in responsive utilities
- Consistent design system out of the box
- Tree-shaking removes unused styles

---

## Non-Functional Requirements

### 1. Accessibility

- **Skip link**: Header includes "Skip to main content" link
- **Semantic HTML**: Using `main`, `nav`, `article`, `section` appropriately
- **ARIA labels**: All icon buttons have descriptive labels (e.g., "Add Wireless Headphones to favorites")
- **Screen reader support**: `aria-live="polite"` on results section announces changes
- **Keyboard navigation**: All interactive elements are focusable and operable
- **Focus indicators**: Visible focus rings on all interactive elements

### 2. Mobile Experience

- **Responsive grid**: 2 columns on mobile, 3 on tablet, 4 on desktop
- **Touch-friendly**: Adequate tap targets (min 44px)
- **Mobile-first CSS**: Tailwind's responsive classes build up from mobile
- **Sticky header**: Easy navigation access without scrolling

### 3. Reliability

- **Error Boundary**: Catches React errors, shows friendly message with reload option
- **API error handling**: All fetch calls have try/catch with user-friendly error messages
- **404 page**: Unknown routes show helpful "Page not found" message
- **Graceful degradation**: If localStorage is unavailable, favorites still work in-session

### 4. Performance & Scalability

- **Pagination**: Only loads 12 products at a time
- **Debounced search**: 300ms delay prevents API spam while typing
- **Request cancellation**: Stale requests are ignored when filters change mid-flight
- **Lazy loading images**: `loading="lazy"` on product images
- **Skeleton loaders**: Perceived performance improvement over blank loading states

### 5. Usability

- **Loading states**: Skeleton cards show while data loads
- **Empty states**: Clear messaging when no products found or no favorites saved
- **Immediate feedback**: Favorite toggle updates instantly (optimistic UI)
- **Clear affordances**: Buttons look clickable, links look like links

### 6. Shareability

- **URL state sync**: All filters, search, sort, and pagination sync to URL params
- **Example**: `/?q=wireless&category=Electronics&_sort=price&_order=asc&_page=2`
- **Shareable links**: Copy URL, send to someone, they see exact same view
- **Browser history**: Back/forward buttons work naturally

### 7. Maintainability

- **Component isolation**: Each component has single responsibility
- **Custom hooks**: Reusable data fetching logic (`useProducts`, `useDebounce`)
- **JSDoc comments**: IDE support and documentation for key functions
- **Barrel exports**: Clean imports via `index.js` files

### 8. Deployability

- **Environment files**: `.env.development`, `.env.staging`, `.env.production`
- **Configurable settings**: `VITE_API_URL`, `VITE_APP_TITLE` per environment
- **Build scripts**: `npm run build`, `npm run build:staging`, `npm run build:production`
- **Vite modes**: Uses `--mode` flag to load correct env file
- **Separate backend**: json-server runs independently, can be replaced with real API

---

## Trade-offs

### What I Prioritized

1. **Simplicity over features**: No infinite scroll, no complex animations, no dark mode. Focus on core requirements done well.

2. **URL state over local state**: More complex to implement, but essential for shareability requirement.

3. **Custom hooks over data-fetching libraries**: Could have used React Query or SWR, but custom hooks are simpler and sufficient for this scale.

### What I'd Do Differently With More Time

1. **Virtualization**: For truly large catalogs (10,000+ items), add react-window for virtualized scrolling.

2. **Optimistic updates**: Favorites toggle is already instant, but could add optimistic updates for other interactions.

3. **Tests**: Add unit tests for hooks and integration tests for key user flows.

4. **Storybook**: Document components in isolation for easier development and review.

5. **Better image handling**: Add placeholder images, error states for failed loads, and srcset for responsive images.

6. **Offline support**: Service worker for caching, offline favorites queue. can use dexie.js for an indexed db to store data on device. Keep device memory in mind though.

7. **Related Products and other Ecommerce functionality**: Add Ecommerce functionality to backend and frontend to allow for related products, cart etc.

8. **An Actual Backend Using Any type of Database**: Full stack development and architecture allows for a more control.

9. **Currency handling**: Currently only supports USD, but the opportunity is there to be international. perhaps it would be better to do some localization instead?

---

## Technology Choices

### JavaScript over TypeScript

**Why JavaScript:**

- Faster initial development for a time-gated assignment
- No compile step debugging
- Simpler onboarding for reviewers unfamiliar with TS

**Trade-off acknowledged:**

- TypeScript would catch type errors at compile time
- Better IDE support for larger codebases
- For a production app, I'd choose TypeScript

### Other Technology Decisions

**Vite** over Create React App:

- Faster dev server (native ES modules)
- Faster builds
- Modern defaults
- CRA is deprecated(Meta why abandon your own tech???)

**json-server** for mock API:

- Zero configuration
- Real REST API with pagination, filtering, sorting
- Easy to replace with real backend later

**React Router v7**:

- Industry standard for React routing
- Excellent URL state management via `useSearchParams`
- Familiar to most React developers

**Tailwind CSS v4**:

- Utility-first speeds up development
- Consistent design system
- Excellent responsive design support
- Small production bundle (tree-shaking)
