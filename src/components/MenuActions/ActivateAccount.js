import { Switch } from "@mui/material";
import { toast } from "react-toastify";
import { getAllUserData, verifyUserAccount } from "services";
import { useUiStateStore } from "store/ui-state";

const ActivateAccount = ({ userData }) => {
  const { setGlobalLoading, setAllUserData } = useUiStateStore();
  const handleActivateAccount = async () => {
    console.log(userData);
    if (!userData.workplace.id)
      return toast.error("Please update user data before activate account");
    setGlobalLoading(true);
    const res = await verifyUserAccount(userData);
    if (res) {
      const resUpdated = await getAllUserData();
      if (resUpdated) setAllUserData(resUpdated);
    }
    setGlobalLoading(false);
  };

  return (
    <Switch
      color="info"
      checked={userData.is_verified}
      onChange={handleActivateAccount}
    />
  );
};

export default ActivateAccount;
