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

// ─── Sample Exam Data ───────────────────────────────────────────────────────
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
      options: ["Value only", "Type only", "Both value and type", "Reference equality only"],
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

// ─── Utility: Format time ────────────────────────────────────────────────────
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ─── Timer Component ─────────────────────────────────────────────────────────
interface TimerProps {
  seconds: number;
  isWarning: boolean;
}

function Timer({ seconds, isWarning }: TimerProps) {
  return (
    <div
      className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-sm sm:text-lg font-bold transition-all duration-500 flex-shrink-0 ${
        isWarning
          ? "bg-red-50 text-red-600 border-2 border-red-300 animate-pulse"
          : "bg-slate-50 text-slate-700 border-2 border-slate-200"
      }`}
    >
      <svg
        className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${isWarning ? "text-red-500" : "text-slate-400"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2" />
      </svg>
      <span>{formatTime(seconds)}</span>
      {isWarning && (
        <span className="hidden xs:inline text-xs font-semibold uppercase tracking-wider text-red-500">
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

function ExamHeader({ exam, timeLeft, isWarning, currentQ, total }: ExamHeaderProps) {
  const progress = (currentQ / total) * 100;
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Title info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
              <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-emerald-600">
                Live Exam
              </span>
            </div>
            <h1 className="text-sm sm:text-lg font-bold text-slate-800 truncate leading-tight">
              {exam.title}
            </h1>
            {/* Hide subject on very small screens, show marks + questions */}
            <div className="flex items-center gap-1.5 sm:gap-3 mt-0.5">
              <span className="text-[10px] sm:text-xs text-slate-500">{exam.totalMarks} Marks</span>
              <span className="text-slate-300">•</span>
              <span className="text-[10px] sm:text-xs text-slate-500">{total} Qs</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="hidden sm:inline text-xs text-slate-500">{exam.subject}</span>
            </div>
          </div>
          {/* Right: Timer */}
          <Timer seconds={timeLeft} isWarning={isWarning} />
        </div>
        {/* Progress bar */}
        <div className="mt-2 sm:mt-3 h-1 sm:h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500"
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
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Question header strip */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <span className="text-violet-200 text-xs sm:text-sm font-semibold uppercase tracking-widest">
            Question {questionIndex + 1}
          </span>
          <span className="text-white/70 text-xs sm:text-sm">
            {questionIndex + 1} / {total}
          </span>
        </div>
      </div>

      {/* Question text */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
        <p className="text-slate-800 text-sm sm:text-lg font-medium leading-relaxed">
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
                  ? "border-violet-500 bg-violet-50 shadow-md shadow-violet-100"
                  : "border-slate-200 bg-slate-50 hover:border-violet-300 hover:bg-violet-50/50"
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
                    ? "bg-violet-600 text-white"
                    : "bg-white border-2 border-slate-300 text-slate-500 group-hover:border-violet-400 group-hover:text-violet-500"
                }`}
              >
                {OPTION_LABELS[idx]}
              </div>
              <span
                className={`text-sm sm:text-base transition-colors duration-200 leading-snug ${
                  isSelected ? "text-violet-800 font-medium" : "text-slate-700"
                }`}
              >
                {option}
              </span>
              {/* Selected checkmark */}
              {isSelected && (
                <div className="ml-auto flex-shrink-0">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-violet-600 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </label>
          );
        })}
      </div>

      {/* Navigation buttons */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 gap-2">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
            isFirst
              ? "text-slate-300 cursor-not-allowed"
              : "text-slate-600 bg-white border-2 border-slate-200 hover:border-violet-300 hover:text-violet-600 hover:shadow-sm active:scale-95"
          }`}
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Prev</span>
        </button>

        {selected !== null && !isLast && (
          <span className="text-[10px] sm:text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 sm:px-3 py-1 rounded-full border border-emerald-200 whitespace-nowrap">
            ✓ Answered
          </span>
        )}

        <button
          onClick={onNext}
          disabled={isLast}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
            isLast
              ? "text-slate-300 cursor-not-allowed"
              : "bg-violet-600 text-white hover:bg-violet-700 hover:shadow-md hover:shadow-violet-200 active:scale-95"
          }`}
        >
          <span>Next</span>
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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
  onNavigate: (index: number) => void;
}

function Sidebar({ total, currentIndex, answers, onNavigate }: SidebarProps) {
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = total - answeredCount;

  return (
    <aside className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-fit">
      {/* Sidebar header */}
      <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-100">
        <h3 className="font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wider">
          Question Navigator
        </h3>
        <div className="flex gap-3 sm:gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm bg-emerald-400 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs text-slate-500">{answeredCount} Done</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm bg-slate-200 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs text-slate-500">{unansweredCount} Left</span>
          </div>
        </div>
      </div>

      {/* Question grid */}
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
                    ? "bg-violet-600 text-white shadow-md shadow-violet-200 ring-2 ring-violet-300"
                    : isAnswered
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-300 hover:bg-emerald-200"
                    : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress ring summary */}
      <div className="px-3 sm:px-5 pb-4 sm:pb-5">
        <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-3">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
            <svg viewBox="0 0 36 36" className="w-10 h-10 sm:w-12 sm:h-12 -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.9" fill="none"
                stroke="#10b981" strokeWidth="3"
                strokeDasharray={`${(answeredCount / total) * 100} 100`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs font-bold text-slate-700">
              {Math.round((answeredCount / total) * 100)}%
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-700">Completion</p>
            <p className="text-[10px] sm:text-xs text-slate-400">{answeredCount}/{total} done</p>
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

function ConfirmModal({ answers, total, onConfirm, onCancel }: ConfirmModalProps) {
  const answered = Object.keys(answers).length;
  const unanswered = total - answered;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onCancel}
      />
      {/* Modal — slides up from bottom on mobile, centered on sm+ */}
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md p-5 sm:p-6">
        {/* Drag handle on mobile */}
        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="text-center mb-5 sm:mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">Submit Exam?</h2>
          <p className="text-slate-500 mt-1 text-xs sm:text-sm">This action cannot be undone.</p>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 space-y-2.5 sm:space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-slate-600">Total Questions</span>
            <span className="font-bold text-slate-800 text-sm sm:text-base">{total}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-emerald-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block flex-shrink-0" />
              Answered
            </span>
            <span className="font-bold text-emerald-700 text-sm sm:text-base">{answered}</span>
          </div>
          {unanswered > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-amber-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block flex-shrink-0" />
                Unanswered
              </span>
              <span className="font-bold text-amber-700 text-sm sm:text-base">{unanswered}</span>
            </div>
          )}
        </div>

        {unanswered > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 sm:p-3 mb-3 sm:mb-4 text-[11px] sm:text-xs text-amber-700">
            ⚠️ You have {unanswered} unanswered question{unanswered > 1 ? "s" : ""}. They will receive 0 marks.
          </div>
        )}

        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors active:scale-95"
          >
            Continue
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-violet-600 text-white font-semibold text-xs sm:text-sm hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200 active:scale-95"
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
    percentage >= 90 ? "A+" :
    percentage >= 80 ? "A" :
    percentage >= 70 ? "B" :
    percentage >= 60 ? "C" : "F";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/30 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 sm:px-8 py-8 sm:py-10 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-3xl sm:text-4xl font-black text-white">{grade}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Exam Submitted!</h1>
            <p className="text-violet-200 mt-1 text-xs sm:text-sm truncate px-4">{EXAM_DATA.title}</p>
          </div>

          <div className="p-5 sm:p-8">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-5 sm:mb-6">
              <div className="text-center bg-slate-50 rounded-xl p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-black text-slate-800">{score}</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-1">Score</div>
              </div>
              <div className="text-center bg-emerald-50 rounded-xl p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-black text-emerald-600">{correct}</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-1">Correct</div>
              </div>
              <div className="text-center bg-red-50 rounded-xl p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-black text-red-500">{total - correct}</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-1">Wrong</div>
              </div>
            </div>

            {/* Accuracy bar */}
            <div className="mb-5 sm:mb-6">
              <div className="flex justify-between text-xs text-slate-500 mb-2">
                <span>Accuracy</span>
                <span className="font-bold">{percentage}%</span>
              </div>
              <div className="h-2.5 sm:h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    percentage >= 70 ? "bg-emerald-400" : percentage >= 50 ? "bg-amber-400" : "bg-red-400"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            <div className="text-[10px] sm:text-xs text-slate-400 text-center">
              Time taken: {formatTime(EXAM_DATA.duration - timeTaken)}
            </div>
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
  const currentQuestion: Question = questions[currentIndex];

  const handleSelect = useCallback(
    (optionIdx: number): void => {
      setAnswers((prev) => ({ ...prev, [currentIndex]: optionIdx }));
    },
    [currentIndex]
  );

  const handleSubmit = useCallback((): void => {
    setTimeTakenAtSubmit(timeLeft);
    setSubmitted(true);
    setShowModal(false);
  }, [timeLeft]);

  // ─── Countdown timer ────────────────────────────────────────
  useEffect(() => {
  if (submitted) return;

  const interval = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        handleSubmit();   // auto submit safely here
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-violet-50/40">
      {/* ─── Exam Header ─── */}
      <ExamHeader
        exam={EXAM_DATA}
        timeLeft={timeLeft}
        isWarning={isWarning}
        currentQ={currentIndex + 1}
        total={questions.length}
      />

      {/* ─── Main Layout ─── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-24 sm:pb-6">
        <div className="flex gap-4 sm:gap-6 relative">

          {/* ─── Mobile Sidebar Toggle (FAB) ─── */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed bottom-20 left-3 sm:bottom-24 sm:left-4 z-30 bg-violet-600 text-white rounded-full w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg shadow-violet-300"
            aria-label="Open question navigator"
          >
            <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>

          {/* ─── Mobile Sidebar Overlay ─── */}
          {sidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 z-40 bg-slate-900/50"
              onClick={() => setSidebarOpen(false)}
            >
              <div
                className="absolute left-0 top-0 h-full w-64 sm:w-72 bg-white shadow-2xl overflow-y-auto pt-4"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                {/* Close button inside drawer */}
                <div className="flex items-center justify-between px-4 mb-2">
                  <span className="text-sm font-bold text-slate-700">Navigator</span>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <Sidebar
                  total={questions.length}
                  currentIndex={currentIndex}
                  answers={answers}
                  onNavigate={(i: number) => {
                    setCurrentIndex(i);
                    setSidebarOpen(false);
                  }}
                />
              </div>
            </div>
          )}

          {/* ─── Question Card (main area) ─── */}
          <div className="flex-1 min-w-0">
            <QuestionCard
              question={currentQuestion}
              questionIndex={currentIndex}
              total={questions.length}
              selected={answers[currentIndex] !== undefined ? answers[currentIndex] : null}
              onSelect={handleSelect}
              onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              onNext={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
            />
          </div>

          {/* ─── Desktop Sidebar ─── */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
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

      {/* ─── Fixed Submit Button ─── */}
      <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-30">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm shadow-xl shadow-violet-300 hover:shadow-2xl hover:shadow-violet-400 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Submit</span>
          <span className="hidden sm:inline">Exam</span>
        </button>
      </div>

      {/* ─── Confirmation Modal ─── */}
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