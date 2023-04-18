import { CircularProgress, useMediaQuery } from "@mui/material";
import { useState } from "react";
import SoftModal from "components/UI/SoftModal";
import SoftBottomModal from "components/UI/SoftBottomModal";

import InputWithLabel from "components/Inputs/InputWithLabel";
import AutoCompleteOption from "components/UI/AutoCompleteOption";
import {
  getAllRoleData,
  getAllUserData,
  getAllWorkplaceData,
  updateUser,
} from "services";
import { useUiStateStore } from "store/ui-state";
import SoftBox from "components/UI/SoftBox";
import SoftButton from "components/UI/SoftButton";

export default function UserUpdateModal({
  title,
  open = false,
  handleClose,
  rowData,
}) {
  const {
    allRoleData,
    setAllRoleData,
    setAllWorkplaceData,
    allWorkplaceData,
    setGlobalLoading,
    setAllUserData,
    globalLoading,
  } = useUiStateStore();
  const [userData, setUserData] = useState({
    ...rowData,
    team: rowData.team.id
      ? rowData.team
      : { id: "2UX8jtmIMLtt9JFp6Cuq", name: "Master Data Management" },
  });
  const matchesmd = useMediaQuery("(max-width:600px)");
  const ModalWrapper = matchesmd ? SoftBottomModal : SoftModal;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleChangeSelect = (e, val, key) => {
    if (!val) return;
    const newValue = { name: val.label, id: val.id };
    if (key === "workplace") {
      newValue.location = val.location;
      newValue.radius = val.radius;
    }
    setUserData({ ...userData, [key]: newValue });
  };

  const handleUpdate = async () => {
    setGlobalLoading(true);
    const res = await updateUser(userData);
    if (res) {
      handleClose();
      const updatedUser = await getAllUserData();
      if (updatedUser) setAllUserData(updatedUser);
    }
    setGlobalLoading(false);
  };

  return (
    <ModalWrapper title={title} open={open} handleClose={handleClose}>
      <InputWithLabel
        value={["name", userData.name]}
        onChange={handleChangeInput}
      />
      <InputWithLabel
        value={["email", userData.email]}
        onChange={handleChangeInput}
        type="email"
        disabled={true}
      />
      <InputWithLabel
        value={["phone", userData.phone]}
        onChange={handleChangeInput}
        type="number"
      />
      <InputWithLabel
        value={["profile_desc", userData.profile_desc]}
        onChange={handleChangeInput}
      />
      <AutoCompleteOption
        options={allWorkplaceData.map((workplace) => ({
          label: workplace?.name,
          id: workplace?.id,
          location: workplace?.location,
          radius: workplace?.radius,
        }))}
        value={[
          "workplace",
          {
            label: userData?.workplace?.name,
            id: userData?.workplace?.id,
            location: userData?.workplace?.location,
            radius: userData?.workplace?.radius,
          },
        ]}
        onSelect={handleChangeSelect}
        fetcher={getAllWorkplaceData}
        setOption={setAllWorkplaceData}
      />
      <InputWithLabel
        value={["team", userData.team.name]}
        onChange={handleChangeInput}
        disabled={true}
      />
      <AutoCompleteOption
        options={allRoleData
          .filter((role) => role.name !== "Administrator")
          .map((role) => ({
            label: role?.name,
            id: role?.id,
          }))}
        value={[
          "company_role",
          {
            label: userData?.company_role?.name,
            id: userData?.company_role?.id,
          },
        ]}
        onSelect={handleChangeSelect}
        fetcher={getAllRoleData}
        setOption={setAllRoleData}
      />
      <SoftBox sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <SoftButton
          endIcon={
            globalLoading ? (
              <CircularProgress color="inherit" size={18} />
            ) : null
          }
          onClick={handleUpdate}
          variant="gradient"
          color="info"
          disabled={globalLoading}
        >
          Update
        </SoftButton>
      </SoftBox>
    </ModalWrapper>
  );
}
