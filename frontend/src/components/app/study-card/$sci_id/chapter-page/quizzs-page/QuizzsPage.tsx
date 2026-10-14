// library
import { useState } from "react";

// component
import { IconX } from "../../../../../icon/icon-static/IconX";
import { IconTick } from "../../../../../icon/icon-static/IconTick";
import { IconRedo } from "../../../../../icon/icon-static/IconRedo";
import { SipnnerLoad } from "../../../../../loading-state/SipnnerLoad";

// context
import { useOnChapter } from "../../../../../../context/useOnChapter";

// api
import { useGetStudyCardLesson } from "../../../../../../api/study-card/study-card";
import { useGetQuizs } from "../../../../../../api/study-card/chapter/chapter";
import { useAnswerQuiz } from "../../../../../../api/study-card/chapter/chapter";

interface QuizzsPageProps {
  sci_id: string;
}

export function QuizzsPage({ sci_id }: QuizzsPageProps) {
  const { currentChapter } = useOnChapter();

  const { data: studyLesson } = useGetStudyCardLesson(Number(sci_id));
  const [quizNumber, setQuizNumber] = useState(0);

  const current = studyLesson?.find(
    (chapter) => chapter.pc_number === Number(currentChapter.split("-")[1]),
  );

  const { mutate, isPending } = useAnswerQuiz(current?.chapter_id);

  const [answer, setAnswer] = useState<"A" | "B" | "C" | null>(null);

  const { data: quizsData } = useGetQuizs(current?.chapter_id);

  const currentQuiz = quizsData?.[quizNumber];
  const choices = currentQuiz?.choice.split("|||");

  const totalAnswer = quizsData?.filter((item) => item.qa_id);
  const totalMiss = totalAnswer?.filter((item) => !item.is_correct).length;
  const totalCorrect = totalAnswer?.filter((item) => item.is_correct).length;

  function handleChangeQuizsNumber(num: number) {
    if (num === quizNumber) {
      return;
    }
    setQuizNumber(num);
    setAnswer(null);
  }

  function handleSelectAnswer(choice: "A" | "B" | "C") {
    if (currentQuiz?.qa_id) {
      return;
    }

    setAnswer(choice);
  }

  const handleAnswerQuiz = () => {
    if (!answer || !current || !currentQuiz) {
      return;
    }

    const isCorrect = answer === currentQuiz?.correct_answer;

    mutate({
      sci_id: current.sci_id,
      pq_id: currentQuiz.pq_id,
      answer: answer,
      is_correct: isCorrect,
    });

    setAnswer(null);
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex items-center justify-between">
        <span className="text-section font-semibold">Quizzs</span>
        <div className="flex items-center gap-2">
          <div className="text-small flex items-center gap-1 rounded-lg border border-(--color-error-text) bg-(--color-error-background) px-2 py-1.5 text-(--color-error-text)">
            <IconX size={14} strokeWidth={5} />
            <span className="font-semibold">{totalMiss}</span>
            Miss
          </div>
          <div className="text-small flex items-center gap-1 rounded-lg border border-(--color-primary-text) bg-(--color-primary-soft) px-2 py-1.5 text-(--color-primary-text)">
            <IconTick size={14} strokeWidth={2.5} />
            <span className="font-semibold">{totalCorrect}</span> Correct
          </div>
          <div className="text-small rounded-lg border border-(--color-border-strong) bg-(--color-surface-subtle) px-2 py-1.5">
            <span className="font-semibold">
              {totalAnswer?.length}/{current?.total_quizs}
            </span>{" "}
            Total
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-1.5">
        {quizsData?.map((item, index) => {
          return (
            <div
              role="buttom"
              onClick={() => handleChangeQuizsNumber(index)}
              key={index}
              className={`h-2 flex-1 cursor-pointer rounded-2xl ${
                item.qa_id === null
                  ? "bg-gray-300"
                  : item.is_correct
                    ? "bg-(--color-primary)"
                    : "bg-(--color-error-text)"
              } `}
            />
          );
        })}
      </div>

      <div className="mt-4 flex flex-col items-start gap-1.5">
        <span className="text-caption rounded-2xl bg-(--color-border-strong) px-3 py-1 font-semibold text-(--color-text-secondary)">
          Question {quizNumber + 1}
        </span>
        <h1 className="text-3xl font-semibold">{currentQuiz?.question}</h1>
      </div>

      <div className="mt-5 flex gap-5">
        <div
          role="button"
          onClick={() => handleSelectAnswer("A")}
          className={`flex min-h-35 flex-1 flex-col justify-between rounded-xl border p-4 transition-colors duration-100 ${
            currentQuiz?.qa_id && currentQuiz?.answer === "A"
              ? currentQuiz?.is_correct
                ? "border-none bg-(--color-primary) text-white"
                : "border-(--color-error-text) bg-(--color-error-background)"
              : answer === "A"
                ? "border-(--color-primary) bg-(--color-primary-soft)"
                : `border-(--color-border-strong) bg-(--color-surface-subtle) ${currentQuiz?.qa_id ? "" : "cursor-pointer hover:border-(--color-primary)"}`
          } `}
        >
          <p className="text-section font-medium">A</p>
          <span>{choices?.[0].split(":")[1]}</span>
        </div>
        <div
          role="button"
          onClick={() => handleSelectAnswer("B")}
          className={`flex min-h-35 flex-1 flex-col justify-between rounded-xl border p-4 transition-colors duration-100 ${
            currentQuiz?.qa_id && currentQuiz?.answer === "B"
              ? currentQuiz?.is_correct
                ? "border-none bg-(--color-primary) text-white"
                : "border-(--color-error-text) bg-(--color-error-background)"
              : answer === "B"
                ? "border-(--color-primary) bg-(--color-primary-soft)"
                : `border-(--color-border-strong) bg-(--color-surface-subtle) ${currentQuiz?.qa_id ? "" : "cursor-pointer hover:border-(--color-primary)"} `
          } `}
        >
          <p className="text-section font-medium">B</p>
          <span>{choices?.[1].split(":")[1]}</span>
        </div>
        <div
          role="button"
          onClick={() => handleSelectAnswer("C")}
          className={`flex min-h-35 flex-1 flex-col justify-between rounded-xl border p-4 transition-colors duration-100 ${
            currentQuiz?.qa_id && currentQuiz?.answer === "C"
              ? currentQuiz?.is_correct
                ? "border-none bg-(--color-primary) text-white"
                : "border-(--color-error-text) bg-(--color-error-background)"
              : answer === "C"
                ? "border-(--color-primary) bg-(--color-primary-soft)"
                : `border-(--color-border-strong) bg-(--color-surface-subtle) ${currentQuiz?.qa_id ? "" : "cursor-pointer hover:border-(--color-primary)"}`
          }`}
        >
          <p className="text-section font-medium">C</p>
          <span>{choices?.[2].split(":")[1]}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button className="text-small flex cursor-pointer items-center gap-2 rounded-full border border-(--color-border-strong) px-4 py-2 font-medium">
          <IconRedo size={15} /> Redo
        </button>

        <button
          disabled={isPending}
          onClick={handleAnswerQuiz}
          className={`text-small ${isPending ? "cursor-not-allowed" : "cursor-pointer"} rounded-full bg-(--color-primary) px-4 py-2 font-medium text-(--color-text-inverse)`}
        >
          {isPending ? <SipnnerLoad /> : "Submit"}
        </button>
      </div>
    </div>
  );
}
