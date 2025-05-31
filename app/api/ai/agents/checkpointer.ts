import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

if (!process.env.POSTGRES_URI) {
  throw new Error("POSTGRES_URI must be set in .env.local");
}

// Create a PostgresSaver instance.
// You can optionally pass a configuration object as the second parameter (e.g., schema name).
export const checkpointer = PostgresSaver.fromConnString(
  process.env.POSTGRES_URI,
  {
    schema: "public",
  }
);

// // If you need to run migrations (create tables) on startup, uncomment below:
// (async () => {
//   await checkpointer.setup();
//   console.log("Postgres checkpointer tables are set up.");
// })();
