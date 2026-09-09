"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "@/components/atoms/section-heading";
import { useLanguage } from "@/components/language-provider";
import { CertificateCard } from "@/components/molecules/certificate-card";
import { Marquee } from "@/components/molecules/marquee";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { certificatesData } from "@/data/certificates";

type CertificateCategory = keyof typeof certificatesData;
type Certificate = (typeof certificatesData)[CertificateCategory][number];

export function CertificatesSection() {
  const { t: translate } = useLanguage();
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-heading"
      className="scroll-mt-16 py-20 md:py-28"
    >
      <SectionHeading
        id="certificates-heading"
        title={translate("certificates.title")}
        description={translate("certificates.description")}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
      >
        <Tabs defaultValue="frontend" className="w-full">
          <TabsList className="mb-8 flex w-full flex-wrap">
            {(Object.keys(certificatesData) as CertificateCategory[]).map((category) => (
              <TabsTrigger key={category} value={category} className="flex-1">
                {translate(`certificates.tabs.${category}`)}
              </TabsTrigger>
            ))}
          </TabsList>

          {(Object.keys(certificatesData) as CertificateCategory[]).map((category) => (
            <TabsContent key={category} value={category}>
              <Card>
                <CardContent className="p-6 overflow-hidden">
                  <Marquee>
                    {certificatesData[category].map((certificate) => (
                      <CertificateCard
                        key={certificate.id}
                        id={certificate.id}
                        title={translate(`certificates.items.${certificate.id}.title`)}
                        issuer={translate(`certificates.items.${certificate.id}.issuer`)}
                        date={certificate.date}
                        thumbnail={certificate.thumbnail}
                        onClick={() => setSelectedCertificate(certificate)}
                      />
                    ))}
                  </Marquee>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      <Dialog
        open={selectedCertificate !== null}
        onOpenChange={(open) => !open && setSelectedCertificate(null)}
      >
        <DialogContent className="max-w-3xl">
          {selectedCertificate && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {translate(`certificates.items.${selectedCertificate.id}.title`)}
                </DialogTitle>
                <DialogDescription>
                  {translate(`certificates.items.${selectedCertificate.id}.issuer`)} •{" "}
                  {selectedCertificate.date}
                </DialogDescription>
              </DialogHeader>
              <div className="relative h-[60vh] w-full">
                <Image
                  src={selectedCertificate.image || "/placeholder.svg?height=600&width=800"}
                  alt={translate(`certificates.items.${selectedCertificate.id}.title`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-contain"
                />
              </div>
              <div className="flex justify-end items-center">
                {selectedCertificate.url && (
                  <Button asChild>
                    <a href={selectedCertificate.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                      {translate("certificates.verify")}
                    </a>
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
