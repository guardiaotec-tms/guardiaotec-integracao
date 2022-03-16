import { Itinerary } from '../entities/Itinerary';

export interface ItineraryRepository {
  addItinerary(itinerary: Itinerary): Promise<void>;
  getItineraries(): Promise<Itinerary[]>;
}
