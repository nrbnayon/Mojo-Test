import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const {
    data: isAdmin,
    isAdminLoading,
    isPending,
    error,
  } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      if (!user?.email) return false;
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      // console.log(res.data);
      return res.data?.admin;
    },
    enabled: !!user?.email,
  });

  return { isAdmin, isAdminLoading, error, isPending };
};

export default useAdmin;
