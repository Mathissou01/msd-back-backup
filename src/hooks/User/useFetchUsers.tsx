import { useState } from "react";
import { IUser } from "../../lib/user";

interface IUseUsersParams {
  city?: string;
  postalCode?: string;
  email?: string;
  idAddress?: string;
  idUser?: string;
  limit: number;
  page: number;
}

interface IUseUsersResult {
  users: IUser[];
  isLoading: boolean;
  fetchUsers: (params: IUseUsersParams) => void;
  refetch: () => void;
  count: number | null;
}

export default function useFetchUsers(): IUseUsersResult {
  const [users, setUsers] = useState<IUser[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastParams, setLastParams] = useState<IUseUsersParams>();

  const transformParamsToQueryString = (params: IUseUsersParams) => {
    return Object.keys(params)
      .filter(
        (key) =>
          params[key as keyof IUseUsersParams] !== undefined &&
          params[key as keyof IUseUsersParams] !== "",
      )
      .map((key) => `${key}=${params[key as keyof IUseUsersParams]}`)
      .join("&");
  };

  const fetchUsers = async (params: IUseUsersParams) => {
    setLastParams(params);
    try {
      setIsLoading(true);

      const queryString = transformParamsToQueryString(params);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_USER_API_URL}/user?${queryString}`,
      );
      const { data, count } = await response.json();
      setUsers(data);
      setCount(count);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    if (lastParams) {
      fetchUsers(lastParams);
    }
  };

  return { users, isLoading, fetchUsers, refetch, count };
}
