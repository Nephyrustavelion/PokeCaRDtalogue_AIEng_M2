import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, CheckCircle, X } from "lucide-react";
import Navbar from "../components/Navbar";
import { useApp } from "../context/AppContext";
import { getCardImageSrc } from "../utils/cardImages";
import "./Cart.css";

function CheckoutDialog({ count, onClose, onBackToCatalogue }) {
  return _jsxs("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4",
    children: [
      _jsx("div", {
        className: "absolute inset-0 bg-black/40 backdrop-blur-sm",
        onClick: onClose,
      }),
      _jsxs("div", {
        className:
          "cart-dialog-card app-surface relative w-full max-w-md bg-white rounded-2xl p-8 text-center shadow-2xl border",
        children: [
          _jsx("button", {
            onClick: onClose,
            className:
              "absolute top-4 right-4 p-1 rounded-lg hover:bg-[#f0eeec] transition-colors",
            children: _jsx(X, { size: 16, color: "#8a8a84" }),
          }),
          _jsx("div", {
            className:
              "cart-success-icon w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5",
            children: _jsx(CheckCircle, { size: 32, color: "#16a34a" }),
          }),
          _jsx("h2", {
            className: "app-heading-serif text-2xl mb-2",
            children: "Collection confirmed!",
          }),
          _jsx("p", {
            className: "app-text-body text-sm mb-1",
            children:
              "Your Pok\u00E9mon cards have been successfully checked out.",
          }),
          _jsxs("p", {
            className: "app-text-muted text-sm mb-8",
            children: [
              count,
              " card",
              count !== 1 ? "s" : "",
              " were added to your collection.",
            ],
          }),
          _jsx("button", {
            onClick: onBackToCatalogue,
            className:
              "app-primary-action w-full py-2.5 text-sm font-semibold rounded-[10px] mb-3 transition-all hover:opacity-90",
            children: "Back to Catalogue",
          }),
          _jsx("button", {
            onClick: onClose,
            className:
              "app-secondary-action w-full py-2.5 text-sm font-medium rounded-[10px] border transition-colors app-hover-muted",
            children: "Close",
          }),
        ],
      }),
    ],
  });
}
export default function Cart() {
  const { cart, removeFromCart, clearCart } = useApp();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const handleCheckout = () => setShowDialog(true);
  const handleBackToCatalogue = () => {
    clearCart();
    setShowDialog(false);
    navigate("/pokemon");
  };
  if (cart.length === 0) {
    return _jsxs("div", {
      className: "app-page",
      children: [
        _jsx(Navbar, {}),
        _jsxs("div", {
          className:
            "app-shell px-6 py-20 flex flex-col items-center text-center",
          children: [
            _jsx("div", {
              className:
                "cart-empty-icon w-16 h-16 rounded-full flex items-center justify-center mb-5",
              children: _jsx(ShoppingBag, { size: 28, color: "#8a8a84" }),
            }),
            _jsx("h2", {
              className: "app-heading-serif text-2xl mb-2",
              children: "Your cart is empty",
            }),
            _jsx("p", {
              className: "app-text-body text-sm mb-6",
              children:
                "Explore the catalogue and add some Pok\u00E9mon cards.",
            }),
            _jsx("button", {
              onClick: () => navigate("/pokemon"),
              className:
                "app-primary-action px-5 py-2.5 text-sm font-semibold rounded-[10px] transition-all hover:opacity-90",
              children: "Browse Catalogue",
            }),
          ],
        }),
      ],
    });
  }
  return _jsxs("div", {
    className: "app-page",
    children: [
      _jsx(Navbar, {}),
      showDialog &&
        _jsx(CheckoutDialog, {
          count: cart.length,
          onClose: () => setShowDialog(false),
          onBackToCatalogue: handleBackToCatalogue,
        }),
      _jsxs("div", {
        className: "app-shell px-4 sm:px-6 py-8",
        children: [
          _jsxs("div", {
            className: "mb-8",
            children: [
              _jsx("h1", {
                className: "app-heading-serif text-3xl sm:text-4xl",
                children: "My Cart",
              }),
              _jsx("p", {
                className: "app-text-body mt-1.5 text-sm",
                children:
                  "Review the cards you've collected before checking out.",
              }),
              _jsxs("p", {
                className: "app-text-muted mt-1 text-xs font-semibold",
                children: [
                  cart.length,
                  " card",
                  cart.length !== 1 ? "s" : "",
                  " in your cart",
                ],
              }),
            ],
          }),
          _jsxs("div", {
            className: "flex flex-col lg:flex-row gap-6",
            children: [
              _jsxs("div", {
                className: "flex-1 min-w-0",
                children: [
                  _jsx("div", {
                    className: "flex justify-end mb-3",
                    children: _jsx("button", {
                      onClick: clearCart,
                      className:
                        "cart-clear-button text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors",
                      children: "Clear Cart",
                    }),
                  }),
                  _jsx("div", {
                    className: "space-y-3",
                    children: cart.map(({ card }) =>
                      _jsxs(
                        "div",
                        {
                          className:
                            "cart-item flex items-center gap-4 bg-white rounded-xl border p-4 group transition-shadow hover:shadow-sm",
                          children: [
                            _jsx("div", {
                              className:
                                "cart-thumbnail shrink-0 rounded-lg overflow-hidden flex items-center justify-center",
                              children: card.image
                                ? _jsx("img", {
                                    src: getCardImageSrc(card.image, "low"),
                                    alt: card.name,
                                    className: "w-full h-full object-contain",
                                  })
                                : _jsx("div", {
                                    className: "text-[#d0cec8] text-2xl",
                                    children: "?",
                                  }),
                            }),
                            _jsxs("div", {
                              className: "flex-1 min-w-0",
                              children: [
                                _jsx("h3", {
                                  className:
                                    "app-text-strong text-sm font-semibold",
                                  children: card.name,
                                }),
                                _jsx("p", {
                                  className: "app-text-muted text-xs mt-0.5",
                                  children: card.id,
                                }),
                                (card.types || card.rarity) &&
                                  _jsx("p", {
                                    className: "app-text-body text-xs mt-1.5",
                                    children: [
                                      ...(card.types ?? []),
                                      card.rarity,
                                    ]
                                      .filter(Boolean)
                                      .join(" · "),
                                  }),
                              ],
                            }),
                            _jsx("button", {
                              onClick: () => removeFromCart(card.id),
                              className:
                                "cart-remove-button shrink-0 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100",
                              title: "Remove",
                              children: _jsx(Trash2, {
                                size: 15,
                                color: "#dc2626",
                              }),
                            }),
                          ],
                        },
                        card.id,
                      ),
                    ),
                  }),
                ],
              }),
              _jsx("aside", {
                className: "lg:w-72 shrink-0",
                children: _jsxs("div", {
                  className:
                    "cart-summary bg-white rounded-xl border p-5 sticky top-20",
                  children: [
                    _jsx("h2", {
                      className: "app-text-strong text-base font-semibold mb-4",
                      children: "Collection Summary",
                    }),
                    _jsx("div", {
                      className:
                        "cart-summary-list overflow-y-auto space-y-1 mb-4",
                      children: cart.map(({ card }) =>
                        _jsx(
                          "p",
                          {
                            className: "app-text-body text-sm py-1",
                            children: card.name,
                          },
                          card.id,
                        ),
                      ),
                    }),
                    _jsx("div", {
                      className: "app-border border-t pt-4 mb-5",
                      children: _jsxs("div", {
                        className: "flex items-baseline justify-between",
                        children: [
                          _jsx("span", {
                            className: "app-text-body text-sm",
                            children: "Total cards",
                          }),
                          _jsx("span", {
                            className: "app-heading-serif text-3xl font-bold",
                            children: cart.length,
                          }),
                        ],
                      }),
                    }),
                    _jsx("button", {
                      onClick: handleCheckout,
                      className:
                        "app-primary-action w-full py-3 text-sm font-semibold rounded-[10px] transition-all hover:opacity-90 active:scale-[0.98]",
                      children: "Checkout",
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
