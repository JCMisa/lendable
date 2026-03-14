import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const FOOTER_LINKS = {
  Product: ["Features", "Pricing", "Dashboard", "AI Advisor"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
} as const;

export const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <span className="text-xs font-black text-primary-foreground">
                  L
                </span>
              </div>
              Lendable
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Data-backed debt management for the modern lender.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Lendable. All rights reserved.</p>
          <p>Built with 💖 by JCMisa</p>
        </div>
      </div>
    </footer>
  );
};
