"use client";

import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MessageSquare } from "lucide-react";

export function Contact() {
    const { t } = useLanguage();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast({
            title: t("contact.success.title"),
            description: t("contact.success.description"),
        });

        setIsSubmitting(false);
        e.target.reset();
    };

    return (
        <section
            id="contact"
            className="min-h-screen py-16 scroll-mt-16 relative flex flex-col justify-center"
        >
            <div className="text-center mb-12">
                <motion.h2
                    className="text-3xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {t("contact.title")}
                </motion.h2>
                <motion.p
                    className="text-muted-foreground max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {t("contact.description")}
                </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("contact.form.title")}</CardTitle>
                            <CardDescription>
                                {t("contact.form.description")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="name"
                                            className="text-sm font-medium"
                                        >
                                            {t("contact.form.name")}
                                        </label>
                                        <Input id="name" name="name" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="email"
                                            className="text-sm font-medium"
                                        >
                                            {t("contact.form.email")}
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="subject"
                                        className="text-sm font-medium"
                                    >
                                        {t("contact.form.subject")}
                                    </label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="message"
                                        className="text-sm font-medium"
                                    >
                                        {t("contact.form.message")}
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? t("contact.form.sending")
                                        : t("contact.form.send")}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("contact.connect.title")}</CardTitle>
                            <CardDescription>
                                {t("contact.connect.description")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium">
                                        {t("contact.connect.email")}
                                    </h3>
                                    <a
                                        href="mailto:contact@example.com"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        contact@example.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <Github className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium">
                                        {t("contact.connect.github")}
                                    </h3>
                                    <a
                                        href="https://github.com/yourusername"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        github.com/yourusername
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <Linkedin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium">
                                        {t("contact.connect.linkedin")}
                                    </h3>
                                    <a
                                        href="https://linkedin.com/in/yourusername"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        linkedin.com/in/yourusername
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <MessageSquare className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium">
                                        {t("contact.connect.whatsapp")}
                                    </h3>
                                    <a
                                        href="https://wa.me/1234567890"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        +12 (34) 5678-9000
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}
