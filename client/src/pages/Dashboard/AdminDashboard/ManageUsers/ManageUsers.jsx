
import { getColumns } from '../../../../components/Dashboard/ManageUsers/Columns'
import { DataTable } from "../../../../components/Dashboard/ManageUsers/DataTable";
import { useDeleteUser, useGetAllUsers, useMakeAdmin, useMakeUser } from "../../../../hooks/useManageUser";
import { confirmAction } from '../../../../utils/swal';

const ManageUsers = () => {
  const { data: users = [], isLoading } = useGetAllUsers();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { mutate: makeAdmin, isPending: isMakingAdmin } = useMakeAdmin();
  const { mutate: makeUser, isPending: isMakingUser } = useMakeUser();


  const handleDelete = async (userId) => {

    try {
      const isConfirmed = await confirmAction({
        title: "Delete User?",
        text: `This will permanently delete the user.`,
        confirmText: "Yes, delete",
      });

      if (!isConfirmed) return;
      // console.log("delete user", userId);

      deleteUser(userId);


    } catch (error) {
      console.log(error);
    }
  };

  const handleMakeAdmin = async (user) => {

    if (user.role === "user") {
      const isConfirmed = await confirmAction({
        title: "Make Admin?",
        text: `${user.name} will get admin access.`,
        confirmText: "Yes, make admin",
      });

      if (!isConfirmed) return;

      console.log(user._id);
      makeAdmin(user._id);
    }
    else {
      const isConfirmed = await confirmAction({
        title: "Make User?",
        text: `${user.name} will not get admin access.`,
        confirmText: "Yes, make user",
      });

      if (!isConfirmed) return;

      console.log(user._id);
      makeUser(user._id);
    }
  }


  // Get columns with handlers
  const columns = getColumns({ handleDelete, handleMakeAdmin });

  console.log("users ", users);

  return (
    <div className="px-6 lg:px-20">
      <h2>Manage Users</h2>
      <div className="rounded-md border bg-white overflow-hidden">
        <DataTable
          columns={columns}
          data={users}
          loading={isLoading || isDeleting || isMakingAdmin || isMakingUser}
        />
      </div>
    </div>
  );
};

export default ManageUsers;