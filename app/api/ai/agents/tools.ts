import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { LangGraphRunnableConfig } from "@langchain/langgraph"; // Import the config type

// import { createReactAgent } from "@langchain/langgraph/prebuilt"; // Not used in this snippet
// import { initChatModel } from "langchain/chat_models/universal"; // Not used in this snippet

/**
 * Flight booking tool.
 * Input: { fromAirport: string, toAirport: string }
 * Runtime Args: userId (from config)
 * Output: Confirmation string.
 */
export const bookFlight = tool(
  async (
    input: { fromAirport: string; toAirport: string },
    config?: LangGraphRunnableConfig
  ) => {
    const userId = config?.configurable?.userId as string | undefined; // Access userId

    console.log(`Booking flight for user: ${userId}`);
    // Placeholder: integrate with real flight API as needed, potentially using userId.
    return `Successfully booked a flight from ${input.fromAirport} to ${input.toAirport} (User: ${userId || 'Unknown'}).`;
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
 * Runtime Args: userId (from config)
 * Output: Confirmation string.
 */
export const bookHotel = tool(
  async (
    input: { hotelName: string },
    config?: LangGraphRunnableConfig
  ) => {
    const userId = config?.configurable?.userId as string | undefined; // Access userId
    console.log(`Booking hotel for user: ${userId}`);
    // Placeholder: integrate with real hotel API as needed.
    return `Successfully booked a stay at ${input.hotelName} (User: ${userId || 'Unknown'}).`;
  },
  {
    name: "book_hotel",
    description: "Book a hotel stay for a given hotel name.",
    schema: z.object({
      hotelName: z.string().describe("The name of the hotel to book"),
    }),
  }
);