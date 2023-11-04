import { TypingName } from "@/components/typing-name";
import { Avatar } from "@/components/avatar";

export default async function Home() {
    return (
        <section className="flex h-full flex-col items-center gap-4 md:flex-row md:justify-between">
            <TypingName />
            <Avatar />
        </section>
    );
}
