import { useAuth } from "../contexts/authContext";

const useTokenUpdate = () => {
  const { user } = useAuth();
  return user?.token;
};

export default useTokenUpdate;
