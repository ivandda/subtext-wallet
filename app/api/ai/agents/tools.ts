import { tool } from "@langchain/core/tools";
import { z } from "zod";

/**
 * Flight booking tool.
 * Input: { from: string, to: string }
 * Output: Confirmation string.
 */
export const bookFlight = tool(
  async (input: { fromAirport: string; toAirport: string }) => {
    // Placeholder: integrate with real flight API as needed.
    return `Successfully booked a flight from ${input.fromAirport} to ${input.toAirport}.`;
  },
  {
    name: "book_flight",
    description: "Book a flight from one airport to another.",
    schema: z.object({
      fromAirport: z
        .string()
        .describe("The departure airport code (e.g., 'BOS')"),
      toAirport: z
        .string()
        .describe("The arrival airport code (e.g., 'JFK')"),
    }),
  }
);

/**
 * Hotel booking tool.
 * Input: { hotelName: string }
 * Output: Confirmation string.
 */
export const bookHotel = tool(
  async (input: { hotelName: string }) => {
    // Placeholder: integrate with real hotel API as needed.
    return `Successfully booked a stay at ${input.hotelName}.`;
  },
  {
    name: "book_hotel",
    description: "Book a hotel stay for a given hotel name.",
    schema: z.object({
      hotelName: z.string().describe("The name of the hotel to book"),
    }),
  }
);
