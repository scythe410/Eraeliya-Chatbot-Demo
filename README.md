# Eraeliya Demo Project

This is a demo landing page and chatbot for **Eraeliya Villas & Gardens**, built with **React + Vite**.

## Features

- **Landing Page Clone**: Replicates the design of the original Eraeliya website.
- **Chatbot**: A rule-based chatbot that answers queries about:
    - **Offers**: Current promotions and deals.
    - **Villas**: Detailed descriptions of suites and private villas.
    - **Dining**: Menu philosophy and signature dishes.
    - **Experiences**: Activities like yoga, surfing, and excursions.
- **Responsive Design**: Works on desktop and mobile.

## Tech Stack

- React
- Vite
- CSS (Custom styling)

## Getting Started

1.  Clone the repository.
2.  Run `npm install` to install dependencies.
3.  Run `npm run dev` to start the development server.

## Chatbot Logic

The chatbot uses a simple keyword matching system defined in `src/components/Chatbot.jsx` and pulls data from `src/data/knowledgeBase.js`. It does not require a backend server.
