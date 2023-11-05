"use client";

import { Button, Card, CardBody, Image, Link, Tooltip } from "@nextui-org/react";
import clsx from "clsx";
import dayjs from "dayjs";
import { motion } from "framer-motion";

import { GithubIcon, LinkedInIcon } from "@/components/icons";
import { subtitle } from "@/components/primitives";

export const About = ({ t }: { t: any }) => {
    const infos = {
        birthday: "2003-09-03 12:00:00",
        firstJob: "2021-06-14 12:00:00",
    };
    const now = dayjs();
    const age = now.diff(infos.birthday, "year");
    const birthdayFormatted = new Date(infos.birthday).toLocaleDateString();
    const experience = now.diff(infos.firstJob, "year");
    const firstJobFormatted = new Date(infos.firstJob).toLocaleDateString();

    return (
        <section id="about" className="flex min-h-screen flex-wrap items-center justify-center gap-6">
            <Card
                isBlurred
                className="max-w-[38rem] rounded-2xl rounded-tl-none border-none bg-background/60 dark:bg-default-100/50"
                shadow="sm"
            >
                <CardBody>
                    <div className="grid grid-cols-6 items-center justify-center gap-6 md:grid-cols-12 md:gap-4">
                        <div className="relative z-50 col-span-6 md:col-span-4">
                            <Image
                                alt="Photo"
                                as={motion.img}
                                className="rounded-2xl rounded-tl-none object-cover"
                                height={200}
                                shadow="md"
                                src="/photo.png"
                                width="100%"
                                whileHover={{ scale: 1.115 }}
                            />
                        </div>

                        <div className="col-span-6 flex flex-col md:col-span-8">
                            <div className="flex items-start justify-between">
                                <div className="flex flex-col gap-0">
                                    <h2 className="mt-2 text-2xl font-medium">Rafael Martins Alves</h2>
                                    <h3 className="mt-2 text-2xl">
                                        {t.about.card.developer}
                                        <Tooltip content={firstJobFormatted}>
                                            <span>{experience}</span>
                                        </Tooltip>{" "}
                                        {t.about.card.years_ago}
                                    </h3>
                                    <h3 className="mt-2 text-2xl">
                                        <Tooltip content={birthdayFormatted}>
                                            <span>{age}</span>
                                        </Tooltip>{" "}
                                        {t.about.card.years_old}
                                    </h3>
                                    <h3 className="mt-2 text-2xl">Curitiba, PR, 🇧🇷</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <div className="w-[40rem]">
                <p className={clsx("text-justify", subtitle())}>{t.about.about_text}</p>
            </div>
            <div className="flex w-[40rem] flex-col items-center gap-5">
                <h4 className="text-xl">{t.about.find}</h4>
                <div className="flex gap-3">
                    <Button
                        as={Link}
                        isIconOnly
                        aria-label="GitHub"
                        size="lg"
                        variant="shadow"
                        href="https://github.com/devRMA"
                        target="_blank"
                    >
                        <GithubIcon />
                    </Button>
                    <Button
                        as={Link}
                        isIconOnly
                        aria-label="LinkedIn"
                        size="lg"
                        variant="shadow"
                        href="https://linkedin.com/in/devRMA"
                        target="_blank"
                    >
                        <LinkedInIcon />
                    </Button>
                </div>
            </div>
        </section>
    );
};
