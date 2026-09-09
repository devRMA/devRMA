"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/atoms/brand-icons";
import { SectionHeading } from "@/components/atoms/section-heading";
import { useLanguage } from "@/components/language-provider";
import { ContactMethod } from "@/components/molecules/contact-method";
import { InteractiveTerminal } from "@/components/molecules/interactive-terminal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactSection() {
  const { t: translate } = useLanguage();

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-16 py-20 md:py-28">
      <SectionHeading
        id="contact-heading"
        title={translate("contact.title")}
        description={translate("contact.description")}
      />

      <div className="grid gap-6 lg:grid-cols-2 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="w-full h-full"
        >
          <div className="rounded-3xl border border-border/80 bg-card/30 p-2 shadow-2xl backdrop-blur-xl h-full flex flex-col">
            <Card className="rounded-[1.5rem] border border-border/60 bg-card/80 backdrop-blur-xl shadow-lg h-full flex flex-col justify-between">
              <div>
                <CardHeader className="p-6 md:p-8">
                  <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                    {translate("contact.connect.title")}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-1">
                    {translate("contact.connect.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0 md:p-8 md:pt-0 space-y-4">
                  <ContactMethod
                    icon={Mail}
                    title={translate("contact.connect.email")}
                    value="contact@devrma.com"
                    href="mailto:contact@devrma.com"
                  />

                  <ContactMethod
                    icon={GithubIcon}
                    title={translate("contact.connect.github")}
                    value="github.com/devRMA"
                    href="https://github.com/devRMA"
                  />

                  <ContactMethod
                    icon={LinkedinIcon}
                    title={translate("contact.connect.linkedin")}
                    value="linkedin.com/in/devRMA"
                    href="https://linkedin.com/in/devRMA"
                  />
                </CardContent>
              </div>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="w-full h-full"
        >
          <div className="rounded-3xl border border-border/80 bg-card/30 p-2 shadow-2xl backdrop-blur-xl h-full">
            <InteractiveTerminal />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
