"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { navigationItems } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const navigationSections = navigationItems.map((item) => ({
  href: item.href,
  id: item.href.split("#")[1],
}));

function getInitialActiveHref(pathname: string) {
  if (pathname.startsWith("/projetos")) {
    return "/#projetos";
  }

  return pathname === "/" ? "/#inicio" : "";
}

export function Header() {
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState(() =>
    getInitialActiveHref(pathname),
  );
  const navigationTargetRef = useRef<string | null>(null);

  function handleNavigation(href: string) {
    setActiveHref(href);
    navigationTargetRef.current = href;

    if (pathname === "/" && href === "/#inicio") {
      window.scrollTo({ behavior: "smooth", top: 0 });
    }
  }

  useEffect(() => {
    if (pathname !== "/") {
      navigationTargetRef.current = null;
      setActiveHref(pathname.startsWith("/projetos") ? "/#projetos" : "");
      return;
    }

    let frameId = 0;
    let scrollEndTimer = 0;

    const hashHref = navigationSections.find(
      ({ href }) => href === `/${window.location.hash}`,
    )?.href;

    if (!navigationTargetRef.current && hashHref) {
      navigationTargetRef.current = hashHref;
      setActiveHref(hashHref);
    }

    function updateActiveSection() {
      const sections = navigationSections
        .map(({ href, id }) => ({
          element: document.querySelector<HTMLElement>(`section#${id}`),
          href,
        }))
        .filter(
          (section): section is { element: HTMLElement; href: string } =>
            section.element !== null,
        );

      if (sections.length === 0) {
        return;
      }

      const marker = window.innerHeight * 0.35;
      let currentHref = sections[0].href;

      for (const section of sections) {
        if (section.element.getBoundingClientRect().top <= marker) {
          currentHref = section.href;
        } else {
          break;
        }
      }

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        currentHref = sections.at(-1)?.href ?? currentHref;
      }

      setActiveHref((current) =>
        current === currentHref ? current : currentHref,
      );
    }

    function requestUpdate() {
      cancelAnimationFrame(frameId);

      if (navigationTargetRef.current) {
        window.clearTimeout(scrollEndTimer);
        scrollEndTimer = window.setTimeout(() => {
          navigationTargetRef.current = null;
          updateActiveSection();
        }, 160);
        return;
      }

      frameId = requestAnimationFrame(updateActiveSection);
    }

    function resumeScrollTracking() {
      if (!navigationTargetRef.current) {
        return;
      }

      navigationTargetRef.current = null;
      window.clearTimeout(scrollEndTimer);
      requestUpdate();
    }

    function handleNavigationKey(event: KeyboardEvent) {
      if (
        [
          "ArrowDown",
          "ArrowUp",
          "End",
          "Home",
          "PageDown",
          "PageUp",
          " ",
        ].includes(event.key)
      ) {
        resumeScrollTracking();
      }
    }

    if (!navigationTargetRef.current) {
      updateActiveSection();
    }
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("touchstart", resumeScrollTracking, {
      passive: true,
    });
    window.addEventListener("wheel", resumeScrollTracking, { passive: true });
    window.addEventListener("keydown", handleNavigationKey);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(scrollEndTimer);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("touchstart", resumeScrollTracking);
      window.removeEventListener("wheel", resumeScrollTracking);
      window.removeEventListener("keydown", handleNavigationKey);
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl">
      <Container className="relative flex min-h-16 items-center justify-between gap-5">
        <Link
          className="brand-logo-link inline-flex shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          href="/#inicio"
          onClick={() => handleNavigation("/#inicio")}
        >
          <Image
            alt={siteConfig.name}
            className="brand-logo-image-dark h-9 w-auto sm:h-10"
            height={64}
            priority
            src={siteConfig.logo}
            width={303}
          />
          <Image
            alt={siteConfig.name}
            className="brand-logo-image-light h-9 w-auto sm:h-10"
            height={119}
            priority
            src={siteConfig.lightLogo}
            width={560}
          />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 xl:flex"
        >
          {navigationItems.map((item) => (
            <Link
              aria-current={activeHref === item.href ? "location" : undefined}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-[color,transform] duration-200 ease-out after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:origin-right after:scale-x-0 after:rounded-full after:bg-accent after:shadow-[var(--shadow-nav-accent)] after:transition-transform after:duration-300 after:ease-out hover:text-text-primary hover:[transform:translateY(-1px)] hover:after:origin-left hover:after:scale-x-100 focus-visible:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent focus-visible:after:origin-left focus-visible:after:scale-x-100 motion-reduce:transform-none motion-reduce:after:transition-none",
                activeHref === item.href &&
                  "text-text-primary after:origin-left after:scale-x-100",
              )}
              href={item.href}
              key={item.href}
              onClick={() => handleNavigation(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <div className="hidden xl:block">
            <Button
              href="/#contato"
              onClick={() => handleNavigation("/#contato")}
              size="sm"
            >
              Solicitar orçamento
            </Button>
          </div>

          <MobileMenu
            activeHref={activeHref}
            navigation={navigationItems}
            onNavigate={handleNavigation}
          />
        </div>
      </Container>
    </header>
  );
}
