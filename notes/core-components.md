# Core Components

## Components needed

### Header

- logo/title links home
- nav links: Products, Favorites
- favorites count badge
- sticky top

### SearchBar

- text input with search icon
- controlled input (value + onChange props)
- accessible label (sr-only)

### FilterPanel

- category dropdown (Electronics, Clothing, Home, Sports, Books)
- availability dropdown (All, In Stock, Out of Stock)
- both controlled

### SortSelect

- dropdown: Default, Price low-high, Price high-low, Rating, Name A-Z, Name Z-A
- needs to output both sort field AND order direction

### ProductCard

- image (lazy loaded)
- name (links to detail)
- brand
- price (formatted)
- star rating
- stock badge (green/red)
- favorite toggle button
- hover effects

### ProductGrid

- responsive grid layout
- 2 cols mobile, 3 cols tablet, 4 cols desktop
- maps over products → ProductCard

## Shared patterns

- all form controls: consistent border/focus styles
- all use Tailwind
- accessible: labels, aria-labels on icon buttons

N.B Mobile first always
