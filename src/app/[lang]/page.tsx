import { Avatar } from "@/components/avatar";
import { PageWrapper } from "@/components/page-wrapper";
import { TypingName } from "@/components/typing-name";

export default async function Home() {
    return (
        <PageWrapper className="flex flex-col-reverse items-center justify-center gap-4 py-8 md:flex-row md:justify-between md:py-10">
            <TypingName />
            <Avatar />
        </PageWrapper>
    );
}
