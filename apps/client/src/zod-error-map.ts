import { t } from "i18next";
import { z } from "zod";

z.setErrorMap((issue) => {
  switch (issue.code) {
    case "too_small":
      if (issue.minimum == 1)
        return {
          message: t("client.form.errors.required"),
        };

      return {
        message: t("client.form.errors.too_short", {
          min_lenght: issue.minimum,
        }),
      };
    case "too_big":
      return {
        message: t("client.form.errors.too_long", {
          max_lenght: issue.maximum,
        }),
      };
    case "invalid_string":
      if (issue.validation == "email")
        return {
          message: t("client.form.errors.invalid_email"),
        };
  }

  return {
    message: t("client.form.errors.generic"),
  };
});
