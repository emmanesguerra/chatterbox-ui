# Chatterbox UI

## 📌 Overview
Chatterbox UI is a frontend interface built with Vue.js for an AI-powered chat application. Similar to ChatGPT, Chatterbox utilizes Gemini AI for generating bot responses. This project serves as the user interface, handling message rendering, user interactions, and state management.

## 🚀 Technologies Used
- **Vue 3**
- **Vue Router**
- **Pinia** (State Management)
- **Axios** (API Requests)
- **Day.js** (Date & Time Handling)
- **Remix Icon** (Icons)
- **Sass** (CSS Preprocessing)
- **TypeScript** (Strict Type Checking)
- **Vite** (Build Tool)

## 📂 Project Structure
```
src/
├── assets/
│   ├── styles/            # Global styles and SCSS files
├── components/            # Reusable Vue components
├── core/
│   ├── services/          # Core services (e.g., API handlers)
├── modules/
│   ├── chat/              # Chat module
│   │   ├── assets/        # Chat-specific assets (e.g., images, styles)
│   │   ├── components/    # Components related to chat (e.g., messages, input box)
│   │   ├── pages/         # Chat-related pages (e.g., ChatView.vue)
│   │   ├── services/      # API services for chat module
│   │   ├── store/         # Pinia store for chat-related state management
├── router/                # Vue Router configurations
├── App.vue                # Root Vue component
├── main.ts                # Application entry point
tests/
├── components/            # Unit tests for components
.env                       # Environment variables configuration
package.json               # Project dependencies and scripts

```

## 📌 Prerequisites
- **Node.js** v20 or later (recommended)
- **npm** v8 or later

Check your installed versions with:
```sh
node -v
npm -v
```

## 🛠️ Setup & Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/emmanesguerra/chatterbox-ui.git
cd chatterbox-ui
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Setup Environment Variables  
Create a `.env` file in the root directory and configure:
```sh
cp .env.example .env
```
```ini
VITE_APP_API_URL=http://your-backend-api.com/api/
```

### 4️⃣ Run the Project
```sh
npm run dev
```

## 📜 Available Scripts
| Command               | Description                   |
|-----------------------|-------------------------------|
| `npm run dev`         | Start development server      |
| `npm run test`        | Run unit tests with Vitest    |


### 👥 Contributors
- [Emmanuelle Esguerra](https://github.com/emmanesguerra)


### ⚠️ Disclaimer  
This project is developed solely for **learning and experimentation**. It is not intended for production use, and no guarantees are provided regarding its functionality or security.