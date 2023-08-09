import React from "react"
import Link from "next/link"
import { siteConfig } from "@/config"
import { Icons } from "@/constants/icons"

import { cn } from "@/lib/utils"
import { Container } from "@/components/custom"
import { SubscribeToNewsletterForm } from "@/components/email"

import { buttonVariants } from "../ui/button"
import ThemeToggler from "./ThemeToggler"

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <Container as="div">
        <section
          id="footer-content"
          aria-labelledby="footer-content-heading"
          className="flex flex-col gap-10 lg:flex-row lg:gap-20"
        >
          <section
            id="footer-branding"
            aria-labelledby="footer-branding-heading"
          >
            <Link
              aria-label="Home"
              href="/"
              className="flex items-center space-x-2"
            >
              <Icons.logo className="h-6 w-6" aria-hidden="true" />
              <span className="font-bold">{siteConfig.name}</span>
            </Link>
          </section>
          <section
            id="footer-links"
            aria-labelledby="footer-links-heading"
            className="grid flex-1 grid-cols-1 gap-10 xs:grid-cols-2 sm:grid-cols-4"
          >
            {siteConfig.footerNav.map((item) => (
              <div key={item.title} className="space-y-3">
                <h4 className="text-base font-medium">{item.title}</h4>
                <ul className="space-y-3">
                  {item.items.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        target={link?.external ? "_blank" : undefined}
                        rel={link?.external ? "noreferrer" : undefined}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.title}
                        <span className="sr-only">{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section
            id="newsletter"
            aria-labelledby="newsletter-heading"
            className="space-y-3"
          >
            <h4 className="text-base font-medium">
              Subscribe to our newsletter
            </h4>
            <SubscribeToNewsletterForm />
          </section>
        </section>
        <section
          id="footer-bottom"
          aria-labelledby="footer-bottom-heading"
          className="flex items-center space-x-4"
        >
          <div className="flex-1 text-left text-sm leading-loose text-muted-foreground">
            Built by{" "}
            <a
              aria-label="StillImmortal github account"
              href="https://github/StillImmortal"
              target="_blank"
              rel="noreferrer"
              className="font-semibold transition-colors hover:text-foreground"
            >
              Stillimmortal
            </a>
            .
          </div>
          <div className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })
                )}
              >
                <Icons.gitHub className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggler />
          </div>
        </section>
      </Container>
    </footer>
  )
}

export default Footer
