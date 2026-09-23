import { X, ChevronDown, ChevronUp, Search } from "lucide-react";
import { useState } from "react";
import { TYPE_SWATCH_COLORS } from "../utils/pokemonTypeStyles";
import "./FilterSidebar.css";

const LIMIT_OPTIONS = [10, 20, 50, 100];

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="filter-sidebar__section border-b">
      <button
        type="button"
        className="filter-sidebar__section-button w-full flex items-center justify-between py-3 text-sm font-semibold transition-colors hover:text-[#111110]"
        onClick={() => setOpen(!open)}
      >
        {title}
        {open ? (
          <ChevronUp size={14} color="#8a8a84" />
        ) : (
          <ChevronDown size={14} color="#8a8a84" />
        )}
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

function CheckItem({ label, checked, onChange, color }) {
  return (
    <label className="flex items-center gap-2.5 py-1 cursor-pointer group">
      <div
        className={`filter-sidebar__checkbox${checked ? " filter-sidebar__checkbox--checked" : ""} w-4 h-4 rounded flex items-center justify-center border transition-all shrink-0`}
        onClick={() => onChange(!checked)}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="#111110"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      {color && (
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ background: color }}
        />
      )}
      <span
        className={`filter-sidebar__label${checked ? " filter-sidebar__label--checked" : ""} text-sm transition-colors`}
      >
        {label}
      </span>
    </label>
  );
}

/** Checkbox list with "Select all" / "Clear" shortcuts, used inside the
 * collapsible Rarities and Set Names sections. `selected === null` means
 * "no restriction (all)" — distinct from an explicit empty array, which
 * means the user deliberately unticked every option. */
function MultiSelectPanel({ options, selected, onChange }) {
  const effectiveSelected = selected ?? options;
  const allSelected = selected === null;
  const toggleOption = (value) => {
    const next = effectiveSelected.includes(value)
      ? effectiveSelected.filter((v) => v !== value)
      : [...effectiveSelected, value];
    onChange(next.length === options.length ? null : next);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          className="filter-sidebar__link-button text-xs font-medium"
          onClick={() => onChange(null)}
          disabled={allSelected}
        >
          Select all
        </button>
        <button
          type="button"
          className="filter-sidebar__link-button text-xs font-medium"
          onClick={() => onChange([])}
          disabled={effectiveSelected.length === 0}
        >
          Clear
        </button>
      </div>
      <div className="filter-sidebar__scroll-list space-y-0.5 max-h-56 overflow-y-auto pr-1">
        {options.map((option) => (
          <CheckItem
            key={option}
            label={option}
            checked={effectiveSelected.includes(option)}
            onChange={() => toggleOption(option)}
          />
        ))}
      </div>
    </div>
  );
}

export default function FilterSidebar({
  search,
  onSearchChange,
  limit,
  onLimitChange,
  filters,
  onFiltersChange,
  metaTypes,
  metaRarities,
  metaSets,
  onClose,
  isMobile,
}) {
  const toggleType = (value) => {
    const next = filters.types.includes(value)
      ? filters.types.filter((v) => v !== value)
      : [...filters.types, value];
    onFiltersChange({ ...filters, types: next });
  };

  const clearAll = () =>
    onFiltersChange({ types: [], rarities: null, setNames: null });

  const raritiesNarrowed = filters.rarities !== null;
  const setNamesNarrowed = filters.setNames !== null;
  const totalActive =
    filters.types.length +
    (raritiesNarrowed ? 1 : 0) +
    (setNamesNarrowed ? 1 : 0);
  const canClear = totalActive > 0 || Boolean(search);

  return (
    <div
      className={`filter-sidebar${isMobile ? "" : " filter-sidebar--desktop"} flex flex-col h-full`}
    >
      <div className="filter-sidebar__header flex items-center justify-between px-5 py-4 border-b">
        <span className="filter-sidebar__title text-sm font-semibold">
          Filters
          {totalActive > 0 && (
            <span className="filter-sidebar__count ml-2 inline-flex items-center justify-center text-[10px] font-bold rounded-full px-1.5 py-0.5">
              {totalActive}
            </span>
          )}
        </span>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#f0eeec] transition-colors"
          >
            <X size={16} color="#6b6b64" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        <div className="filter-sidebar__section border-b py-3">
          <label className="filter-sidebar__section-button block text-sm font-semibold mb-2">
            Search by name
          </label>
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              color="#8a8a84"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Pokémon..."
              className="catalogue-search-input catalogue-search-input--sidebar w-full pl-8 pr-8 py-2 text-sm rounded-lg border transition-all"
            />
            {search && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2"
              >
                <X size={12} color="#8a8a84" />
              </button>
            )}
          </div>
        </div>

        <FilterSection title="Limit per page">
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="filter-sidebar__select w-full py-2 px-2 text-sm rounded-lg border"
          >
            {LIMIT_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n} per page
              </option>
            ))}
          </select>
        </FilterSection>

        <FilterSection title="Types">
          <div className="space-y-0.5">
            {metaTypes.map((type) => (
              <CheckItem
                key={type}
                label={type}
                checked={filters.types.includes(type)}
                onChange={() => toggleType(type)}
                color={TYPE_SWATCH_COLORS[type]}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title={`Rarities (${filters.rarities?.length ?? metaRarities.length}/${metaRarities.length})`}
          defaultOpen={false}
        >
          <MultiSelectPanel
            options={metaRarities}
            selected={filters.rarities}
            onChange={(next) => onFiltersChange({ ...filters, rarities: next })}
          />
        </FilterSection>

        <FilterSection
          title={`Set Names (${filters.setNames?.length ?? metaSets.length}/${metaSets.length})`}
          defaultOpen={false}
        >
          <MultiSelectPanel
            options={metaSets}
            selected={filters.setNames}
            onChange={(next) => onFiltersChange({ ...filters, setNames: next })}
          />
        </FilterSection>
      </div>

      {canClear && (
        <div className="filter-sidebar__footer px-5 py-4 border-t">
          <button
            onClick={clearAll}
            className="app-secondary-action w-full py-2 text-sm font-medium rounded-[10px] border transition-colors app-hover-muted"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
