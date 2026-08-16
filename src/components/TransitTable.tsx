import type { TransitLeg } from "../types";

export function TransitTable({ legs }: { legs: TransitLeg[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Route</th>
            <th>Mode</th>
            <th>Duration</th>
            <th>Cost</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {legs.map((l) => (
            <tr key={l.id}>
              <td className="tabular">{l.day}</td>
              <td>
                {l.from} → {l.to}
              </td>
              <td>{l.mode}</td>
              <td className="tabular">{l.duration}</td>
              <td className="tabular">{l.cost}</td>
              <td>{l.note ?? <span className="note-none">—</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
