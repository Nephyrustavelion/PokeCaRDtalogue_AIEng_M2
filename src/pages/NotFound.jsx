import { useNavigate } from "react-router-dom";
import { ArrowLeft, SearchX } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function NotFound() {
  const navigate = useNavigate();
  const { user } = useApp();

  const handleReturn = () => {
    if (user) {
      navigate("/catalogue");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f7] px-6">
      <div className="max-w-md w-full text-center">

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-white border flex items-center justify-center">
            <SearchX size={28} />
          </div>
        </div>

        <p className="app-text-muted text-xs font-semibold tracking-[0.18em] uppercase mb-2">
          ERROR 404
        </p>

        <h1 className="app-heading-serif text-4xl sm:text-5xl">
          This card is missing.
        </h1>

        <p className="app-text-body mt-4 text-sm leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <button
          type="button"
          onClick={handleReturn}
          className="app-primary-action mt-8 px-5 py-2.5 text-sm font-semibold rounded-[10px] inline-flex items-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
        >
          <ArrowLeft size={16} />

          {user ? "Back to Catalogue" : "Back to Login"}
        </button>

      </div>
    </div>
  );
}