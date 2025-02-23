import { Footer, FooterGroup, FooterItem, FooterLabel } from "@synergy/ui";
import { useTranslation } from "react-i18next";

export const SiteFooter = () => {
  const { t } = useTranslation();

  return (
    <Footer>
      <FooterGroup>
        <FooterLabel>{t("web.footer.project")}</FooterLabel>
        <FooterItem>
          <a href="https://github.com/4y744/synergy">Github</a>
        </FooterItem>
        <FooterItem>
          <a href="https://github.com/4y744/synergy/blob/main/LICENSE">
            {t("web.footer.license")}
          </a>
        </FooterItem>
        <FooterItem>
          <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPLv3</a>
        </FooterItem>
      </FooterGroup>
      <FooterGroup>
        <FooterLabel>{t("web.footer.powered_by")}</FooterLabel>
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
        <FooterLabel>{t("web.footer.developed_with")}</FooterLabel>
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
  );
};
