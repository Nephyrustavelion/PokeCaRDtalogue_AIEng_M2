import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "./Login.css";
const SHOWCASE_CARDS = [
  {
    id: "base1-4",
    name: "Charizard",
    image: "https://assets.tcgdex.net/en/base/base1/4/high.webp",
    color: "#e25822",
  },
  {
    id: "base1-15",
    name: "Venusaur",
    image: "https://assets.tcgdex.net/en/base/base1/15/high.webp",
    color: "#4a7c59",
  },
  {
    id: "base1-16",
    name: "Zapdos",
    image: "https://assets.tcgdex.net/en/base/base1/16/high.webp",
    color: "#f5c518",
  },
  {
    id: "base1-10",
    name: "Mewtwo",
    image: "https://assets.tcgdex.net/en/base/base1/10/high.webp",
    color: "#a855f7",
  },
  {
    id: "base1-2",
    name: "Blastoise",
    image: "https://assets.tcgdex.net/en/base/base1/2/high.webp",
    color: "#3b82f6",
  },
  {
    id: "base1-58",
    name: "Pikachu",
    image: "https://assets.tcgdex.net/en/base/base1/58/high.webp",
    color: "#f5c518",
  },
];
export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [cardIndex, setCardIndex] = useState(0);
  const [nextCardIndex, setNextCardIndex] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [displayCard, setDisplayCard] = useState(SHOWCASE_CARDS[0]);
  const flipToNext = useCallback(() => {
    if (isFlipping) return;
    const next = (cardIndex + 1) % SHOWCASE_CARDS.length;
    setNextCardIndex(next);
    setIsFlipping(true);
    setTimeout(() => {
      setDisplayCard(SHOWCASE_CARDS[next]);
      setCardIndex(next);
      setIsFlipping(false);
    }, 600);
  }, [cardIndex, isFlipping]);
  useEffect(() => {
    const timer = setInterval(flipToNext, 4000);
    return () => clearInterval(timer);
  }, [flipToNext]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a name, not just spaces.");
      return;
    }
    login(name.trim());
    navigate("/pokemon");
  };
  const currentColor = displayCard.color;
  const _ = nextCardIndex; // suppress unused warning
  return _jsxs("div", {
    className: "login-page min-h-screen flex",
    children: [
      _jsxs("div", {
        className:
          "login-showcase hidden md:flex flex-col items-center justify-center relative overflow-hidden",
        style: {
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${currentColor}22 0%, #f8f8f700 70%), #f0eeec`,
        },
        children: [
          _jsx("div", {
            className: "login-grid-pattern absolute inset-0 opacity-[0.04]",
          }),
          _jsx("div", {
            className:
              "login-radial-glow absolute rounded-full pointer-events-none",
            style: {
              background: `radial-gradient(circle, ${currentColor}30 0%, transparent 70%)`,
            },
          }),
          _jsx("div", {
            className: "card-flip-container relative z-10",
            children: _jsx("div", {
              className: `card-flip-inner w-full h-full${isFlipping ? " flipping" : ""}`,
              children: _jsx("img", {
                src: displayCard.image,
                alt: displayCard.name,
                className: "card-face w-full h-full object-contain rounded-xl",
              }),
            }),
          }),
          _jsx("p", {
            className:
              "login-showcase-caption relative z-10 mt-8 text-sm text-center",
            children: "Thousands of cards waiting to be discovered.",
          }),
        ],
      }),
      _jsx("div", {
        className:
          "flex-1 flex items-center justify-center px-6 py-12 bg-white",
        children: _jsxs("div", {
          className: "login-form-panel",
          children: [
            _jsxs("div", {
              className: "mb-10",
              children: [
                _jsx("span", {
                  className:
                    "app-text-muted inline-block text-xs font-semibold tracking-[0.18em] uppercase",
                  children: "A HOME FOR YOUR FAVOURITE CARDS",
                }),
                _jsx("h1", {
                  className: "app-heading-serif mt-2 text-5xl leading-none",
                  children: "Card Atlas",
                }),
                _jsx("p", {
                  className: "login-intro-text app-text-body mt-3 text-base",
                  children:
                    "Explore Pok\u00E9mon trading\u2011card artwork and build your personal collection.",
                }),
              ],
            }),
            _jsxs("form", {
              onSubmit: handleSubmit,
              noValidate: true,
              children: [
                _jsxs("div", {
                  className: "mb-5",
                  children: [
                    _jsx("label", {
                      className:
                        "app-text-body block text-sm font-medium mb-1.5",
                      htmlFor: "name-input",
                      children: "Your name",
                    }),
                    _jsx("input", {
                      id: "name-input",
                      type: "text",
                      value: name,
                      onChange: (e) => {
                        setName(e.target.value);
                        setError("");
                      },
                      placeholder: "Enter your name",
                      autoComplete: "off",
                      className:
                        "login-name-input w-full px-3.5 py-2.5 text-sm border rounded-[10px] transition-all",
                      style: {
                        borderColor: error ? "#dc2626" : "#e4e2de",
                        boxShadow: error
                          ? "0 0 0 3px rgba(220,38,38,0.1)"
                          : undefined,
                      },
                      onFocus: (e) => {
                        if (!error) e.target.style.borderColor = "#f5c518";
                        if (!error)
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(245,197,24,0.15)";
                      },
                      onBlur: (e) => {
                        if (!error) e.target.style.borderColor = "#e4e2de";
                        if (!error) e.target.style.boxShadow = "none";
                      },
                    }),
                    error &&
                      _jsx("p", {
                        className: "login-error mt-1.5 text-xs",
                        children: error,
                      }),
                  ],
                }),
                _jsx("button", {
                  type: "submit",
                  className:
                    "login-submit-button w-full py-2.5 text-sm font-semibold rounded-[10px] transition-all active:scale-[0.98]",
                  children: "Explore cards",
                }),
              ],
            }),
            _jsx("p", {
              className: "app-text-muted mt-4 text-xs text-center",
              children:
                "Demo login \u2014 choose any name. No password required.",
            }),
          ],
        }),
      }),
    ],
  });
}
