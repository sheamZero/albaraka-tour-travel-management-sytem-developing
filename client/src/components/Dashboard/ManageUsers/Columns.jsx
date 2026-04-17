import { Trash2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const getColumns = ({ handleDelete, handleMakeAdmin }) => [
  {
    accessorKey: "photo",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.photo || user.photoURL} />
            <AvatarFallback>
              {user.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span>{user.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role");
      return (
        <span className="uppercase text-[10] font-medium bg-primary/10 px-3 py-1.5 rounded-full">
          {role || "N/A"}
        </span>
      );
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      console.log("user from column", user)
      return (
        <div className="flex gap-2">

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleMakeAdmin(user)}
          >
            {user.role === "admin" ? "Make User" : "Make Admin"}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(user._id)}
          >
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];