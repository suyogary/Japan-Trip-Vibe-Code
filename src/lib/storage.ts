const NS = "waypoint";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`${NS}:${key}`);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  localStorage.setItem(`${NS}:${key}`, JSON.stringify(value));
}

export interface RejectionRecord {
  id: string;
  reason: string;
}

export const store = {
  getChecked: (): Record<string, boolean> => read("checked", {}),
  setChecked: (id: string, value: boolean) => {
    const all = store.getChecked();
    all[id] = value;
    write("checked", all);
  },

  getRejected: (poolKey: string): RejectionRecord[] => read(`rejected:${poolKey}`, []),
  addRejected: (poolKey: string, id: string, reason: string) => {
    const list = store.getRejected(poolKey);
    list.push({ id, reason });
    write(`rejected:${poolKey}`, list);
  },
  clearRejected: (poolKey: string) => write(`rejected:${poolKey}`, []),

  getShownCount: (poolKey: string): number => read(`shown:${poolKey}`, 4),
  bumpShownCount: (poolKey: string) => {
    const n = store.getShownCount(poolKey);
    write(`shown:${poolKey}`, n + 4);
  },

  getOverride: (poolKey: string): string => read(`override:${poolKey}`, ""),
  setOverride: (poolKey: string, text: string) => write(`override:${poolKey}`, text),
};
