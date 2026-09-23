import { useEffect, useMemo, useState } from 'react'
import { Search, X, SlidersHorizontal, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react'
import Navbar from '../components/Navbar'
import FilterSidebar from '../components/FilterSidebar'
import PokemonCardTile, { PokemonCardSkeleton } from '../components/PokemonCardTile'
import { useApp } from '../context/AppContext'
import { MOCK_CARDS } from '../data/mockCards'
import { fetchCardTypes, fetchCardRarities, fetchCardSetNames, fetchCardsPage } from '../utils/tcgdexApi'
import { TYPE_SWATCH_COLORS } from '../utils/pokemonTypeStyles'
import './Catalogue.css'

const SEARCH_DEBOUNCE_MS = 350

// `rarities`/`setNames` use `null` to mean "no restriction (all)". This is
// distinct from an explicit empty array (user unticked every option), and
// crucially means a failed/slow metadata fetch never gets misread as
// "show zero results" — it just means those filters stay inactive.
const EMPTY_FILTERS = { types: [], rarities: null, setNames: null }

export default function Catalogue() {
  const { addToCart, isInCart } = useApp()

  // Filter metadata sourced from the TCGdex API (types/rarities/set names).
  const [metaTypes, setMetaTypes] = useState([])
  const [metaRarities, setMetaRarities] = useState([])
  const [metaSets, setMetaSets] = useState([])
  const [metaLoaded, setMetaLoaded] = useState(false)
  const [metaError, setMetaError] = useState('')
  const [metaRetryToken, setMetaRetryToken] = useState(0)

  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(20)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState(EMPTY_FILTERS)

  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [cards, setCards] = useState([])
  const [hasNextPage, setHasNextPage] = useState(false)
  const [loading, setLoading] = useState(true)
  const [apiMessage, setApiMessage] = useState('')

  // Debounce the search box so we don't hit the API on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput)
      setPage(1)
    }, SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [searchInput])

  // Load filter metadata (types/rarities/set names). Retries are triggered by
  // bumping metaRetryToken; fetchJson itself also retries transient failures.
  useEffect(() => {
    let cancelled = false

    async function loadMeta() {
      setMetaError('')
      // Use allSettled rather than all: types/rarities are static and should
      // never fail, but set names come from a live (occasionally flaky/503)
      // endpoint. One failing call must not block the other two from loading.
      const [typesResult, raritiesResult, setNamesResult] = await Promise.allSettled([
        fetchCardTypes(),
        fetchCardRarities(),
        fetchCardSetNames(),
      ])
      if (cancelled) return

      if (typesResult.status === 'fulfilled') setMetaTypes(typesResult.value)
      if (raritiesResult.status === 'fulfilled') setMetaRarities(raritiesResult.value)
      if (setNamesResult.status === 'fulfilled') setMetaSets(setNamesResult.value)

      const failed = [typesResult, raritiesResult, setNamesResult].find((r) => r.status === 'rejected')
      setMetaError(failed ? `Failed to load filter options: ${failed.reason.message}` : '')
      setMetaLoaded(true)
    }

    loadMeta()
    return () => {
      cancelled = true
    }
  }, [metaRetryToken])

  // Fetch the current page of cards whenever search/filters/page/limit change.
  useEffect(() => {
    if (!metaLoaded) return
    let cancelled = false

    async function loadCards() {
      setLoading(true)

      // An explicit empty selection (not null) means the user unticked everything.
      if (filters.rarities?.length === 0 || filters.setNames?.length === 0) {
        if (!cancelled) {
          setCards([])
          setHasNextPage(false)
          setApiMessage('No cards match the current filters.')
          setLoading(false)
        }
        return
      }

      try {
        const { cards: fetched, hasNextPage: next } = await fetchCardsPage({
          search,
          types: filters.types,
          rarities: filters.rarities ?? undefined,
          setNames: filters.setNames ?? undefined,
          page,
          limit,
        })
        if (cancelled) return
        setCards(fetched)
        setHasNextPage(next)
        setApiMessage(fetched.length === 0 ? 'No cards match the current filters.' : '')
      } catch (error) {
        if (cancelled) return
        setCards(MOCK_CARDS.slice(0, limit))
        setHasNextPage(false)
        setApiMessage(`${error.message}. Showing fallback catalogue.`)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadCards()
    return () => {
      cancelled = true
    }
  }, [metaLoaded, search, filters, page, limit])

  const handleFiltersChange = (next) => {
    setFilters(next)
    setPage(1)
  }

  const handleLimitChange = (next) => {
    setLimit(next)
    setPage(1)
  }

  const handleSearch = (value) => {
    setSearchInput(value)
  }

  const handleRetryMeta = () => {
    setMetaLoaded(false)
    setMetaRetryToken((t) => t + 1)
  }

  const removeTypeFilter = (value) => {
    setFilters((prev) => ({ ...prev, types: prev.types.filter((v) => v !== value) }))
    setPage(1)
  }

  const resetRarities = () => {
    setFilters((prev) => ({ ...prev, rarities: null }))
    setPage(1)
  }

  const resetSetNames = () => {
    setFilters((prev) => ({ ...prev, setNames: null }))
    setPage(1)
  }

  const clearAll = () => {
    setSearchInput('')
    setSearch('')
    setFilters(EMPTY_FILTERS)
    setPage(1)
  }

  const raritiesNarrowed = filters.rarities !== null
  const setNamesNarrowed = filters.setNames !== null

  const activeFilterBadges = useMemo(() => {
    const badges = filters.types.map((v) => ({
      key: `type-${v}`,
      label: v,
      color: TYPE_SWATCH_COLORS[v],
      onRemove: () => removeTypeFilter(v),
    }))
    if (raritiesNarrowed) {
      badges.push({
        key: 'rarities',
        label: `Rarities: ${filters.rarities.length}/${metaRarities.length}`,
        onRemove: resetRarities,
      })
    }
    if (setNamesNarrowed) {
      badges.push({
        key: 'setNames',
        label: `Sets: ${filters.setNames.length}/${metaSets.length}`,
        onRemove: resetSetNames,
      })
    }
    return badges
  }, [filters, raritiesNarrowed, setNamesNarrowed, metaRarities.length, metaSets.length])

  const renderPagination = () => {
    if (page === 1 && !hasNextPage) return null
    return (
      <div className="flex items-center justify-center gap-3 mt-10">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="catalogue-pagination-button flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border transition-colors disabled:opacity-40"
        >
          <ChevronLeft size={14} /> Previous
        </button>
        <span className="app-text-muted text-sm">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasNextPage}
          className="catalogue-pagination-button flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border transition-colors disabled:opacity-40"
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    )
  }

  return (
    <div className="app-page">
      <Navbar />

      <div className="app-shell px-4 sm:px-6 py-6 flex gap-6">
        <aside className="catalogue-sidebar hidden lg:flex flex-col shrink-0 sticky top-20 h-[calc(100vh-5rem)] overflow-hidden rounded-xl border">
          <FilterSidebar
            search={searchInput}
            onSearchChange={handleSearch}
            limit={limit}
            onLimitChange={handleLimitChange}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            metaTypes={metaTypes}
            metaRarities={metaRarities}
            metaSets={metaSets}
          />
        </aside>

        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileFilters(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-hidden flex flex-col">
              <FilterSidebar
                search={searchInput}
                onSearchChange={handleSearch}
                limit={limit}
                onLimitChange={handleLimitChange}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                metaTypes={metaTypes}
                metaRarities={metaRarities}
                metaSets={metaSets}
                onClose={() => setShowMobileFilters(false)}
                isMobile
              />
            </div>
          </div>
        )}

        <main className="flex-1 min-w-0">
          <div className="mb-6">
            <p className="app-text-muted text-xs font-semibold tracking-[0.14em] uppercase">
              DISCOVER · COLLECT · REVISIT
            </p>
            <h1 className="app-heading-serif mt-1.5 text-3xl sm:text-4xl leading-tight">
              A world of cards.
              <br />A collection that's yours.
            </h1>
            <p className="app-text-body mt-2 text-sm">
              Explore Pokémon trading cards and add the cards you love to your collection.
            </p>
          </div>

          <div className="flex items-center gap-3 mb-4 lg:hidden">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" color="#8a8a84" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search cards..."
                className="catalogue-search-input catalogue-search-input--mobile w-full pl-8 pr-8 py-2 text-sm rounded-lg border"
              />
              {searchInput && (
                <button onClick={() => handleSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2">
                  <X size={12} color="#8a8a84" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowMobileFilters(true)}
              className="catalogue-mobile-filter-button flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFilterBadges.length > 0 && (
                <span className="app-count-badge inline-flex items-center justify-center text-[10px] font-bold rounded-full">
                  {activeFilterBadges.length}
                </span>
              )}
            </button>
          </div>

          {activeFilterBadges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilterBadges.map(({ key, label, color, onRemove }) => (
                <button
                  key={key}
                  onClick={onRemove}
                  className="catalogue-active-filter flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border transition-colors hover:bg-[#fef9e3]"
                >
                  {color && <span className="w-2 h-2 rounded-full" style={{ background: color }} />}
                  {label}
                  <X size={10} />
                </button>
              ))}
              <button onClick={clearAll} className="app-text-body px-2.5 py-1 text-xs rounded-full transition-colors">
                Clear all
              </button>
            </div>
          )}

          <p className="app-text-muted text-xs mb-2">
            <span className="app-text-body font-semibold">{loading ? 'Loading' : cards.length}</span>{' '}
            card{cards.length === 1 ? '' : 's'} shown · Page{' '}
            <span className="app-text-body font-semibold">{page}</span>
          </p>

          {metaError && (
            <p className="catalogue-status text-xs mb-4 flex items-center gap-2">
              {metaError}
              <button
                onClick={handleRetryMeta}
                className="inline-flex items-center gap-1 font-semibold underline underline-offset-2"
              >
                <RefreshCw size={11} /> Retry
              </button>
            </p>
          )}
          {apiMessage && <p className="catalogue-status text-xs mb-4">{apiMessage}</p>}

          {!loading && cards.length === 0 && (
            <div className="catalogue-empty-state flex flex-col items-center justify-center py-20 text-center rounded-xl border">
              <div className="catalogue-empty-icon w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Search size={20} color="#8a8a84" />
              </div>
              <h3 className="app-text-strong text-base font-semibold mb-1">No Pokémon found</h3>
              <p className="app-text-body text-sm mb-4">Try changing your search or removing some filters.</p>
              <button onClick={clearAll} className="app-primary-action px-4 py-2 text-sm font-semibold rounded-lg transition-all">
                Clear filters
              </button>
            </div>
          )}

          <div className="catalogue-grid grid gap-4">
            {loading
              ? Array.from({ length: Math.min(limit, 12) }, (_, index) => <PokemonCardSkeleton key={index} />)
              : cards.map((card) => (
                  <PokemonCardTile key={card.id} card={card} inCart={isInCart(card.id)} onAddToCart={addToCart} />
                ))}
          </div>

          {!loading && renderPagination()}
        </main>
      </div>
    </div>
  )
}
