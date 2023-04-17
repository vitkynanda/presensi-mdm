import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initUiState = {
  globalLoading: false,
  validWFO: false,
  openDialog: false,
  userLoggedIn: null,
  currentProfileTab: 0,
  currentAdminTab: 0,
  presenceInfo: [],
  logbookInfo: [],
  allPresenceData: [],
  allLogbookData: [],
  allTeamData: [],
  allRoleData: [],
  allUserData: [],
  allWorkplaceData: [],
  selectedLogbook: {},
};

export const useUiStateStore = create(
  persist(
    (set) => ({
      ...initUiState,
      setGlobalLoading: (payload) => set({ globalLoading: payload }),
      setSelectedLogbook: (payload) => set({ selectedLogbook: payload }),
      setOpenDialog: (payload) => set({ openDialog: payload }),
      setValidWFO: (payload) => set({ validWFO: payload }),
      setPresenceInfo: (payload) => set({ presenceInfo: payload }),
      setLogbookInfo: (payload) => set({ logbookInfo: payload }),
      setAllLogbookData: (payload) => set({ allLogbookData: payload }),
      setAllTeamData: (payload) => set({ allTeamData: payload }),
      setAllUserData: (payload) => set({ allUserData: payload }),
      setAllRoleData: (payload) => set({ allRoleData: payload }),
      setAllWorkplaceData: (payload) => set({ allWorkplaceData: payload }),
      setAllPresenceData: (payload) => set({ allPresenceData: payload }),
      setCurrentProfileTab: (payload) =>
        set({
          currentProfileTab: payload,
        }),
      setCurrentAdminTab: (payload) =>
        set({
          currentAdminTab: payload,
        }),
      setUserLoggedIn: (payload) => set({ userLoggedIn: payload }),
      resetAllState: () => set({ ...initUiState }),
    }),
    {
      name: "app-state",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
