import "./App.css";
import tripBrief from "./data/tripBrief.json";
import itinerary from "./data/itinerary.json";
import lodging from "./data/lodging.json";
import transit from "./data/transit.json";
import excursions from "./data/excursions.json";
import type { ItineraryDay, LodgingOption, TransitLeg, ExcursionItem } from "./types";
import { ItineraryTable } from "./components/ItineraryTable";
import { LodgingSection } from "./components/LodgingSection";
import { TransitTable } from "./components/TransitTable";
import { ExcursionChecklist } from "./components/ExcursionChecklist";

const days = itinerary as ItineraryDay[];
const legs = transit as TransitLeg[];
const lodgingByCity = lodging as unknown as Record<string, { hotel: LodgingOption[]; hostel: LodgingOption[] }>;
const excursionsByCity = excursions as unknown as Record<string, ExcursionItem[]>;

function App() {
  return (
    <>
      <div className="topbar">
        <span className="mark">Waypoint</span>
        <nav>
          <a href="#itinerary">Itinerary</a>
          <a href="#lodging">Lodging</a>
          <a href="#transit">Transit</a>
          <a href="#excursions">Excursions</a>
        </nav>
      </div>

      <div className="app-shell">
        <header className="hero">
          <span className="eyebrow">Trip plan</span>
          <h1>{tripBrief.title}</h1>
          <p className="sub">
            {tripBrief.dateRange} · {tripBrief.travelers} travelers · {tripBrief.bagsPerTraveler} bag each
          </p>

          <div className="brief-grid">
            <div className="brief-card">
              <div className="label">Budget</div>
              <div className="value">{tripBrief.budgetPerNight}</div>
            </div>
            <div className="brief-card">
              <div className="label">Transport modes</div>
              <div className="tag-row">
                {tripBrief.transportModes.map((m) => (
                  <span className="tag" key={m}>{m}</span>
                ))}
              </div>
            </div>
            <div className="brief-card">
              <div className="label">Interests</div>
              <div className="tag-row">
                {tripBrief.interests.map((i) => (
                  <span className="tag" key={i}>{i}</span>
                ))}
              </div>
            </div>
            <div className="brief-card">
              <div className="label">Already seen / avoid</div>
              <div className="tag-row">
                {tripBrief.avoid.map((a) => (
                  <span className="tag" key={a}>{a}</span>
                ))}
              </div>
            </div>
          </div>
        </header>

        <section id="itinerary" className="block">
          <div className="block-head">
            <span className="eyebrow">Day by day</span>
            <h2>Itinerary</h2>
            <p>Luggage-forwarding notes flag days where it's worth it — city change plus same-day activity — and stay silent everywhere else.</p>
          </div>
          <ItineraryTable days={days} />
        </section>

        <section id="lodging" className="block">
          <div className="block-head">
            <span className="eyebrow">Shortlists</span>
            <h2>Lodging</h2>
            <p>Toggle hotel/hostel per city, reject an option with a reason to shape the next refresh, or leave a specific override note.</p>
          </div>
          {Object.entries(lodgingByCity).map(([city, pools]) => (
            <LodgingSection key={city} city={city} pools={pools} />
          ))}
        </section>

        <section id="transit" className="block">
          <div className="block-head">
            <span className="eyebrow">Between legs</span>
            <h2>Transit</h2>
            <p>Every leg here fits the trip's train / bus / ferry constraint — nothing requiring a car or an unlisted flight.</p>
          </div>
          <TransitTable legs={legs} />
        </section>

        <section id="excursions" className="block">
          <div className="block-head">
            <span className="eyebrow">Per city</span>
            <h2>Excursion checklist</h2>
            <p>Checked state is tied to each item, not its day — reshuffling the itinerary won't reset your progress.</p>
          </div>
          <ExcursionChecklist items={excursionsByCity} />
        </section>
      </div>

      <footer className="app-footer">
        Waypoint · {tripBrief.generatedNote}
      </footer>
    </>
  );
}

export default App;
