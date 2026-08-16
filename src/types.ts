export interface TripBrief {
  title: string;
  dateRange: string;
  travelers: number;
  bagsPerTraveler: number;
  budgetPerNight: string;
  lodgingTypes: string[];
  transportModes: string[];
  interests: string[];
  avoid: string[];
  generatedNote: string;
}

export interface ItineraryDay {
  day: number;
  date: string;
  city: string;
  morning: string;
  afternoon: string;
  evening: string;
  lodgingArea: string;
  luggageNote: string | null;
}

export type LodgingType = "hotel" | "hostel";

export interface LodgingOption {
  id: string;
  city: string;
  type: LodgingType;
  name: string;
  pricePerNight: string;
  searchLink: string;
  walkToTransit: string;
  refundable: "Free cancellation" | "Non-refundable" | "Check policy";
  valueScore: number; // 1-10
  valueWhy: string;
}

export interface TransitLeg {
  id: string;
  day: number;
  from: string;
  to: string;
  mode: string;
  duration: string;
  cost: string;
  note?: string;
}

export interface ExcursionItem {
  id: string;
  city: string;
  title: string;
  note: string;
  closedDay?: string;
}
