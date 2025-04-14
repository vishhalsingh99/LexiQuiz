import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';




function SentenceBuilder() {
    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedWords, setSelectedWords] = useState([]);
    const [timer, setTimer] = useState(30);
    const [timerActive, setTimerActive] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);

   

    const currentQuestion = questions[questionIndex];
    const navigate = useNavigate();



    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get('/data/questions.json');
                const fetchedQuestions = res.data.data.questions;
                setQuestions(fetchedQuestions);
            } catch (err) {
                console.error('Error fetching questions:', err);
            }
        };
        fetchQuestions();
    }, []);


    useEffect(() => {
        if (currentQuestion) {
            const blanks = currentQuestion.question.split(" ").filter(w => w === "___" || w === "_____________").length;
            setSelectedWords(Array(blanks).fill(null));
        }
    }, [questionIndex, currentQuestion]);

    useEffect(() => {
        if (timerActive && timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
        if (timer === 0) {
            handleNext();
        }
    }, [timer, timerActive]);

    useEffect(() => {
        if (questions.length > 0) {
            setTimer(30);
            setTimerActive(true);
        }
    }, [questionIndex, questions]);

    const handleClickOnWord = (word) => {
        if (selectedWords.includes(word)) return;
        const indexToFill = selectedWords.findIndex(w => w === null);
        if (indexToFill !== -1) {
            const newSelected = [...selectedWords];
            newSelected[indexToFill] = word;
            setSelectedWords(newSelected);
        }
    };

    const handleUnselect = (index) => {
        const newSelected = [...selectedWords];
        newSelected[index] = null;
        setSelectedWords(newSelected);
    };

    const handleNext = () => {
        const correct = currentQuestion.correctAnswer;
        const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(correct);

        if (isCorrect) setScore(score + 1);

        const answerDetails = {
            question: currentQuestion.question,
            selected: selectedWords,
            correct: currentQuestion.correctAnswer,
            isCorrect,
        };

        const updatedAnswers = [...userAnswers, answerDetails];
        setUserAnswers(updatedAnswers);

        if (questionIndex + 1 < questions.length) {
            setQuestionIndex(questionIndex + 1);
            setSelectedWords([]);
            setTimer(30);
            setTimerActive(true);
        } else {
            setShowFeedback(true);
            setTimerActive(false);
        }
    };

    const renderQuestion = () => {
        if (!currentQuestion) return null;
        const parts = currentQuestion.question.split(" ");
        let blankIndex = 0;

        return parts.map((word, i) => {
            if (word === "___" || word === "_____________") {
                const filled = selectedWords[blankIndex];
                const idx = blankIndex;
                blankIndex++;
                return (
                    <span
                        key={i}
                        className={`inline-block min-w-[80px] mx-1 py-1 px-2 rounded border text-center cursor-pointer transition ${filled ? "border-blue-500 bg-blue-100 text-blue-600" : "border-gray-400 text-gray-400"}`}
                        onClick={() => handleUnselect(idx)}
                    >
                        {filled || "____"}
                    </span>
                );
            }
            return <span key={i} className="mx-1 text-gray-700 font-medium">{word}</span>;
        });
    };

    const renderOptions = () => {
        if (!currentQuestion) return null;
        return (
            <div className="grid grid-cols-2 gap-4 mt-6">
                {currentQuestion.options.map((word, i) => (
                    <button
                        key={i}
                        onClick={() => handleClickOnWord(word)}
                        className={`py-2 px-4 rounded-full border border-gray-300 shadow-sm text-gray-700 hover:bg-blue-100 transition ${selectedWords.includes(word) ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={selectedWords.includes(word)}
                    >
                        {word}
                    </button>
                ))}
            </div>
        );
    };

    const renderFeedback = () => (
        <div>

            <div className="absolute top-4 right-4">
                <UserButton />
            </div>
            <div className="text-left space-y-4">
                <h2 className="text-2xl font-bold text-center">Quiz Completed</h2>
                <p className="text-center">Your Score: {score} / {questions.length}</p>
                <div className="space-y-6 mt-4">
                    {userAnswers.map((ans, idx) => (
                        <div key={idx} className="p-4 border rounded-xl">
                            <p className="font-semibold text-gray-700">Q{idx + 1}: {ans.question}</p>
                            <p className={`mt-1 ${ans.isCorrect ? "text-green-600" : "text-red-500"}`}>
                                Your Answer: {ans.selected.join(", ")}
                            </p>
                            {!ans.isCorrect && (
                                <p className="text-gray-500">
                                    Correct Answer: {ans.correct.join(", ")}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
                <div>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );

    const allFilled = selectedWords.every(word => word !== null);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-700 px-4">
            <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
                {showFeedback ? (
                    renderFeedback()
                ) : (
                    <>
                        <div className="mt-4 text-xl font-semibold">
                            Time Remaining: {timer} seconds
                        </div>
                        <div className="text-sm text-gray-500 flex justify-center items-center">
                            Question {questionIndex + 1} of {questions.length}
                        </div>
                        <div className="text-lg font-semibold">{renderQuestion()}</div>
                        {renderOptions()}
                        <button
                            className={`mt-6 w-full py-2 px-4 rounded-xl text-white font-medium transition ${allFilled && timer > 0
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-400 cursor-not-allowed"
                                }`}
                            disabled={!allFilled || timer === 0}
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    </>
                )}
            </div>
        </div>

    );
}

export default SentenceBuilder;
