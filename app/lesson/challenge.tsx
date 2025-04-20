import { cn } from "@/lib/utils";
import { Card } from "./card";

type Props = {
    options: any[];
    onSelect: (id: number) => void;
    status: "correct" | "wrong" | "none";
    selectedOption?: number;
    disabled?: boolean;
    type: any;
};

export const Challenge = ({ options, onSelect, status, selectedOption, disabled, type }: Props) => {
    return (
        <div className="grid gap-2 grid-cols-1">
            {options.map((option, i) => (
                <Card
                    key={option.id}
                    id={option.id}
                    text={option.text}
                    imageSrc={option.imageSrc}
                    shortcut={`${i + 1}`}
                    selected={selectedOption === option.id}
                    onClick={() => onSelect(option.id)}
                    status={status}
                    audioSrc={option.audioSrc}
                    disabled={disabled}
                    type={type}
                />
            ))}
        </div>
    );
};