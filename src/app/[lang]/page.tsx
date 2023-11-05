import { PageWrapper } from "@/components/page-wrapper";
import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";
import { Locale } from "@/types";
import { getDictionary } from "@/utils/get-dictionary";

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
    const t = await getDictionary(lang);

    return (
        <PageWrapper>
            <Hero />
            <About t={t} />
        </PageWrapper>
    );
}
