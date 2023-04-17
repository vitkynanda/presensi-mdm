import { Switch } from "@mui/material";
import { getAllUserData, verifyUserAccount } from "services";
import { useUiStateStore } from "store/ui-state";

const ActivateAccount = ({ userData }) => {
  const { setGlobalLoading, setAllUserData } = useUiStateStore();
  const handleActivateAccount = async () => {
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
      color="error"
      checked={userData.is_verified}
      onChange={handleActivateAccount}
    />
  );
};

export default ActivateAccount;
