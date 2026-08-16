import { useState } from "react";
import type { ExcursionItem } from "../types";
import { store } from "../lib/storage";

export function ExcursionChecklist({ items }: { items: Record<string, ExcursionItem[]> }) {
  const [, forceRender] = useState(0);
  const checked = store.getChecked();

  function toggle(id: string) {
    store.setChecked(id, !checked[id]);
    forceRender((n) => n + 1);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {Object.entries(items).map(([city, list]) => (
        <div key={city}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", textTransform: "none", letterSpacing: 0, color: "var(--ink)" }}>
            {city}
          </h3>
          <div className="excursion-list">
            {list.map((item) => (
              <label key={item.id} className={`excursion-item ${checked[item.id] ? "checked" : ""}`}>
                <input
                  type="checkbox"
                  checked={!!checked[item.id]}
                  onChange={() => toggle(item.id)}
                />
                <div>
                  <div className="title">{item.title}</div>
                  <div className="note">{item.note}</div>
                  {item.closedDay && <div className="closed">⚠ {item.closedDay}</div>}
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
