// project_root/app/api/ai/agents/route.ts
import { NextRequest, NextResponse } from "next/server";
import { HumanMessage } from "@langchain/core/messages";
// import { supervisorGraph } from "./supervisor";
import { subtextAgent } from "./agents"; // Import the single agent with all tools

type RequestBody = {
  message: string;
  threadId: string;
  userId: string; // Added userId
};

export async function handleUserRequest(message: string, threadId: string, userId: string) {
  // Wrap the user’s text as a LangChain HumanMessage
  const messages = [new HumanMessage({ content: message })];

  // Configure the Graph invocation to use the given thread ID for memory scoping
  // and pass the userId
  const config = {
    configurable: {
      thread_id: threadId,
      userId: userId, // Pass userId here
    },
  };

  // Call the subtextAgent directly.
  // The createReactAgent returns a runnable that can be invoked.
  // Depending on how createReactAgent structures its output, you might need to adjust how you extract the reply.
  // For a standard react agent, the output is usually the final message list.
  const result = await subtextAgent.invoke({ messages }, config);

  // The last message in result.messages is the assistant’s reply
  // This assumes the agent's output format is { messages: [...] }
  // If createReactAgent's direct invocation has a different output structure, adjust this.
  // For example, if it directly returns the agent's final response string or a different object.
  // Let's assume it's similar to the graph output for now.
  const lastMessage = result.messages[result.messages.length - 1];
  const assistantReply = lastMessage && typeof lastMessage.content === "string" ? lastMessage.content : "";
  return assistantReply;
}

/**
 * POST /api/ai/agents
 *
 * Expects JSON payload: { message: string; threadId: string; userId: string }
 * Returns { response: string } where response is the assistant’s reply.
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = (await request.json()) as RequestBody;
    const { message, threadId, userId } = body; // Destructure userId

    if (!message || !threadId || !userId) { // Check for userId
      return new NextResponse(
        JSON.stringify({
          error: "All `message`, `threadId`, and `userId` are required in the request body.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const assistantReply = await handleUserRequest(message, threadId, userId);

    return new NextResponse(
      JSON.stringify({ response: assistantReply }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: unknown) {
    console.error("Error in POST /api/ai/agents:", err);
    return new NextResponse(
      JSON.stringify({
        error:
          "Internal server error: " +
          (err instanceof Error ? err.message : String(err)),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


/**
 * GET /api/ai/agents
 *
 * Returns a simple message indicating the API is working.
 */
export async function GET() {
  return new NextResponse(
    JSON.stringify({ message: "AI Agents API is working!" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}