import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@synergy/ui";
import { UserXIcon } from "lucide-react";

const mockUsers = [
  {
    name: "Ivan",
    joined: new Date(7843794),
  },
  {
    name: "Kiril",
    joined: new Date(5347843794),
  },
  {
    name: "David",
    joined: new Date(5437843794),
  },
];

type MembersListProps = Readonly<{
  groupId: string;
}>;

export const MembersList = ({ groupId }: MembersListProps) => {
  groupId;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date joined</TableHead>
          <TableHead className="text-end">Manage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockUsers.map(({ name, joined }) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell>{joined.toLocaleDateString()}</TableCell>
            <TableCell className="flex justify-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="destructive">
                    <UserXIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Kick</TooltipContent>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
