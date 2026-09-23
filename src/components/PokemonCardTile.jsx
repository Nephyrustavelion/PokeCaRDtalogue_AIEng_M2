import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

import { ShoppingCart, Check } from "lucide-react";

import { getCardImageSrc } from "../utils/cardImages";

import {
  TYPE_BADGE_STYLES,
  DEFAULT_TYPE_BADGE_STYLE,
  RARITY_BADGE_STYLES,
  DEFAULT_RARITY_BADGE_STYLE,
} from "../utils/pokemonTypeStyles";

import "./PokemonCardTile.css";

// Small reusable badge for Pokémon type and rarity.
function Badge({ label, style }) {
  return _jsx("span", {
    className:
      "inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded-md",

    style: {
      background: style.bg,
      color: style.text,
    },

    children: label,
  });
}

// Loading placeholder shown while card data is being fetched.
export function PokemonCardSkeleton() {
  return _jsxs("div", {
    className:
      "pokemon-card-skeleton bg-white rounded-xl border overflow-hidden",

    children: [
      _jsx("div", {
        className: "skeleton-pulse bg-[#f0eeec] aspect-[3/4] w-full",
      }),

      _jsxs("div", {
        className: "p-3 space-y-2",

        children: [
          _jsx("div", {
            className: "skeleton-pulse h-4 bg-[#f0eeec] rounded w-3/4",
          }),

          _jsx("div", {
            className: "skeleton-pulse h-3 bg-[#f0eeec] rounded w-1/2",
          }),

          _jsx("div", {
            className: "skeleton-pulse h-8 bg-[#f0eeec] rounded-lg w-full mt-2",
          }),
        ],
      }),
    ],
  });
}

export default function PokemonCardTile(props) {
  // Show skeleton while loading.
  if (props.loading) {
    return _jsx(PokemonCardSkeleton, {});
  }

  // Props passed in from Catalogue.jsx.
  const { card, inCart, onAddToCart, onEditCard, onDeleteCard } = props;

  // Select the visual style for the first Pokémon type.
  const typeStyle = card.types?.[0]
    ? (TYPE_BADGE_STYLES[card.types[0]] ?? DEFAULT_TYPE_BADGE_STYLE)
    : DEFAULT_TYPE_BADGE_STYLE;

  // Select the visual style for rarity.
  const rarityStyle = card.rarity
    ? (RARITY_BADGE_STYLES[card.rarity] ?? DEFAULT_RARITY_BADGE_STYLE)
    : null;

  const imageSrc = card.image
    ? card.source === "user" && typeof card.image === "string"
      ? card.image
      : getCardImageSrc(card.image, "high")
    : null;

  return _jsxs("div", {
    className:
      "pokemon-card-tile bg-white rounded-xl border overflow-hidden flex flex-col",

    children: [
      // CARD IMAGE
      _jsx("div", {
        className:
          "pokemon-card-image-frame relative bg-[#f8f8f7] flex items-center justify-center p-3",

        children: imageSrc
          ? _jsx("img", {
              src: imageSrc,
              alt: card.name,
              className: "card-image w-full h-full object-contain",
              loading: "lazy",
            })
          : _jsx("div", {
              className:
                "w-full h-full flex items-center justify-center text-[#d0cec8]",

              // Placeholder shown when a user-created card has no image.
              children: _jsxs("svg", {
                width: "48",
                height: "48",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1",

                children: [
                  _jsx("circle", {
                    cx: "12",
                    cy: "12",
                    r: "10",
                  }),

                  _jsx("line", {
                    x1: "2",
                    y1: "12",
                    x2: "22",
                    y2: "12",
                  }),

                  _jsx("circle", {
                    cx: "12",
                    cy: "12",
                    r: "3",
                  }),
                ],
              }),
            }),
      }),

      // CARD CONTENT
      _jsxs("div", {
        className: "p-3 flex flex-col gap-2 flex-1",

        children: [
          // Card name and ID.
          _jsxs("div", {
            children: [
              _jsx("h3", {
                className:
                  "app-text-strong text-sm font-semibold leading-tight",

                children: card.name,
              }),

              _jsx("p", {
                className: "app-text-muted text-xs mt-0.5",

                children: card.id,
              }),
            ],
          }),

          // Type and rarity badges.
          _jsxs("div", {
            className: "flex flex-wrap gap-1",

            children: [
              card.types?.slice(0, 2).map((type) =>
                _jsx(
                  Badge,
                  {
                    label: type,

                    style: TYPE_BADGE_STYLES[type] ?? DEFAULT_TYPE_BADGE_STYLE,
                  },

                  type,
                ),
              ),

              rarityStyle &&
                card.rarity &&
                _jsx(Badge, {
                  label: card.rarity,
                  style: rarityStyle,
                }),
            ],
          }),

          // Personal note only appears for user-created cards.
          card.source === "user" &&
            card.note &&
            _jsx("p", {
              className: "app-text-body text-xs",

              children: `Note: ${card.note}`,
            }),

          // Edit/Delete buttons only appear for user-created cards.
          card.source === "user" &&
            _jsxs("div", {
              className: "flex gap-2",

              children: [
                _jsx("button", {
                  type: "button",

                  onClick: () => onEditCard && onEditCard(card),

                  className:
                    "app-secondary-action flex-1 py-2 text-xs rounded-lg border",

                  children: "Edit",
                }),

                _jsx("button", {
                  type: "button",

                  onClick: () => onDeleteCard && onDeleteCard(card.id),

                  className:
                    "cart-remove-button flex-1 py-2 text-xs rounded-lg border",

                  children: "Delete",
                }),
              ],
            }),

          // Add to Cart / In Cart button.
          _jsx("div", {
            className: "mt-auto pt-1",

            children: inCart
              ? _jsxs("button", {
                  className:
                    "pokemon-card-action--in-cart w-full py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors",

                  onClick: () => onAddToCart(card),

                  children: [
                    _jsx(Check, {
                      size: 12,
                    }),

                    "In Cart",
                  ],
                })
              : _jsxs("button", {
                  className:
                    "pokemon-card-action--add w-full py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all hover:opacity-90 active:scale-[0.98]",

                  onClick: () => onAddToCart(card),

                  children: [
                    _jsx(ShoppingCart, {
                      size: 12,
                    }),

                    "Add to Cart",
                  ],
                }),
          }),
        ],
      }),
    ],
  });
}
