"use client";

import type React from "react";

import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { certificatesData } from "@/data/certificates";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useMobile } from "@/hooks/use-mobile";
import { SectionHeading } from "@/components/atoms/section-heading";
import { CertificateCard } from "@/components/molecules/certificate-card";

type CertificateCategory = keyof typeof certificatesData;
type Certificate = (typeof certificatesData)[CertificateCategory][number];

export function CertificatesSection() {
  const { t } = useLanguage();
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const { isMobile, isTouchDevice } = useMobile();
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isMobile) return;

    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);

    const container = e.currentTarget as HTMLDivElement;
    setScrollLeft(container.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isMobile || !isDragging) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - startX;

    const container = e.currentTarget as HTMLDivElement;
    container.scrollLeft = scrollLeft - x;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="certificates"
      className="min-h-screen py-16 scroll-mt-16 relative flex flex-col justify-center"
    >
      <SectionHeading
        title={t("certificates.title")}
        description={t("certificates.description")}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-grow"
      >
        <Tabs defaultValue="frontend" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="frontend">
              {t("certificates.tabs.frontend")}
            </TabsTrigger>
            <TabsTrigger value="backend">
              {t("certificates.tabs.backend")}
            </TabsTrigger>
            <TabsTrigger value="devops">
              {t("certificates.tabs.devops")}
            </TabsTrigger>
            <TabsTrigger value="other">
              {t("certificates.tabs.other")}
            </TabsTrigger>
          </TabsList>

          {(Object.keys(certificatesData) as CertificateCategory[]).map(
            (category) => (
              <TabsContent key={category} value={category}>
                <Card>
                  <CardContent className="p-6 overflow-hidden">
                    {isMobile ? (
                      <div
                        className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleTouchStart}
                        onMouseMove={handleTouchMove}
                        onMouseUp={handleTouchEnd}
                        onMouseLeave={handleTouchEnd}
                      >
                        {certificatesData[category].map((certificate) => (
                          <motion.div
                            key={certificate.id}
                            className="flex-shrink-0 w-[240px]"
                            whileTap={{
                              scale: 0.98,
                            }}
                            onClick={() => {
                              if (!isDragging) {
                                setSelectedCertificate(certificate);
                                if (navigator.vibrate && isTouchDevice) {
                                  navigator.vibrate(5);
                                }
                              }
                            }}
                          >
                            <CertificateCard
                              id={certificate.id}
                              title={
                                t(
                                  `certificates.items.${certificate.id}.title`
                                ) || certificate.title
                              }
                              issuer={
                                t(
                                  `certificates.items.${certificate.id}.issuer`
                                ) || certificate.issuer
                              }
                              date={certificate.date}
                              thumbnail={certificate.thumbnail}
                              onClick={() =>
                                setSelectedCertificate(certificate)
                              }
                            />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="carousel-container">
                        <div className="carousel">
                          {certificatesData[category].map((certificate) => (
                            <CertificateCard
                              key={`${certificate.id}-1`}
                              id={certificate.id}
                              title={
                                t(
                                  `certificates.items.${certificate.id}.title`
                                ) || certificate.title
                              }
                              issuer={
                                t(
                                  `certificates.items.${certificate.id}.issuer`
                                ) || certificate.issuer
                              }
                              date={certificate.date}
                              thumbnail={certificate.thumbnail}
                              onClick={() =>
                                setSelectedCertificate(certificate)
                              }
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )
          )}
        </Tabs>
      </motion.div>

      <Dialog
        open={selectedCertificate !== null}
        onOpenChange={(open) => !open && setSelectedCertificate(null)}
      >
        <DialogContent
          className="max-w-3xl"
          aria-describedby="certificate-details"
        >
          {selectedCertificate && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {t(`certificates.items.${selectedCertificate.id}.title`) ||
                    selectedCertificate.title}
                </DialogTitle>
                <DialogDescription id="certificate-details">
                  {t(`certificates.items.${selectedCertificate.id}.issuer`) ||
                    selectedCertificate.issuer}{" "}
                  • {selectedCertificate.date}
                </DialogDescription>
              </DialogHeader>
              <div className="relative h-[60vh] w-full">
                <Image
                  src={
                    selectedCertificate.image ||
                    "/placeholder.svg?height=600&width=800"
                  }
                  alt={
                    t(`certificates.items.${selectedCertificate.id}.title`) ||
                    selectedCertificate.title
                  }
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex justify-end items-center">
                {selectedCertificate.url && (
                  <Button asChild>
                    <a
                      href={selectedCertificate.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      {t("certificates.verify")}
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
