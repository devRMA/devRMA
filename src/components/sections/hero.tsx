import { Avatar } from "@/components/avatar";
import { TypingName } from "@/components/typing-name";

export const Hero = () => {
    return (
        <section
            id="home"
            className="flex h-screen flex-col-reverse items-center justify-center gap-4 md:flex-row md:justify-between"
        >
            <TypingName />
            <Avatar />
        </section>
    );
};
