import { useMemo, useState } from "react";
import type { LodgingOption, LodgingType } from "../types";
import { store } from "../lib/storage";

const REJECT_REASONS = ["Too expensive", "Badly rated", "Too far from transit", "Bad area", "Not refundable"];

function scoreClass(score: number): string {
  if (score >= 7) return "score-high";
  if (score >= 5) return "score-mid";
  return "score-low";
}

function refundClass(r: LodgingOption["refundable"]): string {
  if (r === "Free cancellation") return "free";
  if (r === "Non-refundable") return "non";
  return "check";
}

function LodgingCard({
  option,
  onReject,
}: {
  option: LodgingOption;
  onReject: (id: string, reason: string) => void;
}) {
  const [showReasons, setShowReasons] = useState(false);

  return (
    <div className="lodging-card">
      <div className="head">
        <h4>{option.name}</h4>
        <span className={`score-badge ${scoreClass(option.valueScore)}`}>{option.valueScore}/10</span>
      </div>
      <div className="price tabular">{option.pricePerNight}</div>
      <div className="meta">
        <span>{option.walkToTransit}</span>
        <span className={`badge-refund ${refundClass(option.refundable)}`}>{option.refundable}</span>
      </div>
      <div className="why">{option.valueWhy}</div>
      <div className="actions">
        <a className="link" href={option.searchLink} target="_blank" rel="noreferrer">
          View listings →
        </a>
        {!showReasons ? (
          <button className="reject-btn" onClick={() => setShowReasons(true)}>
            Not this one
          </button>
        ) : null}
      </div>
      {showReasons && (
        <div className="reject-panel">
          {REJECT_REASONS.map((r) => (
            <button key={r} onClick={() => onReject(option.id, r)}>
              {r}
            </button>
          ))}
          <button onClick={() => setShowReasons(false)} style={{ color: "var(--ink-faint)" }}>
            cancel
          </button>
        </div>
      )}
    </div>
  );
}

export function LodgingSection({
  city,
  pools,
}: {
  city: string;
  pools: { hotel: LodgingOption[]; hostel: LodgingOption[] };
}) {
  const availableTypes = (Object.keys(pools) as LodgingType[]).filter((t) => pools[t]?.length);
  const [activeType, setActiveType] = useState<LodgingType>(availableTypes[0] ?? "hotel");
  const [overrideDraft, setOverrideDraft] = useState("");
  const [, forceRender] = useState(0);

  const poolKey = `${city}:${activeType}`;
  const rejected = store.getRejected(poolKey);
  const rejectedIds = new Set(rejected.map((r) => r.id));
  const shownCount = store.getShownCount(poolKey);
  const override = store.getOverride(poolKey);

  const visible = useMemo(() => {
    const pool = pools[activeType] ?? [];
    return pool.filter((o) => !rejectedIds.has(o.id)).slice(0, shownCount);
  }, [pools, activeType, shownCount, rejected.length]);

  const totalAvailable = (pools[activeType] ?? []).filter((o) => !rejectedIds.has(o.id)).length;
  const exhausted = totalAvailable <= visible.length;

  function handleReject(id: string, reason: string) {
    store.addRejected(poolKey, id, reason);
    forceRender((n) => n + 1);
  }

  function handleRefresh() {
    store.bumpShownCount(poolKey);
    forceRender((n) => n + 1);
  }

  function handleOverrideSave() {
    store.setOverride(poolKey, overrideDraft);
    forceRender((n) => n + 1);
  }

  return (
    <div className="city-group">
      <div className="city-group-head">
        <h3>{city}</h3>
        {availableTypes.length > 1 && (
          <div className="type-toggle">
            {availableTypes.map((t) => (
              <button
                key={t}
                className={t === activeType ? "active" : ""}
                onClick={() => setActiveType(t)}
              >
                {t === "hotel" ? "Hotels" : "Hostels"}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="lodging-grid">
        {visible.map((opt) => (
          <LodgingCard key={opt.id} option={opt} onReject={handleReject} />
        ))}
      </div>

      <div className="city-controls">
        <button className="refresh-btn" onClick={handleRefresh} disabled={exhausted}>
          Refresh — show more
        </button>
        {exhausted && (
          <span className="exhausted-note">
            That's every option seed data has for {city} {activeType === "hotel" ? "hotels" : "hostels"} —
            widen the budget or distance filter to see more next time this refreshes from live research.
          </span>
        )}
      </div>

      <div className="override-row">
        <input
          type="text"
          placeholder='Specific request, e.g. "go over budget here, want an onsen ryokan"'
          value={overrideDraft}
          onChange={(e) => setOverrideDraft(e.target.value)}
        />
        <button onClick={handleOverrideSave}>Save note</button>
      </div>
      {override && <div className="override-note">Override for {city}: "{override}"</div>}
    </div>
  );
}
