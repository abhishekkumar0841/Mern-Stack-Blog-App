import { useEffect, useState } from "react";
import axiosInstance from "../Helper/axiosInstance";

const useProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get("user/profile");
      // console.log('res:', response);
      if (response?.data?.success) {
        setUserData(response?.data?.user);
      }
    })();
  }, []);
  return [userData];
};

export default useProfile;
