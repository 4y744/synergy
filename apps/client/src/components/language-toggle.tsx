import { useTranslation } from "react-i18next";
import { GlobeIcon } from "lucide-react";

import { LANGUAGES } from "@synergy/i18n";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@synergy/ui";

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className="fixed bottom-4 right-4"
        onFocus={(event) => event.target.blur()}
        asChild
      >
        <Button
          className="h-10 w-10"
          variant="ghost"
        >
          <GlobeIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={i18n.language}
          onValueChange={(value) => {
            i18n.changeLanguage(value);
          }}
        >
          {LANGUAGES.map(({ name, id }) => (
            <DropdownMenuRadioItem
              value={id}
              key={id}
            >
              {name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
LanguageToggle.displayName = "LanguageToggle";
