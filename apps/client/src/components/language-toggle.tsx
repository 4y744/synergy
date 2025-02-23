import { useState } from "react";
import i18n from "i18next";
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
  const [language, setLanguage] = useState(i18n.language);

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
          value={language}
          onValueChange={(value) => {
            i18n.changeLanguage(value);
            setLanguage(value);
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
