import { title, subtitle } from "@/components/primitives";

export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg justify-center text-center">
                <h1 className={title()}>Hello&nbsp;</h1>
                <h1 className={title({ color: "violet" })}>World&nbsp;</h1>
                <br />
                <h2 className={subtitle({ class: "mt-4" })}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt hic tenetur placeat, dicta
                    perspiciatis id tempore optio quasi? In accusamus placeat expedita, sunt nisi minus vitae optio
                    ipsum aliquam molestiae.
                </h2>
            </div>
        </section>
    );
}
