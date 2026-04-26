import { useAuth } from "../../hooks/useAuth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const MyProfile = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-text">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-destructive">
        User not found
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 text-text">
      <div className="max-w-4xl mx-auto bg-background border rounded-2xl p-4 sm:p-6 shadow-sm">
        
        {/* 🔹 Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 border-b pb-6">
          
          <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
            <AvatarImage
              src={user?.photoURL || "https://github.com/shadcn.png"}
              alt={user?.displayName || "User"}
            />
            <AvatarFallback>
              {user?.displayName?.slice(0, 2).toUpperCase() || "NA"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-primary">
              {user?.displayName || "Anonymous User"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {user?.email || "No email provided"}
            </p>
          </div>

          <Button
            variant="secondary"
            className="w-full text-white sm:w-auto"
          >
            Edit Profile
          </Button>
        </div>

        {/* 🔹 Info Section */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          
          <div className="p-4 border rounded-xl bg-secondary/10">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Full Name
            </p>
            <p className="font-medium text-text">
              {user?.displayName || "Not available"}
            </p>
          </div>

          <div className="p-4 border rounded-xl bg-secondary/10">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Email
            </p>
            <p className="font-medium text-text break-all">
              {user?.email || "Not available"}
            </p>
          </div>

          <div className="p-4 border rounded-xl bg-secondary/10">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Role
            </p>
            <p className="font-medium text-text">User</p>
          </div>

          <div className="p-4 border rounded-xl bg-secondary/10">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Status
            </p>
            <p className="font-medium text-primary">
              Active
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProfile;