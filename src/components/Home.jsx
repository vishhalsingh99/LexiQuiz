import React from "react";
import { useNavigate } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react"; // Import Clerk's user profile button

function Home() {
  const navigate = useNavigate();

  // Navigate to the quiz route when the user clicks "Start Quiz"
  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  return (
    // Full screen center-aligned layout with background
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-600">
      
      {/* UserButton (top-right) for profile/logout */}
      <div className="absolute top-4 right-4">
        <UserButton />
      </div>

      {/* Card container with welcome text and start button */}
      <div className="bg-white rounded-xl shadow-md p-10 text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Quiz App</h1>
        <p className="text-gray-600 mb-8">Click the button below to start the quiz!</p>
        
        {/* Start Quiz Button */}
        <button
          onClick={handleStartQuiz}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default Home;
