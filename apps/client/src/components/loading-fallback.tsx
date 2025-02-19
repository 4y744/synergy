import { Loader2Icon } from "lucide-react";

import { ContentLayout } from "./layouts/content-layout";

export const LoadingFallback = () => {
  return (
    <ContentLayout isCentered>
      <Loader2Icon
        className="animate-spin"
        size={48}
      />
    </ContentLayout>
  );
};
