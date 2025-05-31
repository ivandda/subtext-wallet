// project_root/app/api/ai/agents/route.ts
import { NextRequest, NextResponse } from "next/server";
import { HumanMessage } from "@langchain/core/messages";
import { supervisorGraph } from "./supervisor";

type RequestBody = {
  message: string;
  threadId: string;
};

/**
 * POST /api/ai/agents
 *
 * Expects JSON payload: { message: string; threadId: string }
 * Returns { response: string } where response is the assistant’s reply.
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = (await request.json()) as RequestBody;
    const { message, threadId } = body;

    if (!message || !threadId) {
      return new NextResponse(
        JSON.stringify({
          error: "Both `message` and `threadId` are required in the request body.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Wrap the user’s text as a LangChain HumanMessage
    const messages = [new HumanMessage({ content: message })];

    // Configure the Graph invocation to use the given thread ID for memory scoping
    const config = {
      configurable: {
        thread_id: threadId,
      },
    };

    // Call the supervisorGraph (non-streaming). This returns { messages: [ { role, content }, … ] }
    const result = await supervisorGraph.invoke({ messages }, config);

    // The last message in result.messages is the assistant’s reply
    const lastMessage = result.messages[result.messages.length - 1];
    const assistantReply = lastMessage && typeof lastMessage.content === "string" ? lastMessage.content : "";

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