"use client";
import { useState, useEffect, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

interface ExamData {
  title: string;
  subject: string;
  totalMarks: number;
  duration: number;
  questions: Question[];
}

type Answers = Record<number, number>;

// ─── Sample Exam Data ────────────────────────────────────────────────────────
const EXAM_DATA: ExamData = {
  title: "Advanced JavaScript Fundamentals",
  subject: "Computer Science",
  totalMarks: 80,
  duration: 45 * 60,
  questions: [
    {
      id: 1,
      text: "Which of the following correctly describes a closure in JavaScript?",
      options: [
        "A function that is immediately invoked after definition",
        "A function that has access to variables from its outer (enclosing) scope even after the outer function has returned",
        "A method that closes the browser window when called",
        "A way to prevent a function from being called more than once",
      ],
      correct: 1,
    },
    {
      id: 2,
      text: "What is the output of `typeof null` in JavaScript?",
      options: ["'null'", "'undefined'", "'object'", "'boolean'"],
      correct: 2,
    },
    {
      id: 3,
      text: "Which method is used to remove the last element from an array?",
      options: [".shift()", ".pop()", ".splice()", ".slice()"],
      correct: 1,
    },
    {
      id: 4,
      text: "What does the `===` operator check in JavaScript?",
      options: [
        "Value only",
        "Type only",
        "Both value and type",
        "Reference equality only",
      ],
      correct: 2,
    },
    {
      id: 5,
      text: "Which of the following is NOT a primitive data type in JavaScript?",
      options: ["string", "boolean", "object", "symbol"],
      correct: 2,
    },
    {
      id: 6,
      text: "What is event bubbling in JavaScript?",
      options: [
        "When an event fires multiple times",
        "When an event propagates from the target element up through its ancestors",
        "When two events fire simultaneously",
        "When an event is cancelled before it fires",
      ],
      correct: 1,
    },
    {
      id: 11,
      text: "What is event bubbling in JavaScript?",
      options: [
        "When an event fires multiple times",
        "When an event propagates from the target element up through its ancestors",
        "When two events fire simultaneously",
        "When an event is cancelled before it fires",
      ],
      correct: 1,
    },
    {
      id: 7,
      text: "What does `Array.prototype.reduce()` return?",
      options: [
        "Always returns an array",
        "Always returns a number",
        "A single accumulated value based on the callback function",
        "A boolean indicating if reduction was successful",
      ],
      correct: 2,
    },
    {
      id: 8,
      text: "Which statement about Promises is correct?",
      options: [
        "Promises are synchronous",
        "A Promise can be in one of three states: pending, fulfilled, or rejected",
        "Promises replace the need for async/await",
        "Promises can only resolve once per program run",
      ],
      correct: 1,
    },
    {
      id: 9,
      text: "What is the purpose of the `use strict` directive?",
      options: [
        "To enable ES6 features",
        "To make the code run faster",
        "To enforce stricter parsing and error handling in JavaScript",
        "To prevent the use of arrow functions",
      ],
      correct: 2,
    },
    {
      id: 10,
      text: "How does `let` differ from `var` in terms of scoping?",
      options: [
        "let is function-scoped, var is block-scoped",
        "let is block-scoped, var is function-scoped",
        "Both are block-scoped",
        "Both are function-scoped",
      ],
      correct: 1,
    },
  ],
};

const OPTION_LABELS: string[] = ["A", "B", "C", "D"];

// ─── Utility ─────────────────────────────────────────────────────────────────
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ─── Timer ───────────────────────────────────────────────────────────────────
interface TimerProps {
  seconds: number;
  isWarning: boolean;
}

function Timer({ seconds, isWarning }: TimerProps) {
  return (
    <div
      className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-sm sm:text-lg font-bold transition-all duration-500 flex-shrink-0 border-2 ${
        isWarning
          ? "bg-red-50 text-red-600 border-red-400 animate-pulse"
          : "bg-zinc-50 text-zinc-800 border-zinc-200"
      }`}
    >
      <svg
        className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${isWarning ? "text-red-500" : "text-zinc-400"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2" />
      </svg>
      <span>{formatTime(seconds)}</span>
      {isWarning && (
        <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-red-600">
          Hurry!
        </span>
      )}
    </div>
  );
}

// ─── Exam Header ─────────────────────────────────────────────────────────────
interface ExamHeaderProps {
  exam: ExamData;
  timeLeft: number;
  isWarning: boolean;
  currentQ: number;
  total: number;
}

function ExamHeader({
  exam,
  timeLeft,
  isWarning,
  currentQ,
  total,
}: ExamHeaderProps) {
  const progress = (currentQ / total) * 100;
  return (
    <header className="bg-white border-b border-zinc-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
              {/* Live badge */}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 border border-red-200">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse flex-shrink-0" />
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-red-700">
                  Live
                </span>
              </span>
            </div>
            <h1 className="text-sm sm:text-lg font-bold text-zinc-900 truncate leading-tight mt-0.5">
              {exam.title}
            </h1>
            <div className="flex items-center gap-1.5 sm:gap-3 mt-0.5">
              <span className="text-[10px] sm:text-xs text-zinc-500">
                {exam.totalMarks} Marks
              </span>
              <span className="text-zinc-300">•</span>
              <span className="text-[10px] sm:text-xs text-zinc-500">
                {total} Qs
              </span>
              <span className="hidden sm:inline text-zinc-300">•</span>
              <span className="hidden sm:inline text-xs text-zinc-500">
                {exam.subject}
              </span>
            </div>
          </div>
          <Timer seconds={timeLeft} isWarning={isWarning} />
        </div>
        {/* Progress bar — red */}
        <div className="mt-2 sm:mt-3 h-1 sm:h-1.5 bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-red-700 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </header>
  );
}

// ─── Question Card ────────────────────────────────────────────────────────────
interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  total: number;
  selected: number | null;
  onSelect: (idx: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

function QuestionCard({
  question,
  questionIndex,
  total,
  selected,
  onSelect,
  onPrev,
  onNext,
}: QuestionCardProps) {
  const isFirst = questionIndex === 0;
  const isLast = questionIndex === total - 1;

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
      {/* Header strip — black */}
      <div className="bg-black px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <span className="text-zinc-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
            Question {questionIndex + 1}
          </span>
          <span className="text-zinc-500 text-xs sm:text-sm">
            {questionIndex + 1} / {total}
          </span>
        </div>
      </div>

      {/* Question text */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
        <p className="text-zinc-900 text-sm sm:text-lg font-medium leading-relaxed">
          {question.text}
        </p>
      </div>

      {/* Options */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-2 sm:space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selected === idx;
          return (
            <label
              key={idx}
              className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group ${
                isSelected
                  ? "border-red-600 bg-red-50 shadow-md shadow-red-100"
                  : "border-zinc-200 bg-zinc-50 hover:border-red-300 hover:bg-red-50/40"
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={idx}
                checked={isSelected}
                onChange={() => onSelect(idx)}
                className="sr-only"
              />

              {/* Option letter badge */}
              <div
                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 transition-all duration-200 ${
                  isSelected
                    ? "bg-red-600 text-white"
                    : "bg-white border-2 border-zinc-300 text-zinc-500 group-hover:border-red-400 group-hover:text-red-600"
                }`}
              >
                {OPTION_LABELS[idx]}
              </div>

              <span
                className={`text-sm sm:text-base transition-colors duration-200 leading-snug ${
                  isSelected ? "text-red-900 font-medium" : "text-zinc-700"
                }`}
              >
                {option}
              </span>

              {/* Checkmark */}
              {isSelected && (
                <div className="ml-auto flex-shrink-0">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-600 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </label>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/50 gap-2">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
            isFirst
              ? "text-zinc-300 cursor-not-allowed"
              : "text-zinc-600 bg-white border-2 border-zinc-200 hover:border-red-400 hover:text-red-600 hover:shadow-sm active:scale-95"
          }`}
        >
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Prev</span>
        </button>

        {selected !== null && !isLast && (
          <span className="text-[10px] sm:text-xs text-red-700 font-semibold bg-red-50 px-2 sm:px-3 py-1 rounded-full border border-red-200 whitespace-nowrap">
            ✓ Answered
          </span>
        )}

        <button
          onClick={onNext}
          disabled={isLast}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
            isLast
              ? "text-zinc-300 cursor-not-allowed"
              : "bg-black text-white hover:bg-zinc-800 hover:shadow-md active:scale-95"
          }`}
        >
          <span>Next</span>
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Sidebar / Quick Navigation ───────────────────────────────────────────────
interface SidebarProps {
  total: number;
  currentIndex: number;
  answers: Answers;
  onNavigate: (i: number) => void;
}

function Sidebar({ total, currentIndex, answers, onNavigate }: SidebarProps) {
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = total - answeredCount;

  return (
    <aside className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden h-fit">
      {/* Header */}
      <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-zinc-100 bg-black">
        <h3 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider">
          Question Navigator
        </h3>
        <div className="flex gap-3 sm:gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-red-500 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs text-zinc-400">
              {answeredCount} Done
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-zinc-600 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs text-zinc-400">
              {unansweredCount} Left
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {Array.from({ length: total }, (_, i) => {
            const isAnswered = answers[i] !== undefined;
            const isCurrent = i === currentIndex;
            return (
              <button
                key={i}
                onClick={() => onNavigate(i)}
                className={`w-full aspect-square rounded-lg text-[10px] sm:text-xs font-bold transition-all duration-150 hover:scale-105 active:scale-95 ${
                  isCurrent
                    ? "bg-red-600 text-white shadow-md shadow-red-200 ring-2 ring-red-300"
                    : isAnswered
                      ? "bg-zinc-900 text-white border border-zinc-700 hover:bg-zinc-800"
                      : "bg-zinc-100 text-zinc-500 border border-zinc-200 hover:bg-zinc-200"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress ring */}
      <div className="px-3 sm:px-5 pb-4 sm:pb-5">
        <div className="bg-zinc-50 rounded-xl p-3 flex items-center gap-3 border border-zinc-100">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
            <svg
              viewBox="0 0 36 36"
              className="w-10 h-10 sm:w-12 sm:h-12 -rotate-90"
            >
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                stroke="#e4e4e7"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                stroke="#dc2626"
                strokeWidth="3"
                strokeDasharray={`${(answeredCount / total) * 100} 100`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs font-bold text-zinc-800">
              {Math.round((answeredCount / total) * 100)}%
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-800">Completion</p>
            <p className="text-[10px] sm:text-xs text-zinc-400">
              {answeredCount}/{total} done
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Confirmation Modal ───────────────────────────────────────────────────────
interface ConfirmModalProps {
  answers: Answers;
  total: number;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({
  answers,
  total,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const answered = Object.keys(answers).length;
  const unanswered = total - answered;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md p-5 sm:p-6">
        {/* Drag handle */}
        <div className="w-10 h-1 bg-zinc-200 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="text-center mb-5 sm:mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
            Submit Exam?
          </h2>
          <p className="text-zinc-500 mt-1 text-xs sm:text-sm">
            This action cannot be undone.
          </p>
        </div>

        <div className="bg-zinc-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-5 space-y-2.5 border border-zinc-100">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-zinc-600">
              Total Questions
            </span>
            <span className="font-bold text-zinc-900">{total}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-zinc-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-zinc-900 inline-block" />
              Answered
            </span>
            <span className="font-bold text-zinc-900">{answered}</span>
          </div>
          {unanswered > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-red-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                Unanswered
              </span>
              <span className="font-bold text-red-600">{unanswered}</span>
            </div>
          )}
        </div>

        {unanswered > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 sm:p-3 mb-4 text-[11px] sm:text-xs text-red-700">
            ⚠️ You have {unanswered} unanswered question
            {unanswered > 1 ? "s" : ""}. They will receive 0 marks.
          </div>
        )}

        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border-2 border-zinc-200 text-zinc-700 font-semibold text-xs sm:text-sm hover:bg-zinc-50 transition-colors active:scale-95"
          >
            Continue
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-red-600 text-white font-semibold text-xs sm:text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-200 active:scale-95"
          >
            Submit Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────────────
interface ResultScreenProps {
  answers: Answers;
  questions: Question[];
  timeTaken: number;
}

function ResultScreen({ answers, questions, timeTaken }: ResultScreenProps) {
  const correct = questions.filter((q, i) => answers[i] === q.correct).length;
  const total = questions.length;
  const score = Math.round((correct / total) * EXAM_DATA.totalMarks);
  const percentage = Math.round((correct / total) * 100);

  const grade =
    percentage >= 90
      ? "A+"
      : percentage >= 80
        ? "A"
        : percentage >= 70
          ? "B"
          : percentage >= 60
            ? "C"
            : "F";

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-zinc-200 overflow-hidden">
          {/* Result header — black */}
          <div className="bg-black px-6 sm:px-8 py-8 sm:py-10 text-center relative overflow-hidden">
            {/* Decorative red circle */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-red-600/20" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-red-600/10" />
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-red-900/50">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {grade}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Exam Submitted!
              </h1>
              <p className="text-zinc-400 mt-1 text-xs sm:text-sm truncate px-4">
                {EXAM_DATA.title}
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-5 sm:mb-6">
              <div className="text-center bg-zinc-50 rounded-xl p-3 sm:p-4 border border-zinc-100">
                <div className="text-xl sm:text-2xl font-black text-zinc-900">
                  {score}
                </div>
                <div className="text-[10px] sm:text-xs text-zinc-500 mt-1">
                  Score
                </div>
              </div>
              <div className="text-center bg-zinc-900 rounded-xl p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-black text-white">
                  {correct}
                </div>
                <div className="text-[10px] sm:text-xs text-zinc-400 mt-1">
                  Correct
                </div>
              </div>
              <div className="text-center bg-red-50 rounded-xl p-3 sm:p-4 border border-red-100">
                <div className="text-xl sm:text-2xl font-black text-red-600">
                  {total - correct}
                </div>
                <div className="text-[10px] sm:text-xs text-zinc-500 mt-1">
                  Wrong
                </div>
              </div>
            </div>

            {/* Accuracy bar */}
            <div className="mb-5 sm:mb-6">
              <div className="flex justify-between text-xs text-zinc-500 mb-2">
                <span className="font-medium">Accuracy</span>
                <span className="font-bold text-zinc-900">{percentage}%</span>
              </div>
              <div className="h-2.5 sm:h-3 bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    percentage >= 70
                      ? "bg-zinc-900"
                      : percentage >= 50
                        ? "bg-zinc-600"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            <p className="text-[10px] sm:text-xs text-zinc-400 text-center">
              Time taken: {formatTime(EXAM_DATA.duration - timeTaken)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Live Exam Page ──────────────────────────────────────────────────────
export default function LiveExamPage() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [timeLeft, setTimeLeft] = useState<number>(EXAM_DATA.duration);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [timeTakenAtSubmit, setTimeTakenAtSubmit] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const isWarning: boolean = timeLeft <= 5 * 60;
  const questions: Question[] = EXAM_DATA.questions;
  const currentQuestion = questions[currentIndex];

  const handleSelect = useCallback(
    (optionIdx: number): void => {
      setAnswers((prev) => ({ ...prev, [currentIndex]: optionIdx }));
    },
    [currentIndex],
  );

  const handleSubmit = useCallback((): void => {
    setTimeTakenAtSubmit(timeLeft);
    setSubmitted(true);
    setShowModal(false);
  }, [timeLeft]);

  // ─── Countdown timer ─────────────────────────────────────────
  useEffect(() => {
    if (submitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [submitted, handleSubmit]);

  if (submitted) {
    return (
      <ResultScreen
        answers={answers}
        questions={questions}
        timeTaken={timeTakenAtSubmit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100">
      {/* ─── Header ─── */}
      <ExamHeader
        exam={EXAM_DATA}
        timeLeft={timeLeft}
        isWarning={isWarning}
        currentQ={currentIndex + 1}
        total={questions.length}
      />

      {/* ─── Layout ─── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-24 sm:pb-6">
        <div className="flex gap-4 sm:gap-6 relative">
          {/* Mobile FAB */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed bottom-20 left-3 sm:bottom-24 sm:left-4 z-30 bg-black text-white rounded-full w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg shadow-black/30"
            aria-label="Open navigator"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>

          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            >
              <div
                className="absolute left-0 top-0 h-full w-64 sm:w-72 bg-white shadow-2xl overflow-y-auto"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-4 py-4 bg-black">
                  <span className="text-sm font-bold text-white">
                    Navigator
                  </span>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-800"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <Sidebar
                  total={questions.length}
                  currentIndex={currentIndex}
                  answers={answers}
                  onNavigate={(i) => {
                    setCurrentIndex(i);
                    setSidebarOpen(false);
                  }}
                />
              </div>
            </div>
          )}

          {/* Question Card */}
          <div className="flex-1 min-w-0">
            <QuestionCard
              question={currentQuestion}
              questionIndex={currentIndex}
              total={questions.length}
              selected={
                answers[currentIndex] !== undefined
                  ? answers[currentIndex]
                  : null
              }
              onSelect={handleSelect}
              onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              onNext={() =>
                setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))
              }
            />
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <Sidebar
                total={questions.length}
                currentIndex={currentIndex}
                answers={answers}
                onNavigate={setCurrentIndex}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit button — red */}
      <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-30">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 sm:gap-2 bg-red-600 text-white px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm shadow-xl shadow-red-300 hover:bg-red-700 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Submit</span>
          <span className="hidden sm:inline">Exam</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <ConfirmModal
          answers={answers}
          total={questions.length}
          onConfirm={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
