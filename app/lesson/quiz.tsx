"use client";

import { useEffect, useState } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { useRouter } from "next/navigation";
import { useAudio, useWindowSize } from "react-use";
import Image from "next/image";
import { ResultCard } from "./result-card";
import Confetti from "react-confetti";
import { useAuth } from "@/context/AuthContext";
import { updateUserProgress } from "@/lib/db/updateUserProgress";
import { getUserByID } from "@/lib/db/getUserByID";
import { updateUserState } from "@/lib/db/updateUserState";

type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: string;
    initialLessonChallenges: any[];
    userSubscription: any;
};

export const Quiz = ({ initialPercentage, initialHearts, initialLessonId, initialLessonChallenges, userSubscription }: Props) => {
    const router = useRouter();
    const { user } = useAuth();
    const { width, height } = useWindowSize();

    const [finishAudio, _f, finishControls] = useAudio({ src: "/trumpet.mp3" });
    const [correctAudio, _c, correctControls] = useAudio({ src: "/success.mp3" });
    const [incorrectAudio, _i, incorrectControls] = useAudio({ src: "/success.mp3" });

    const [lessonId] = useState(initialLessonId);
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    useEffect(() => {
        if (!challenge) {
            finishControls.play();
        }
    }, [challenge]);

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    }

    const onSelect = (id: number) => {
        if (status !== "none") return;

        setSelectedOption(id);
    };

    const onContinue = () => {
        if (!selectedOption) return;
        if (status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        const correctOption = options.find((option: any) => option.correct);

        if (correctOption && correctOption.id === selectedOption) {
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);
            if (initialPercentage === 100) {
                setHearts((prev) => Math.min(prev + 1, 5))
            }
            correctControls.play();
        } else {
            setStatus("wrong")
            setHearts((prev) => Math.max(prev - 1, 0))
            incorrectControls.play();
        }
    };

    if (!challenge) {
        return (
            <>
                {finishAudio}
                <Confetti recycle={false} numberOfPieces={500} tweenDuration={10000} width={width} height={height} />
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                    <Image
                        src="/confetti.svg"
                        alt="Finish"
                        className="hidden lg:block"
                        height={100}
                        width={100}
                    />
                    <Image
                        src="/confetti.svg"
                        alt="Finish"
                        className="block lg:hidden"
                        height={50}
                        width={50}
                    />
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                        Great job <br /> You've completed the lesson.
                    </h1>
                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard
                            variant="points"
                            value={challenges.length * 10}
                        />
                        <ResultCard
                            variant="hearts"
                            value={hearts}
                        />
                    </div>
                </div>
                <Footer
                    lessonId={lessonId}
                    status="completed"
                    onCheck={async () => {
                        if (!user?.uid) return;

                        try {
                            const userData = await getUserByID(user.uid);
                            const nextLessonId = String(Number(lessonId) + 1);

                            await updateUserState(user.uid, {
                                lessonID: nextLessonId,
                                percentage: 0,
                            });

                            const newPoints = (userData.points || 0) + 10;
                            const newHearts = hearts ?? 3;

                            await updateUserProgress(user.uid, newPoints, newHearts);

                            router.push("/learn");
                        } catch (error) {
                            console.error("Błąd przy aktualizacji lekcji:", error);
                        }
                    }}
                />
            </>
        )
    }

    return (
        <>
            {finishAudio}
            {correctAudio}
            {incorrectAudio}
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="sm:min-h-[350px] sm:w-[600px] w-full px-6 sm:px-0 flex flex-col gap-y-12">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                            <div className="w-full max-w-[200px] order-1 sm:order-2 mx-auto sm:mx-0">
                                <Image
                                    src={challenge.imageSrc}
                                    alt="ChessBoard"
                                    width={200}
                                    height={200}
                                    className="w-full h-auto rounded-sm shadow-md"
                                    unoptimized
                                />
                            </div>

                            <div className="order-2 sm:order-1 flex-1">
                                <QuestionBubble question={challenge.question} />
                            </div>
                        </div>
                        <div>
                            <Challenge
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption}
                                disabled={false}
                                type={challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                disabled={!selectedOption}
                status={status}
                onCheck={onContinue}
            />
        </>
    );
};