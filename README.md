
---

# 📘 LexiQuiz – Sentence Construction Quiz App

LexiQuiz is an interactive sentence-building quiz application built using **React**, **Vite**, **Tailwind CSS**, and **Clerk Authentication**. The goal of the app is to help users practice sentence construction through timed word placement quizzes.

---

## 🚀 Features

- 🔐 **Authentication** via Google/Facebook using Clerk
- 🧠 **Sentence-building questions** with fill-in-the-blank format
- ⏱️ **Countdown timer** for each question (30 seconds)
- ✅ **Real-time validation** and scoring
- 📊 **Feedback page** after quiz completion showing:
  - Correct/Incorrect answers
  - User's total score
  - Detailed comparison
- 🧭 Smooth routing using React Router
- 🎨 Responsive and clean UI with Tailwind CSS

---

## 🛠️ Tech Stack

| Technology    | Purpose                            |
|---------------|-------------------------------------|
| React         | UI development                     |
| Vite          | Frontend tooling + dev server      |
| Tailwind CSS  | Styling                            |
| Clerk         | Authentication (Google/Facebook)   |
| Axios         | API call for fetching quiz data    |
| React Router  | Routing between Home/Quiz/Feedback |

---

## 📁 Project Structure

```bash
LexiQuiz/
├── public/
│   └── data/
│       └── questions.json       # Quiz question bank
├── src/
│   ├── components/
│   │   ├── Home.jsx             # Home screen
│   │   └── SentenceBuilder.jsx  # Main quiz logic
│   ├── App.jsx                  # Main routing & auth logic
│   └── main.jsx                 # Entry point
├── .env                         # Clerk keys
├── tailwind.config.js          # Tailwind config
└── vite.config.js              # Vite config
```

---

## 🧪 Sample Question Format (questions.json)

```json
{
  "data": {
    "questions": [
      {
        "questionId": 1,
        "question": "The ___ is barking at the ___",
        "questionType": "sentenceBuilder",
        "answerType": "wordSelection",
        "options": ["dog", "man", "tree", "car"],
        "correctAnswer": ["dog", "man"]
      }
    ]
  }
}
```

---

## 🔐 Authentication Setup

1. Create a Clerk account at [clerk.dev](https://clerk.dev)
2. Add Google and/or Facebook OAuth providers.
3. Copy the **Frontend API key** and paste it in your `.env` file:

```env
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-frontend-api-key
```

---

## 🧑‍💻 How to Run Locally

1. **Clone the repo**:
```bash
git clone https://github.com/vishhalsingh99/LexiQuiz.git
cd LexiQuiz
```

2. **Install dependencies**:
```bash
npm install
```

3. **Run the dev server**:
```bash
npm run dev
```

4. Open in browser: `http://localhost:5173`

---

## ✅ Completed Tasks

- [x] Sentence quiz logic
- [x] Timer with auto-switch
- [x] Feedback summary screen
- [x] Clerk authentication
- [x] JSON API question loading
- [x] Clean responsive UI with Tailwind

---

## 🌐 Deployment

[Visit LexiQuiz Project](https://lexiquiz.netlify.app/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---
