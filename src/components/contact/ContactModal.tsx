"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "./ContactForm";

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="lg" type="button">
        Enviar e-mail
      </Button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
          <button
            aria-label="Fechar formulario"
            className="absolute inset-0 h-full w-full bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            type="button"
          />

          <div
            aria-describedby={descriptionId}
            aria-labelledby={titleId}
            aria-modal="true"
            className="relative max-h-[calc(100vh-3rem)] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-surface-elevated p-6 shadow-[0_24px_80px_rgba(0,0,0,0.34)] sm:p-8"
            role="dialog"
          >
            <div className="mb-6 flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  Contato
                </p>
                <h2
                  className="mt-3 text-2xl font-semibold text-text-primary sm:text-3xl"
                  id={titleId}
                >
                  Enviar mensagem
                </h2>
                <p
                  className="mt-3 max-w-xl leading-7 text-text-secondary"
                  id={descriptionId}
                >
                  Conte brevemente sobre o projeto, objetivo e prazo desejado.
                </p>
              </div>

              <button
                aria-label="Fechar formulario"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-text-secondary transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                onClick={() => setIsOpen(false)}
                ref={closeButtonRef}
                type="button"
              >
                X
              </button>
            </div>

            <ContactForm />
          </div>
        </div>
      ) : null}
    </>
  );
}
