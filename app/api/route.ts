import { NextResponse } from 'next/server';
import { handleUserRequest } from './ai/agents/route'; // Adjust the import path as needed

let botInstance: any = null;

export const runtime = 'nodejs'; // Force Node.js runtime

async function startBot() {
  if (botInstance) {
    return { status: 'already running' };
  }

  try {
    // Dynamically import Discord.js only on server
    const { Client, GatewayIntentBits } = await import('discord.js');
    
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
      ],
    });

    client.once('ready', () => {
      console.log(`✅ Logged in as ${client?.user?.tag}!`);
    });

    client.on('messageCreate', async (message) => {
      // Ignore messages from bots (including itself)
      if (message.author.bot) return;

      const userId = message.author.id;
      const threadId = message.author.id;

      console.log(`Received message from ${userId} in thread ${threadId}: ${message.content}`);

      const response = await handleUserRequest(message.content, threadId, userId);

      await message.reply(response);
    });

    client.on('error', (error) => {
      console.error('Discord client error:', error);
    });


    await client.login(process.env.DISCORD_BOT_TOKEN);
    botInstance = client;
    
    return { status: 'started' };
  } catch (error) {
    console.error('Failed to start Discord bot:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const result = await startBot();
    return NextResponse.json({ status: 'success', bot: result });
  } catch (error) {
    console.error('Bot initialization failed:', error);
    return NextResponse.json({ 
      error: 'Bot initialization failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}