import { Link } from "lucide-react";
import { createRootRoute, Outlet } from "@tanstack/react-router";

import { H1, P, Separator } from "@synergy/ui";
import { cn } from "@synergy/utils";

import {
  Footer,
  FooterGroup,
  FooterItem,
  FooterLabel,
} from "~/components/layouts/footer";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Outlet />
        <Footer>
          <FooterGroup>
            <FooterLabel>Project</FooterLabel>
            <FooterItem>
              <a href="https://github.com/4y744/synergy">Github</a>
            </FooterItem>
            <FooterItem>
              <a href="https://github.com/4y744/synergy/blob/main/LICENSE">
                License
              </a>
            </FooterItem>
            <FooterItem>
              <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">
                GNU GPLv3
              </a>
            </FooterItem>
          </FooterGroup>
          <FooterGroup>
            <FooterLabel>Powered by</FooterLabel>
            <FooterItem>
              <a href="https://react.dev/">React</a>
            </FooterItem>
            <FooterItem>
              <a href="https://firebase.google.com/">Firebase</a>
            </FooterItem>
            <FooterItem>
              <a href="https://tailwindcss.com/">Tailwind</a>
            </FooterItem>
          </FooterGroup>
          <FooterGroup>
            <FooterLabel>Developed with</FooterLabel>
            <FooterItem>
              <a href="https://vite.dev/">Vite</a>
            </FooterItem>
            <FooterItem>
              <a href="https://pnpm.io/">pnpm</a>
            </FooterItem>
            <FooterItem>
              <a href="https://turbo.build/">Turborepo</a>
            </FooterItem>
          </FooterGroup>
        </Footer>
      </>
    );
  },
  notFoundComponent: () => {
    return (
      <div className="m-auto">
        <div className={cn("flex items-center gap-5")}>
          <H1>404</H1>
          <Separator orientation="vertical" />
          <P>Oops! This page doesn't seem to exist.</P>
        </div>
        <Link
          to="/"
          className={cn(
            "text-sm text-neutral-400 underline",
            "hover:text-neutral-300",
            "transition-text duration-200"
          )}
        >
          Go to home page
        </Link>
      </div>
    );
  },
});
