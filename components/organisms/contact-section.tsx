"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { SectionHeading } from "@/components/atoms/section-heading";
import { useLanguage } from "@/components/language-provider";
import { ContactMethod } from "@/components/molecules/contact-method";
import { InteractiveTerminal } from "@/components/molecules/interactive-terminal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-16 py-20 md:py-28">
      <SectionHeading
        id="contact-heading"
        title={t("contact.title")}
        description={t("contact.description")}
      />

      <div className="grid gap-8 lg:grid-cols-2 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Card className="border-border/80 bg-card/70 backdrop-blur-xl shadow-lg">
            <CardHeader>
              <CardTitle>{t("contact.connect.title")}</CardTitle>
              <CardDescription>{t("contact.connect.description")}</CardDescription>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full"
        >
          <InteractiveTerminal />
        </motion.div>
      </div>
    </section>
  );
}
