"use client";

import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ProjectImage } from "@/types/project";

const KEYBOARD_NAVIGATION_INTERVAL_MS = 300;

type ProjectGalleryProps = {
  images: ProjectImage[];
  projectTitle: string;
};

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastKeyboardNavigationAtRef = useRef(Number.NEGATIVE_INFINITY);
  const activeImage = images[activeIndex];
  const hasMultipleImages = images.length > 1;

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % images.length);
  }

  const handleKeyboardNavigation = useCallback(
    (key: string) => {
      if ((key !== "ArrowLeft" && key !== "ArrowRight") || !hasMultipleImages) {
        return false;
      }

      const now = performance.now();

      if (
        now - lastKeyboardNavigationAtRef.current <
        KEYBOARD_NAVIGATION_INTERVAL_MS
      ) {
        return true;
      }

      lastKeyboardNavigationAtRef.current = now;

      if (key === "ArrowLeft") {
        setActiveIndex(
          (current) => (current - 1 + images.length) % images.length,
        );
      } else {
        setActiveIndex((current) => (current + 1) % images.length);
      }

      return true;
    },
    [hasMultipleImages, images.length],
  );

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const previouslyFocusedElement =
      document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lastKeyboardNavigationAtRef.current = Number.NEGATIVE_INFINITY;
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }

      if (handleKeyboardNavigation(event.key)) {
        event.preventDefault();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [handleKeyboardNavigation, isLightboxOpen]);

  if (!activeImage) {
    return null;
  }

  const lightbox = isLightboxOpen
    ? createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8">
          <button
            aria-label="Fechar imagem ampliada"
            className="absolute inset-0 cursor-default"
            onClick={() => setIsLightboxOpen(false)}
            type="button"
          />
          <div
            aria-label={`Galeria ampliada do projeto ${projectTitle}`}
            aria-modal="true"
            className="relative flex h-full max-h-[min(90vh,60rem)] w-full max-w-7xl flex-col"
            role="dialog"
          >
            <div className="flex items-center justify-between gap-4 pb-3 text-white">
              <p aria-live="polite" className="text-sm sm:text-base">
                {activeImage.caption}
              </p>
              <button
                aria-label="Fechar imagem ampliada"
                className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/40 transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                onClick={() => setIsLightboxOpen(false)}
                ref={closeButtonRef}
                type="button"
              >
                <X aria-hidden="true" size={20} />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg border border-white/15 bg-black/40">
              <Image
                alt={activeImage.alt}
                className="object-contain"
                fill
                sizes="100vw"
                src={activeImage.src}
              />

              {hasMultipleImages ? (
                <>
                  <GalleryArrow direction="previous" onClick={showPrevious} />
                  <GalleryArrow direction="next" onClick={showNext} />
                </>
              ) : null}
            </div>

            {hasMultipleImages ? (
              <fieldset className="flex justify-center gap-2 border-0 p-0 pt-4">
                <legend className="sr-only">Selecionar imagem</legend>
                {images.map((image, index) => (
                  <GalleryIndicator
                    active={index === activeIndex}
                    index={index}
                    key={image.src}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </fieldset>
            ) : null}
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <fieldset
        className="min-w-0 border-0 p-0"
        onKeyDown={(event) => {
          if (handleKeyboardNavigation(event.key)) {
            event.preventDefault();
          }
        }}
      >
        <legend className="sr-only">
          Galeria do projeto {projectTitle}. Use as setas esquerda e direita
          para navegar.
        </legend>
        <div className="relative aspect-[1920/945] overflow-hidden rounded-t-lg border-b border-border bg-[linear-gradient(135deg,#071426_0%,#101B2D_48%,#06323F_100%)]">
          <button
            aria-label={`Ampliar: ${activeImage.alt}`}
            className="absolute inset-0 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
            onClick={() => setIsLightboxOpen(true)}
            type="button"
          >
            <Image
              alt={activeImage.alt}
              className="object-cover"
              fill
              priority={activeIndex === 0}
              sizes="(min-width: 1024px) 42vw, 100vw"
              src={activeImage.src}
            />
          </button>

          <button
            aria-label={`Ampliar: ${activeImage.alt}`}
            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-sm transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            onClick={() => setIsLightboxOpen(true)}
            type="button"
          >
            <Maximize2 aria-hidden="true" size={16} />
          </button>

          {hasMultipleImages ? (
            <>
              <GalleryArrow direction="previous" onClick={showPrevious} />
              <GalleryArrow direction="next" onClick={showNext} />
            </>
          ) : null}
        </div>

        <div className="flex min-h-14 items-center justify-between gap-4 border-b border-border bg-surface px-4 py-3">
          <p aria-live="polite" className="text-sm text-text-secondary">
            {activeImage.caption}
          </p>

          {hasMultipleImages ? (
            <fieldset className="flex shrink-0 gap-2 border-0 p-0">
              <legend className="sr-only">Selecionar imagem</legend>
              {images.map((image, index) => (
                <GalleryIndicator
                  active={index === activeIndex}
                  index={index}
                  key={image.src}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </fieldset>
          ) : null}
        </div>
      </fieldset>

      {lightbox}
    </>
  );
}

type GalleryArrowProps = {
  direction: "previous" | "next";
  onClick: () => void;
};

function GalleryArrow({ direction, onClick }: GalleryArrowProps) {
  const isPrevious = direction === "previous";

  return (
    <button
      aria-label={isPrevious ? "Imagem anterior" : "Próxima imagem"}
      className={`absolute top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-sm transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        isPrevious ? "left-3" : "right-3"
      }`}
      onClick={onClick}
      type="button"
    >
      {isPrevious ? (
        <ChevronLeft aria-hidden="true" size={20} />
      ) : (
        <ChevronRight aria-hidden="true" size={20} />
      )}
    </button>
  );
}

type GalleryIndicatorProps = {
  active: boolean;
  index: number;
  onClick: () => void;
};

function GalleryIndicator({ active, index, onClick }: GalleryIndicatorProps) {
  return (
    <button
      aria-current={active ? "true" : undefined}
      aria-label={`Mostrar imagem ${index + 1}`}
      className={`h-2.5 cursor-pointer rounded-full transition-[width,background-color] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        active
          ? "w-7 bg-accent"
          : "w-2.5 bg-text-secondary/45 hover:bg-accent/70"
      }`}
      onClick={onClick}
      type="button"
    />
  );
}
