import { LocaleSwitcher } from "@/components/locale-switcher";
import { title, subtitle } from "@/components/primitives";
import type { Locale } from "@/types";
import { getDictionary } from "@/utils/get-dictionary";

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
    const t = await getDictionary(lang);

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg justify-center text-center">
                <h1 className={title()}>{t.test.hello}&nbsp;</h1>
                <h1 className={title({ color: "violet" })}>{t.test.world}&nbsp;</h1>
                <br />
                <h2 className={subtitle({ class: "mt-4" })}>
                    <LocaleSwitcher />
                </h2>
            </div>
        </section>
    );
}
