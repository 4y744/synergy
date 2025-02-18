import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Badge, H1, P, Separator } from "@synergy/ui";
import { cn } from "@synergy/utils";
import {
  Footer,
  FooterGroup,
  FooterItem,
  FooterLabel,
} from "~/components/layouts/footer";
import { ContentLayout } from "~/components/layouts/content-layout";

export const Route = createFileRoute("/")({
  component: () => {
    return (
      <>
        <ContentLayout isCentered>
          <div className="flex items-end gap-2">
            <h1 className="text-4xl font-arcade">synergy</h1>
            <Badge className="h-fit mb-1">v1.0</Badge>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              disabled
            >
              Download
            </Button>
            <Button
              variant="secondary"
              asChild
            >
              <Link to="/groups">Open in browser</Link>
            </Button>
          </div>
        </ContentLayout>
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
