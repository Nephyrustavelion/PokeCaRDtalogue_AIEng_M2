import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Trash2,
  ShoppingBag,
  CheckCircle,
  X,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { useApp } from "../context/AppContext";
import { getCardImageSrc } from "../utils/cardImages";

import "./Cart.css";

function CheckoutDialog({
  count,
  onClose,
  onBackToCatalogue,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="cart-dialog-card app-surface relative w-full max-w-md bg-white rounded-2xl p-8 text-center shadow-2xl border">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-[#f0eeec] transition-colors"
        >
          <X
            size={16}
            color="#8a8a84"
          />
        </button>

        <div className="cart-success-icon w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle
            size={32}
            color="#16a34a"
          />
        </div>

        <h2 className="app-heading-serif text-2xl mb-2">
          Collection confirmed!
        </h2>

        <p className="app-text-body text-sm mb-1">
          Your Pokémon cards have been successfully
          checked out.
        </p>

        <p className="app-text-muted text-sm mb-8">
          {count} card{count !== 1 ? "s" : ""} were
          added to your collection.
        </p>

        <button
          type="button"
          onClick={onBackToCatalogue}
          className="app-primary-action w-full py-2.5 text-sm font-semibold rounded-[10px] mb-3 transition-all hover:opacity-90"
        >
          Back to Catalogue
        </button>

        <button
          type="button"
          onClick={onClose}
          className="app-secondary-action w-full py-2.5 text-sm font-medium rounded-[10px] border transition-colors app-hover-muted"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
  } = useApp();

  const navigate = useNavigate();

  const [showDialog, setShowDialog] =
    useState(false);

  const handleCheckout = () => {
    setShowDialog(true);
  };

  const handleBackToCatalogue = () => {
    clearCart();
    setShowDialog(false);
    navigate("/catalogue");
  };

  if (cart.length === 0) {
    return (
      <div className="app-page">
        <Navbar />

        <div className="app-shell px-6 py-20 flex flex-col items-center text-center">
          <div className="cart-empty-icon w-16 h-16 rounded-full flex items-center justify-center mb-5">
            <ShoppingBag
              size={28}
              color="#8a8a84"
            />
          </div>

          <h2 className="app-heading-serif text-2xl mb-2">
            Your cart is empty
          </h2>

          <p className="app-text-body text-sm mb-6">
            Explore the catalogue and add some Pokémon
            cards.
          </p>

          <button
            type="button"
            onClick={() => navigate("/catalogue")}
            className="app-primary-action px-5 py-2.5 text-sm font-semibold rounded-[10px] transition-all hover:opacity-90"
          >
            Browse Catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <Navbar />

      {showDialog && (
        <CheckoutDialog
          count={cart.length}
          onClose={() => setShowDialog(false)}
          onBackToCatalogue={
            handleBackToCatalogue
          }
        />
      )}

      <div className="app-shell px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="app-heading-serif text-3xl sm:text-4xl">
            My Cart
          </h1>

          <p className="app-text-body mt-1.5 text-sm">
            Review the cards you've collected before
            checking out.
          </p>

          <p className="app-text-muted mt-1 text-xs font-semibold">
            {cart.length} card
            {cart.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart items */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-end mb-3">
              <button
                type="button"
                onClick={clearCart}
                className="cart-clear-button text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors"
              >
                Clear Cart
              </button>
            </div>

            <div className="space-y-3">
              {cart.map(({ card }) => (
                <div
                  key={card.id}
                  className="cart-item flex items-center gap-4 bg-white rounded-xl border p-4 group transition-shadow hover:shadow-sm"
                >
                  <div className="cart-thumbnail shrink-0 rounded-lg overflow-hidden flex items-center justify-center">
                    {card.image ? (
                      <img
                        src={getCardImageSrc(
                          card.image,
                          "low",
                        )}
                        alt={card.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-[#d0cec8] text-2xl">
                        ?
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="app-text-strong text-sm font-semibold">
                      {card.name}
                    </h3>

                    <p className="app-text-muted text-xs mt-0.5">
                      {card.id}
                    </p>

                    {(card.types ||
                      card.rarity) && (
                      <p className="app-text-body text-xs mt-1.5">
                        {[
                          ...(card.types ?? []),
                          card.rarity,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeFromCart(card.id)
                    }
                    className="cart-remove-button shrink-0 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove"
                  >
                    <Trash2
                      size={15}
                      color="#dc2626"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart summary */}
          <aside className="lg:w-72 shrink-0">
            <div className="cart-summary bg-white rounded-xl border p-5 sticky top-20">
              <h2 className="app-text-strong text-base font-semibold mb-4">
                Collection Summary
              </h2>

              <div className="cart-summary-list overflow-y-auto space-y-1 mb-4">
                {cart.map(({ card }) => (
                  <p
                    key={card.id}
                    className="app-text-body text-sm py-1"
                  >
                    {card.name}
                  </p>
                ))}
              </div>

              <div className="app-border border-t pt-4 mb-5">
                <div className="flex items-baseline justify-between">
                  <span className="app-text-body text-sm">
                    Total cards
                  </span>

                  <span className="app-heading-serif text-3xl font-bold">
                    {cart.length}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="app-primary-action w-full py-3 text-sm font-semibold rounded-[10px] transition-all hover:opacity-90 active:scale-[0.98]"
              >
                Checkout
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}