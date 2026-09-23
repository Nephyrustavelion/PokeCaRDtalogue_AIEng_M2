Design a responsive desktop-first Pokémon trading card catalogue web application called **PokeCaRDtalogue**.

The application allows users to log in, browse Pokémon cards, filter/search the catalogue, add cards to a cart, and complete a mock checkout.

Use a modern **shadcn/ui-inspired design system** with clean layouts, subtle borders, generous spacing, rounded cards, restrained shadows, accessible states, and reusable components.

Do NOT make the interface look childish or overly themed like the Pokémon games. Pokémon card artwork should provide most of the visual colour. Keep the surrounding application UI clean, neutral and modern.

## Design Direction

Style:
- shadcn/ui aesthetic
- Modern catalogue / collection management application
- Light neutral background
- White or slightly tinted surface cards
- Rounded corners around 8–12px
- Subtle borders rather than heavy shadows
- Strong typography hierarchy
- Pokémon card artwork is the visual focus
- Small yellow or electric accent may be used selectively for primary actions
- Avoid excessive Pokémon-themed graphics
- Desktop-first but responsive down to mobile

Typography:
- Clean sans-serif similar to Inter
- Large editorial headings
- Compact UI typography for filters and metadata

Create reusable Figma components for:
- Button
- Input
- Search Input
- Card
- Badge
- Checkbox
- Slider
- Separator
- Navigation
- Pokémon Card Tile
- Quantity / cart controls
- Pagination
- Dialog
- Empty State
- Skeleton / loading state

Use shadcn/ui patterns wherever appropriate:
`Button`, `Card`, `Input`, `Label`, `Badge`, `Checkbox`, `Slider`, `Separator`, `ScrollArea`, `Dialog`, `AlertDialog`, `Skeleton`, `Tooltip`, `Sheet`, and pagination components.

---

# Global Navigation

For authenticated pages, create a shared top navigation bar.

Left:
- PokeCaRDtalogue logo / wordmark

Navigation:
- Catalogue
- My Cart

Right:
- Cart icon with item-count badge
- User avatar / username
- Logout action

The active page should have a clear but understated selected state.

---

# PAGE 1 — Login

Create a split-screen login page.

## Left Side — Animated Pokémon Showcase

Approximately 50–55% of the screen.

Display one large Pokémon trading card in the centre.

The card should feel like a collectible card showcase rather than a simple static image.

Interaction prototype:

1. Display a random Pokémon card.
2. After several seconds, the card performs a smooth 3D Y-axis flip/spin animation.
3. During the midpoint of the rotation, change to another random Pokémon card.
4. Complete the rotation showing the new Pokémon card.
5. Repeat automatically.

Add very subtle ambient visual treatment behind the card:
- soft gradient
- faint radial glow
- very subtle Pokémon-type-inspired colour variation

Keep the background minimal so that the card remains the focus.

Include a small caption such as:

"Thousands of cards waiting to be discovered."

## Right Side — Login Form

Approximately 45–50% of the screen.

Content:

Small eyebrow:
A HOME FOR YOUR FAVOURITE CARDS

Large heading:
PokeCaRDtalogue

Description:
"Explore Pokémon trading-card artwork and build your personal collection."

Since this is a demo application, use:

Label:
Your name

Input placeholder:
Enter your name

Primary button:
Explore cards

Secondary muted helper text:
"Demo login — choose any name. No password required."

Validation state:
"Please enter a name, not just spaces."

Use:
- Card
- Input
- Label
- Button
- Alert/error text

The form should be vertically centred and no wider than roughly 400–440px.

---

# PAGE 2 — Catalogue

This is the main application screen.

Use the shared top navigation.

Below the navbar, create a two-column layout:

LEFT:
Filter sidebar

RIGHT:
Catalogue results

## Catalogue Header

At the top of the content area:

Eyebrow:
DISCOVER · COLLECT · REVISIT

Heading:
"A world of cards.
A collection that's yours."

Description:
"Explore Pokémon trading cards and add the cards you love to your collection."

Under this, display result information such as:

"1,284 matching cards · 24 shown"

---

## Left Filter Sidebar

Create a persistent desktop filter panel approximately 260–300px wide.

On mobile/tablet, convert this sidebar into a shadcn `Sheet` opened using a "Filters" button.

At the top:

### Search

Use a search input with search icon.

Placeholder:
"Search Pokémon or card ID..."

Search across:
- Pokémon name
- Card ID

Include a clear-search icon when text exists.

---

### Filters

Organise filters into clearly separated sections.

Use shadcn:
- Checkbox
- Badge
- Slider
- Separator
- Collapsible sections where helpful

Example sections:

### Pokémon Type

Checkboxes:
- Fire
- Water
- Grass
- Electric
- Psychic
- Fighting
- Darkness
- Metal
- Dragon
- Colourless

Allow multiple selections.

Selected filters should also appear above the catalogue as removable `Badge` components.

---

### Rarity

Checkboxes:
- Common
- Uncommon
- Rare
- Ultra Rare
- Secret Rare

---

### Weight

Use a range slider.

Example labels:
0 kg — 1,000 kg

Optionally supplement the slider with useful checkbox ranges:

- Under 10 kg
- 10–50 kg
- 50–100 kg
- 100 kg+

Users should be able to select multiple filter options.

---

### Additional Filter

Include at least one more practical filtering category such as:

Generation:
- Gen I
- Gen II
- Gen III
- Gen IV
- Gen V
- Gen VI
- Gen VII
- Gen VIII
- Gen IX

OR

HP range:
- Under 100
- 100–199
- 200–299
- 300+

---

At the bottom of the filter panel:

Secondary button:
Clear all filters

If more than three filters are selected, keep the selected state clear and manageable rather than allowing the sidebar to become visually noisy.

---

# Catalogue Card Grid

Use a responsive card grid.

Desktop:
4 cards per row where space permits.

Large desktop:
Potentially 5 cards per row.

Tablet:
2–3 cards per row.

Mobile:
1–2 cards per row.

Each Pokémon result should use a reusable `PokemonCard` component.

Card anatomy:

1. Pokémon trading card image
2. Pokémon/card name
3. Card ID in muted text
4. Optional metadata badges
5. Primary cart action

Example:

Charizard

base1-4

[Fire] [Rare]

[ Add to Cart ]

When added, change the action to a clear selected state:

✓ In Cart

or provide:

[−] 1 [+]

Do NOT use bookmarks or bookmark icons.

The main collection action throughout the application is **Add to Cart**.

Hover state:
- Slight card elevation
- Image moves upward by a few pixels
- Action becomes slightly more prominent

Keep animations subtle.

---

# Pagination

At the bottom of the catalogue use a shadcn-style pagination component.

Example:

Previous   1  2  3  4  ...  18   Next

Maintain the existing application concept of showing approximately 24 cards at once.

Also design:

### Loading state
Grid of `Skeleton` Pokémon cards.

### Error state
Card or Alert containing:
"Could not load cards."

Button:
Retry

### No Results state

Heading:
"No Pokémon found"

Description:
"Try changing your search or removing some filters."

Button:
Clear filters

---

# PAGE 3 — My Cart

Create a cart / collection checkout screen.

Use the shared navigation.

Page heading:

My Cart

Supporting text:

"Review the cards you've collected before checking out."

Display:

"8 cards in your cart"

Use a two-column desktop layout.

LEFT:
Cart items

RIGHT:
Sticky checkout summary

---

## Cart Items

Each cart item should be displayed as a horizontal card/list item rather than using the full catalogue card design.

Each row contains:

- Small Pokémon card thumbnail
- Pokémon/card name
- Card ID
- Metadata badges if available
- Remove button / trash icon

Example:

[Card Image]

Charizard
base1-4
Fire · Rare

Remove

Allow the user to remove individual cards.

Above or below the list, include:

Secondary destructive-style action:
Clear Cart

Do NOT show pricing anywhere.

This application treats cards as collection items rather than products with monetary value.

---

# Cart Summary Panel

The right-side panel should remain sticky while scrolling on desktop.

Use a shadcn `Card`.

Heading:
Collection Summary

Then show a compact list of Pokémon/card names currently in the cart.

Example:

Charizard
Pikachu
Bulbasaur
Mewtwo
Gengar

If there are many cards, put this list inside `ScrollArea`.

Add a `Separator`.

Then display prominently:

Total cards
8

Do NOT show:
- Price
- Subtotal
- Tax
- Shipping
- Currency

At the bottom:

Large full-width primary button:
Checkout

---

# Checkout Success Dialog

When the user clicks Checkout, open a shadcn `Dialog`.

Do NOT navigate to a separate checkout page.

Dialog layout:

Large success/check-circle icon

Heading:
Collection confirmed!

Description:
"Your Pokémon cards have been successfully checked out."

Optional supporting line:
"8 cards were added to your collection."

Primary button:
Back to Catalogue

Optional secondary button:
Close

Clicking "Back to Catalogue":
1. closes the modal
2. clears the cart
3. navigates the user to the Catalogue page

Create this as an interactive Figma prototype.

---

# Empty Cart State

If no cards are in the cart, show a centred empty state.

Optional simple icon:
Shopping bag / cards

Heading:
"Your cart is empty"

Description:
"Explore the catalogue and add some Pokémon cards."

Primary button:
Browse Catalogue

---

# Important Prototype Interactions

Prototype these interactions:

1. Login → Catalogue
2. Animated/random Pokémon card rotation on Login
3. Search field interaction
4. Selecting multiple filter checkboxes
5. Selected filters appearing as removable badges
6. Clear filters
7. Add Pokémon card to cart
8. Cart count updates in navbar
9. Catalogue → My Cart
10. Remove card from cart
11. Clear cart
12. Checkout → success Dialog
13. Success Dialog → Back to Catalogue
14. Empty cart state
15. Desktop filter sidebar → mobile filter Sheet

---

# Figma Component Structure

Build the design using reusable components and variants.

Suggested component organisation:

Navigation
- Navbar / Default
- Navbar / With Cart Items

Buttons
- Primary
- Secondary
- Ghost
- Destructive
- Icon

PokemonCard
- Default
- Hover
- In Cart
- Loading

FilterBadge
- Default
- Removable

Checkbox
- Checked
- Unchecked

CartItem
- Default
- Hover

Dialog
- Checkout Success

EmptyState
- No Search Results
- Empty Cart
- Error

Use Auto Layout consistently.

Use proper component variants instead of duplicating components.

---

# Technical Context

This design will eventually be implemented as a React application.

Current architecture contains:
- React Router
- Login page
- Protected/authenticated layout
- Pokémon catalogue
- Context API
- client-side search
- pagination
- loading/error states
- Pokémon card API data

The existing Bookmark feature will be refactored into a Cart feature.

Expected routes:

/
→ Login

/pokemon
→ Catalogue

/cart
→ My Cart

The catalogue currently uses TCGdex Pokémon trading card artwork.

Design components so they can map naturally to React and **shadcn/ui** components later.

Prioritise a realistic, implementable UI over purely decorative concepts.