import { IUser } from "../../lib/user";

export default function useUpdateUser() {
  const updateUser = async (
    userId: string,
    data: Partial<IUser>,
    refetch?: () => void,
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/user/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok && refetch) {
        refetch();
      }
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { updateUser };
}
