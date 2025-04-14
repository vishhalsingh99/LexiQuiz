import React from "react";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react"; // Clerk authentication components
import { BrowserRouter, Routes, Route } from "react-router-dom"; // React Router components for routing

import SentenceBuilder from "./components/SentenceBuilder"; // Quiz component
import Home from "./components/Home"; // Home page component

// Get Clerk publishable key from environment variables
const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  // Show error message if Clerk key is missing
  if (!clerkFrontendApi) {
    return <div>Clerk frontend API key is missing!</div>;
  }

  return (
    // Wrap the app with ClerkProvider for authentication context
    <ClerkProvider publishableKey={clerkFrontendApi}>
      <BrowserRouter>
        {/* Only show these routes when the user is signed in */}
        <SignedIn>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home screen */}
            <Route path="/quiz" element={<SentenceBuilder />} /> {/* Quiz screen */}
          </Routes>
        </SignedIn>

        {/* Redirect unauthenticated users to the sign-in page */}
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
