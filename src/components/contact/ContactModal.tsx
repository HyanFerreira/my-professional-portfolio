"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ContactForm } from "./ContactForm";

const MODAL_ANIMATION_DURATION_MS = 220;

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  const openModal = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsClosing(false);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsClosing((currentIsClosing) => {
      if (currentIsClosing || closeTimeoutRef.current) {
        return currentIsClosing;
      }

      closeTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
        closeTimeoutRef.current = null;
      }, MODAL_ANIMATION_DURATION_MS);

      return true;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, isOpen]);

  return (
    <>
      <Button onClick={openModal} size="lg" type="button">
        Enviar e-mail
      </Button>

      {isOpen
        ? createPortal(
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
              <button
                aria-label="Fechar formulario"
                className={cn(
                  "contact-modal-backdrop absolute inset-0 h-full w-full cursor-pointer backdrop-blur-sm",
                  isClosing && "is-closing",
                )}
                onClick={closeModal}
                type="button"
              />

              <div
                aria-describedby={descriptionId}
                aria-labelledby={titleId}
                aria-modal="true"
                className={cn(
                  "contact-modal-panel relative max-h-[calc(100vh-3rem)] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-surface-elevated p-6 shadow-[var(--shadow-modal)] sm:p-8",
                  isClosing && "is-closing",
                )}
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
                      Conte brevemente sobre o projeto, objetivo e prazo
                      desejado.
                    </p>
                  </div>

                  <button
                    aria-label="Fechar formulario"
                    className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border bg-surface text-text-secondary transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    onClick={closeModal}
                    ref={closeButtonRef}
                    type="button"
                  >
                    X
                  </button>
                </div>

                <ContactForm onCancel={closeModal} />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
