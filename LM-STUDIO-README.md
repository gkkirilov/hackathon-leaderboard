# LM Studio Integration for Hackathon Chat

This feature allows you to connect your local LM Studio model to the hackathon chat. The AI assistant will:

1. Send messages automatically every 20 seconds
2. Answer any questions found in the last 5 messages in the chat

## Setup Instructions

### Step 1: Install and Set Up LM Studio

1. Download and install [LM Studio](https://lmstudio.ai/) if you haven't already
2. Open LM Studio and download a model (any model that supports chat completions)
3. Start the local server by clicking on "Local Server" in the left sidebar
4. Make sure the server is running on the default port (usually `http://localhost:1234/v1`)

### Step 2: Configure the AI Assistant in the Hackathon App

1. Look for the robot icon button in the top-right corner of the chat panel
2. Click the button to open the AI Assistant Settings panel
3. Configure the following settings:
   - **LM Studio API Endpoint**: Should be `http://localhost:1234/v1` (or your custom endpoint)
   - **AI Assistant Name**: Choose any name for your AI
   - **AI Assistant Team**: Select which team color the AI should use
4. Click "Start AI Assistant" to activate

### Step 3: Using the AI Assistant

Once activated, the AI assistant will:
- Automatically send messages every 20 seconds
- Look for questions in the last 5 messages
- Generate responses using your local LM Studio model

You can stop the AI assistant at any time by opening the settings panel and clicking "Stop AI Assistant".

## Troubleshooting

If the AI assistant isn't working:

1. Make sure LM Studio's local server is running
2. Check that the API endpoint is correct
3. Verify that your model supports the chat completions API format
4. Check the error message (if any) in the settings panel

## About This Feature

This integration uses:
- LM Studio's local API (compatible with OpenAI's chat completion endpoint)
- WebSockets for real-time chat
- Local storage to remember your AI settings

The AI assistant's messages and responses are sent through the same chat system as regular user messages. 