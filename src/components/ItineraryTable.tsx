import type { ItineraryDay } from "../types";

export function ItineraryTable({ days }: { days: ItineraryDay[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>City</th>
            <th>Morning</th>
            <th>Afternoon</th>
            <th>Evening</th>
            <th>Lodging area</th>
            <th>Luggage</th>
          </tr>
        </thead>
        <tbody>
          {days.map((d) => (
            <tr key={d.day}>
              <td className="tabular">
                {d.day} · {d.date}
              </td>
              <td>{d.city}</td>
              <td>{d.morning}</td>
              <td>{d.afternoon}</td>
              <td>{d.evening}</td>
              <td>{d.lodgingArea}</td>
              <td>
                {d.luggageNote ? (
                  <span className="note-forward">{d.luggageNote}</span>
                ) : (
                  <span className="note-none">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
