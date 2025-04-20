import { FeedWrapper } from "@/components/feed-wrapper";
import { Info } from "@/components/info";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { userProgressData } from "@/data/userProgress";
import Image from "next/image";

const theory = [
    {
        title: "What is a square on the chessboard?",
        description:
            "The chessboard has 64 squares, labeled with letters (a–h) horizontally and numbers (1–8) vertically. For example, e4 is a central square.",
        imageSrc: "/q11.png",
    },
    {
        title: "White and black squares",
        description:
            "Square colors alternate. The bottom-right square must always be white — this is essential for correctly setting up the board.",
        imageSrc: "/q11.png",
    },
    {
        title: "Recognizing diagonals",
        description:
            "Squares like c1 and h6 lie on the same diagonal. Training your mind to 'see' diagonals helps with understanding bishop and queen movement.",
        imageSrc: "/q11.png",
    },
    {
        title: "Navigating in your mind",
        description:
            "To play blindfold or visualize positions, practice moving pieces mentally. For example, imagine a pawn on d2 advancing to d4.",
        imageSrc: "/q11.png",
    },
];

const TheoryPage = () => {
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgressData.activeCourse}
                    hearts={userProgressData.hearts}
                    points={userProgressData.points}
                    hasActiveSubscription={false}
                />
                <Info />
            </StickyWrapper>

            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image src="/theory.svg" alt="Theory" height={90} width={90} />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Chess Theory
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6 max-w-xl">
                        Master the layout of the board and train your mind to visualize moves without even seeing the pieces.
                    </p>

                    <ul className="w-full flex flex-col gap-6">
                        {theory.map((item) => (
                            <li
                                key={item.title}
                                className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-6 items-center border rounded-xl p-6 bg-neutral-50 hover:bg-neutral-100 transition"
                            >
                                <div className="flex-shrink-0 w-full max-w-[200px]">
                                    <Image
                                        src={item.imageSrc}
                                        alt={item.title}
                                        width={200}
                                        height={200}
                                        className="w-full h-auto rounded-md shadow-sm"
                                        unoptimized
                                    />
                                </div>
                                <div className="flex flex-col gap-2 text-center md:text-left">
                                    <h2 className="text-xl font-semibold text-neutral-800">
                                        {item.title}
                                    </h2>
                                    <p className="text-neutral-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default TheoryPage;
