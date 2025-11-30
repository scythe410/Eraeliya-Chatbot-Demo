# Eraeliya Demo Project

This is a demo landing page and chatbot for **Eraeliya Villas & Gardens**, built with **React + Vite** and **Google Gemini AI**.

## Features

- **Landing Page Clone**: Replicates the design of the original Eraeliya website.
- **Smart Chatbot**: An AI-powered chatbot (using Google Gemini) that answers queries about:
    - **Offers**: Current promotions and deals.
    - **Villas**: Detailed descriptions of suites and private villas.
    - **Dining**: Menu philosophy and signature dishes.
    - **Experiences**: Activities like yoga, surfing, and excursions.
- **Admin Dashboard**: A mock dashboard for viewing analytics.
- **Responsive Design**: Works on desktop and mobile.

## Tech Stack

- **Frontend**: React, Vite, CSS
- **Backend**: Node.js, Express
- **AI**: Google Gemini API (`gemini-2.5-flash`)

## Getting Started

To run this project, you need to start both the frontend and the backend server.

### Prerequisites

- Node.js installed
- A Google Gemini API Key

### Setup

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add your Gemini API key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

### Running the App

1.  **Start the Backend Server** (Terminal 1):
    ```bash
    node server.js
    ```
    The server will run on `http://localhost:3001`.

2.  **Start the Frontend** (Terminal 2):
    ```bash
    npm run dev
    ```
    The app will run on `http://localhost:5173`.

## Chatbot Logic

The chatbot sends user messages to the local backend (`/api/chat`). The backend constructs a prompt containing the full `knowledgeBase` and sends it to the Google Gemini API to generate a helpful, context-aware response.
