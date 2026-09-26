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
  return (
    <span
      className="inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
      style={{
        background: style.bg,
        color: style.text,
      }}
    >
      {label}
    </span>
  );
}

// Loading placeholder shown while card data is being fetched.
export function PokemonCardSkeleton() {
  return (
    <div className="pokemon-card-skeleton bg-white rounded-xl border overflow-hidden">
      <div className="skeleton-pulse bg-[#f0eeec] aspect-[3/4] w-full" />

      <div className="p-3 space-y-2">
        <div className="skeleton-pulse h-4 bg-[#f0eeec] rounded w-3/4" />

        <div className="skeleton-pulse h-3 bg-[#f0eeec] rounded w-1/2" />

        <div className="skeleton-pulse h-8 bg-[#f0eeec] rounded-lg w-full mt-2" />
      </div>
    </div>
  );
}

export default function PokemonCardTile({
  loading,
  card,
  inCart,
  onAddToCart,
  onEditCard,
  onDeleteCard,
}) {
  // Show skeleton while loading.
  if (loading) {
    return <PokemonCardSkeleton />;
  }

  // Select the visual style for rarity.
  const rarityStyle = card.rarity
    ? (RARITY_BADGE_STYLES[card.rarity] ?? DEFAULT_RARITY_BADGE_STYLE)
    : null;

  const imageSrc = card.image
    ? card.source === "user" && typeof card.image === "string"
      ? card.image
      : getCardImageSrc(card.image, "high")
    : null;

  return (
    <div className="pokemon-card-tile bg-white rounded-xl border overflow-hidden flex flex-col">
      {/* Card image */}
      <div className="pokemon-card-image-frame relative bg-[#f8f8f7] flex items-center justify-center p-3">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={card.name}
            className="card-image w-full h-full object-contain"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#d0cec8]">
            {/* Placeholder for cards without an image */}
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="12" cy="12" r="10" />

              <line x1="2" y1="12" x2="22" y2="12" />

              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div>
          <h3 className="app-text-strong text-sm font-semibold leading-tight">
            {card.name}
          </h3>

          <p className="app-text-muted text-xs mt-0.5">{card.id}</p>
        </div>

        {/* Type and rarity badges */}
        <div className="flex flex-wrap gap-1">
          {card.types?.slice(0, 2).map((type) => (
            <Badge
              key={type}
              label={type}
              style={TYPE_BADGE_STYLES[type] ?? DEFAULT_TYPE_BADGE_STYLE}
            />
          ))}

          {rarityStyle && card.rarity && (
            <Badge label={card.rarity} style={rarityStyle} />
          )}
        </div>

        {/* Personal note */}
        {card.source === "user" && card.note && (
          <p className="app-text-body text-xs">Note: {card.note}</p>
        )}

        {/* User-created card controls */}
        {card.source === "user" && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onEditCard?.(card)}
              className="app-secondary-action flex-1 py-2 text-xs rounded-lg border"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => onDeleteCard?.(card.id)}
              className="cart-remove-button flex-1 py-2 text-xs rounded-lg border"
            >
              Delete
            </button>
          </div>
        )}

        {/* Add to cart */}
        <div className="mt-auto pt-1">
          {inCart ? (
            <button
              type="button"
              className="pokemon-card-action--in-cart w-full py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              onClick={() => onAddToCart(card)}
            >
              <Check size={12} />
              In Cart
            </button>
          ) : (
            <button
              type="button"
              className="pokemon-card-action--add w-full py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all hover:opacity-90 active:scale-[0.98]"
              onClick={() => onAddToCart(card)}
            >
              <ShoppingCart size={12} />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
