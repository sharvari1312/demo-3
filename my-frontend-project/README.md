# ScholarPath Frontend Project

This is a pure frontend implementation of the ScholarPath scholarship portal UI.

## Project Features
- **Frontend Only:** Built exclusively with HTML, CSS, and vanilla JavaScript.
- **No Backend:** There is no server, database, or API integration.
- **Autosave:** Form inputs automatically save to `localStorage` across reloads.
- **Mock AI Chatbot:** Floating action button UI that provides static, mock replies.
- **Interactive Form UI:** Provides a guided, step-by-step form layout completely powered by client-side JavaScript.

## How to Run Locally

You do not need Node.js or any backend server to run this project. However, to bypass browser CORS restrictions for modules if needed (though everything is bundled in single index file for this implementation), a simple local server is recommended.

1. **Option 1: Direct open**
   Simply double-click `index.html` to open it in your browser.

2. **Option 2: Using VSCode Live Server**
   If you have VSCode installed, install the "Live Server" extension, right-click `index.html`, and select "Open with Live Server".

3. **Option 3: using npx**
   If you have node installed, you can simply run:
   ```bash
   npx serve .
   ```

## Folder Structure

- `index.html` - The main Single Page Application containing all views.
- `css/styles.css` - Custom styling reflecting the premium academic design.
- `js/app.js` - Main logic for view switching and interactions.
- `js/utils.js` - Helper functions for local storage operations.
- `js/api.js` - Mock data and delay functions.
- `components/` - Extracted HTML snippets for reusability standard.
