"use client";

import { useLanguage } from "@/components/language-provider";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { SectionHeading } from "@/components/atoms/section-heading";
import { ContactMethod } from "@/components/molecules/contact-method";

export function ContactSection() {
    const { t } = useLanguage();

    return (
        <section
            id="contact"
            className="min-h-screen py-16 scroll-mt-16 relative flex flex-col justify-center"
        >
            <SectionHeading
                title={t("contact.title")}
                description={t("contact.description")}
            />

            <div className="flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-2xl"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("contact.connect.title")}</CardTitle>
                            <CardDescription>
                                {t("contact.connect.description")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <ContactMethod
                                icon={Mail}
                                title={t("contact.connect.email")}
                                value="contact@devrma.com"
                                href="mailto:contact@devrma.com"
                            />

                            <ContactMethod
                                icon={Github}
                                title={t("contact.connect.github")}
                                value="github.com/devRMA"
                                href="https://github.com/devRMA"
                            />

                            <ContactMethod
                                icon={Linkedin}
                                title={t("contact.connect.linkedin")}
                                value="linkedin.com/in/devRMA"
                                href="https://linkedin.com/in/devRMA"
                            />
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}
