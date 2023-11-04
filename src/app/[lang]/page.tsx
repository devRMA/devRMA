import { TypingName } from "@/components/typing-name";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";

export default async function Home() {
    return (
        <section className="flex h-full flex-col items-center justify-between gap-4 md:flex-row">
            <div className="min-h-[168px]">
                <TypingName />
            </div>
            <div>
                <Image as={NextImage} width={400} height={400} src="/avatar.png" alt="My profile picture" />
            </div>
        </section>
    );
}
