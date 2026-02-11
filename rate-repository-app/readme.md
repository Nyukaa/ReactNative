# Rate Repository App – React Native + Apollo GraphQL

A junior-friendly mobile application that lists GitHub repositories, supports authentication, and demonstrates clean state management and server communication using Apollo Client.

The app consumes a local GraphQL API (rate-repository-api) to display repository data, handle sign-in, and persist access tokens securely on device.

## 🌐 API

Local GraphQL API (Apollo Server) with SQLite, seed data, and minimal REST endpoints.

## 👩‍💻 Author

Your Name  
GitHub | Portfolio

## 🛠 Technologies Used

- Mobile: React Native (Expo), React Router Native
- Data: Apollo Client, GraphQL
- Auth & Storage: AsyncStorage (token persistence), JWT (via backend)
- Backend: Node.js, Koa, Apollo Server, Objection.js + Knex, SQLite
- Utility: Yup (validation), Formik (forms)

## 🎛 How It Works

- **Repository List** — Fetches repositories via GraphQL query and renders items with stats (stars, forks, reviews, rating).
- **Authentication** — Sign-in form posts credentials with GraphQL mutation; stores JWT in AsyncStorage; Apollo attaches Authorization header automatically.
- **App Bar** — Reflects auth state using “me” query; toggles between Sign in / Sign out.
- **Theming** — Platform-aware font selection and shared colors via a central theme.

## ⭐ User Modes

### Guest Mode

- Can browse repositories
- No token stored
- App Bar shows “Sign in”

### Authenticated Mode

- Retrieves and stores JWT in AsyncStorage
- App Bar shows “Sign out”
- Apollo Client sends Bearer token on requests
- Store reset ensures fresh, authorized cache

## 🧭 Architecture Overview

### Mobile (rate-repository-app)

- **Routing**: Routes for repository list and sign-in
- **State**: Lightweight state with Apollo cache and React hooks
- **Auth**: `useAuthStorage()` exposes storage via Context; `useSignIn()` handles mutation and token lifecycle

### Backend (rate-repository-api)

- Apollo Server (GraphQL) + Koa (REST)
- SQLite with Objection.js models
- Data loaders and cursor-based pagination
- JWT-based auth and GitHub API enrichment

## 🚀 Quick Start

### Backend (GraphQL API)

- **Location**: `/Users/s2500281/Documents/ReactNative/rate-repository-api`
- **Setup**:
  ```
  npm install
  cp .env.template .env
  # set GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, JWT_SECRET
  npm run build
  npm run seed:run
  npm start
  ```
- **GraphQL**: http://localhost:4000
- **REST**: http://localhost:5000/api

### Mobile App (Expo)

- **Location**: `/Users/s2500281/Documents/ReactNative/rate-repository-app`
- **Configure APOLLO_URI env**:
  - iOS simulator / Android emulator: `APOLLO_URI=http://localhost:4000`
  - Android emulator alt: `APOLLO_URI=http://10.0.2.2:4000`
  - Physical device: `APOLLO_URI=http://<your-ip>:4000`
- **Start**:
  ```
  APOLLO_URI=http://localhost:4000 npm run start
  ```

## 🔐 Authentication

- **Seed users**: kalle, elina, matti, johndoe, leeroyjenkins
- **Password**: password
- **Frontend**:
  - `SignIn.jsx` (Formik + Yup validation)
  - `useSignIn` hook (AUTHENTICATE mutation, token store, cache reset)
  - AppBar reflects “me” query state
- **Backend**:
  - `authenticate` mutation returns `{ user, accessToken, expiresAt }`
  - JWT verified per request and user resolved via data loaders

## 📄 Data Model (Backend)

- **Repository**: ownerName, name, stats (stars, forks, reviews, rating)
- **Review**: userId, repositoryId, rating, text, createdAt
- **User**: username, createdAt, reviewCount

## 📚 What We Demonstrate

- Expo-based React Native app structure with routing
- Apollo Client integration and GraphQL queries/mutations
- JWT token persistence and auth-aware client configuration
- Clean UI composition and theming
- Cursor-based pagination and efficient data loading on the backend

## 🧰 Tools Recap

- React Native (Expo), React Router Native
- Apollo Client, GraphQL
- AsyncStorage, Formik, Yup
- Node.js, Koa, Apollo Server, Objection.js/Knex, SQLite
