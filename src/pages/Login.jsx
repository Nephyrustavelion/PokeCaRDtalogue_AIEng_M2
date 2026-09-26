import { useState, useEffect, useCallback } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

import "./Login.css";
import { SHOWCASE_CARDS } from "../data/showcasecards";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();

  const [name, setName] = useState("Xiao Ming");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");

  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const [displayCard, setDisplayCard] = useState(SHOWCASE_CARDS[0]);

  const flipToNext = useCallback(() => {
    if (isFlipping) {
      return;
    }

    const next = (cardIndex + 1) % SHOWCASE_CARDS.length;

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
      setError("Enter your Name");
      return;
    }

    login(name.trim());
    navigate("/catalogue");
  };

  const currentColor = displayCard.color;

  return (
    <div className="login-page min-h-screen flex">
      {/* Pokémon card showcase */}
      <div
        className="login-showcase hidden md:flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          background: `radial-gradient(
            ellipse 70% 60% at 50% 50%,
            ${currentColor}22 0%,
            #f8f8f700 70%
          ), #f0eeec`,
        }}
      >
        <div className="login-grid-pattern absolute inset-0 opacity-[0.04]" />

        <div
          className="login-radial-glow absolute rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(
              circle,
              ${currentColor}30 0%,
              transparent 70%
            )`,
          }}
        />

        <div className="card-flip-container relative z-10">
          <div
            className={`card-flip-inner w-full h-full${
              isFlipping ? " flipping" : ""
            }`}
          >
            <img
              src={displayCard.image}
              alt={displayCard.name}
              className="card-face w-full h-full object-contain rounded-xl"
            />
          </div>
        </div>

        <p className="login-showcase-caption relative z-10 mt-8 text-sm text-center">
          Thousands of cards waiting to be discovered.
        </p>
      </div>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="login-form-panel">
          <div className="mb-10">
            <span className="app-text-muted inline-block text-xs font-semibold tracking-[0.18em] uppercase">
              A HOME FOR YOUR FAVOURITE CARDS
            </span>

            <h1 className="app-heading-serif mt-2 text-5xl leading-none">
              Poké Card Atlas
            </h1>

            <p className="login-intro-text app-text-body mt-3 text-base">
              Explore Pokémon trading-card artwork and build your personal
              collection.
            </p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-5">
              <label
                className="app-text-body block text-sm font-medium mb-1.5"
                htmlFor="name-input"
              >
                Ranger Name
              </label>

              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder="Enter your Name here"
                autoComplete="off"
                className="login-name-input w-full px-3.5 py-2.5 text-sm border rounded-[10px] transition-all"
                style={{
                  borderColor: error ? "#dc2626" : "#e4e2de",

                  boxShadow: error
                    ? "0 0 0 3px rgba(220,38,38,0.1)"
                    : undefined,
                }}
                onFocus={(e) => {
                  if (!error) {
                    e.target.style.borderColor = "#f5c518";

                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(245,197,24,0.15)";
                  }
                }}
                onBlur={(e) => {
                  if (!error) {
                    e.target.style.borderColor = "#e4e2de";

                    e.target.style.boxShadow = "none";
                  }
                }}
              />

              {error && <p className="login-error mt-1.5 text-xs">{error}</p>}
            </div>
            
            <div className="mb-5">
              <label
                className="app-text-body block text-sm font-medium mb-1.5"
                htmlFor="password-input"
              >
                Ranger Password
              </label>

              <input
                id="password-input"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="login-name-input w-full px-3.5 py-2.5 text-sm border rounded-[10px] transition-all"
              />
            </div>

            <button
              type="submit"
              className="login-submit-button w-full py-2.5 text-sm font-semibold rounded-[10px] transition-all active:scale-[0.98]"
            >
              Explore cards
            </button>
          </form>
          <p className="app-text-muted mt-4 text-xs text-center">
            Xiao Ming <br />
            password
          </p>
          {/* <p>
            <Link to="/catalogue">Catalogue</Link>
          </p>
          <p>
            <Link to="/collection">Collection</Link>
          </p>
          <p>
            <Link to="/cart">My Cart</Link>
          </p> */}
        </div>
      </div>
    </div>
  );
}
