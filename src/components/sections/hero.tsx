import { Avatar } from "@/components/avatar";
import { TypingName } from "@/components/typing-name";

export const Hero = () => {
    return (
        <section
            id="home"
            className="h-screenHeightWithoutHeader flex flex-col-reverse items-center justify-center gap-4 py-8 md:flex-row md:justify-between md:py-10"
        >
            <TypingName />
            <Avatar />
        </section>
    );
};
