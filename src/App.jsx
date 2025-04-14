import React from "react";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SentenceBuilder from "./components/SentenceBuilder";
import Home from "./components/Home";

const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  if (!clerkFrontendApi) {
    return <div>Clerk frontend API key is missing!</div>;
  }

  return (
    <ClerkProvider publishableKey={clerkFrontendApi}>
      <BrowserRouter>
        <SignedIn>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<SentenceBuilder />} />
          </Routes>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
