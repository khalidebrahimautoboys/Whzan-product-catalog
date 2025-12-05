# Pages & Routing

## Routes needed

```
/                → CatalogPage (product listing)
/product/:id     → ProductDetailPage (single product)
/favorites       → FavoritesPage (saved items)
```

## CatalogPage

The big one. Needs to:

- read filters/sort/page from URL (shareable links requirement)
- sync state back to URL when user changes filters
- use debounced search
- show loading/error states
- pagination controls

URL params:

- `q` - search query
- `category` - category filter
- `inStock` - stock filter
- `_sort` - sort field
- `_order` - sort direction
- `_page` - current page

Example: `/?q=wireless&category=Electronics&_sort=price&_order=asc&_page=2`

## ProductDetailPage

Simple:

- grab id from URL params
- fetch single product
- show details + favorite button
- back link to catalog

## FavoritesPage

- get favorite IDs from context
- fetch each product by ID
- display as grid
- handle empty state

## Router setup

Using React Router v6. BrowserRouter already wrapped in main.jsx.
Just need Routes + Route in App.jsx.

## My folder naming

Pages are how ive always done it, the wording can change and doesnt make too much of a difference but ill go with what im familiar with.
TODO discuss folder in video
