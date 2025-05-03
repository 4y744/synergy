import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@synergy/ui";

import { useCall } from "../api/get-calls";
import { useDeleteCall } from "../api/delete-call";

type DeleteCallDialogProps = Readonly<{
  children: ReactNode;
  groupId: string;
  callId: string;
}>;

export const DeleteCallDialog = ({
  children,
  groupId,
  callId,
}: DeleteCallDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const { data: call } = useCall(groupId, callId);
  const { mutateAsync: deleteCall, isPending } = useDeleteCall(groupId, callId);

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("client.feature.call.delete")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("client.feature.call.delete_desc", { name: call?.name })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("client.action.cancel")}</AlertDialogCancel>
          <Button
            onClick={() => {
              deleteCall().then(() => setIsOpen(false));
            }}
            disabled={isPending}
            variant="destructive"
          >
            {isPending ? (
              <>
                <Loader2Icon className="animate-spin" />
                {t("client.action.delete")}
              </>
            ) : (
              t("client.action.deleting")
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
DeleteCallDialog.displayName = "DeleteCallDialog";
