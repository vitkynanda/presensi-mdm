import { db } from "config/firebase";
import {
  doc,
  setDoc,
  query,
  collection,
  getDocs,
  where,
  updateDoc,
  serverTimestamp,
  deleteDoc,
  Timestamp,
  limit,
  orderBy,
} from "firebase/firestore";
import { addNewUser, clockIn } from "./request-template";

export const addUser = async (payload) => {
  const timeNow = serverTimestamp();
  try {
    await setDoc(doc(db, "users", payload.id), {
      ...addNewUser,
      ...payload,
      created_at: timeNow,
      updated_at: timeNow,
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const addPresence = async (payload) => {
  const timeNow = serverTimestamp();
  try {
    await setDoc(doc(db, "presences", clockIn.id), {
      ...clockIn,
      ...payload,
      clock_in: timeNow,
      created_at: timeNow,
      updated_at: timeNow,
    });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const addLogbook = async (payload) => {
  const timeNow = serverTimestamp();
  try {
    await setDoc(doc(db, "logbooks", payload.id), {
      ...payload,
      created_at: timeNow,
      updated_at: timeNow,
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const addProject = async (payload) => {
  const timeNow = serverTimestamp();
  try {
    await setDoc(doc(db, "projects", payload.id), {
      ...payload,
      created_at: timeNow,
      updated_at: timeNow,
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const updatePresence = async (payload) => {
  try {
    await updateDoc(doc(db, "presences", payload.id), {
      ...payload,
      updated_at: serverTimestamp(),
    });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const updateUser = async (payload) => {
  try {
    await updateDoc(doc(db, "users", payload.id), {
      ...payload,
      updated_at: serverTimestamp(),
    });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const updateLogbook = async (payload) => {
  try {
    await updateDoc(doc(db, "logbooks", payload.id), {
      ...payload,
      updated_at: serverTimestamp(),
    });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const updateProject = async (payload) => {
  try {
    await updateDoc(doc(db, "projects", payload.id), payload);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const verifyUserAccount = async (payload) => {
  try {
    await updateDoc(doc(db, "users", payload.id), {
      ...payload,
      is_verified: !payload.is_verified,
      updated_at: serverTimestamp(),
    });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const deleteUser = async (payload) => {
  try {
    await updateDoc(doc(db, "users", payload.id), {
      ...payload,
      is_active: false,
      updated_at: serverTimestamp(),
    });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const deletePresence = async (payload) => {
  try {
    await deleteDoc(doc(db, "presences", payload.id));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const deleteLogbook = async (payload) => {
  try {
    await deleteDoc(doc(db, "logbooks", payload.id));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const deleteProject = async (payload) => {
  try {
    await deleteDoc(doc(db, "projects", payload.id));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getAllPresenceData = async (queryParams) => {
  try {
    const q =
      !queryParams?.startDate && !queryParams?.endDate
        ? query(
            collection(db, "presences"),
            orderBy("clock_in", "desc"),
            limit(10)
          )
        : query(
            collection(db, "presences"),
            queryParams?.startDate
              ? where(
                  "clock_in",
                  ">=",
                  Timestamp.fromDate(new Date(queryParams?.startDate))
                )
              : undefined,
            queryParams?.endDate
              ? where(
                  "clock_in",
                  "<=",
                  Timestamp.fromDate(new Date(+queryParams?.endDate + 86400000))
                )
              : undefined
          );
    const querySnapshot = await getDocs(q);
    let data = querySnapshot.docs
      .map((doc) => doc.data())
      .sort((curr, prev) => prev.created_at - curr.created_at);

    if (queryParams?.team?.label) {
      data = data.filter(
        (presence) => presence.user.team === queryParams.team.label
      );
    }
    if (queryParams?.user?.label) {
      data = data.filter(
        (presence) => presence.user.name === queryParams.user.label
      );
    }
    return data;
  } catch (e) {
    return false;
  }
};

export const getAllLogbookData = async (queryParams) => {
  try {
    const q =
      !queryParams?.startDate && !queryParams?.endDate
        ? query(
            collection(db, "logbooks"),
            orderBy("selected_date", "desc"),
            limit(10)
          )
        : query(
            collection(db, "logbooks"),
            queryParams?.startDate
              ? where(
                  "selected_date",
                  ">=",
                  Timestamp.fromDate(new Date(queryParams?.startDate))
                )
              : undefined,
            queryParams?.endDate
              ? where(
                  "selected_date",
                  "<=",
                  Timestamp.fromDate(new Date(+queryParams?.endDate))
                )
              : undefined
          );

    const querySnapshot = await getDocs(q);
    let data = querySnapshot.docs
      .map((doc) => doc.data())
      .sort((curr, prev) => prev.selected_date - curr.selected_date);

    if (queryParams?.team?.label) {
      data = data.filter(
        (logbook) => logbook.user.team === queryParams.team.label
      );
    }
    if (queryParams?.user?.label) {
      data = data.filter(
        (logbook) => logbook.user.name === queryParams.user.label
      );
    }

    return data;
  } catch (e) {
    return false;
  }
};

export const getAllTeamData = async () => {
  try {
    const q = query(collection(db, "teams"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs
      .map((doc) => doc.data())
      .sort((curr, prev) => prev.updated_at - curr.updated_at);

    return data;
  } catch (e) {
    return false;
  }
};

export const getAllUserData = async () => {
  try {
    const q = query(collection(db, "users"), where("is_active", "==", true));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs
      .map((doc) => doc.data())
      .sort((curr, prev) => prev.updated_at - curr.updated_at);

    return data;
  } catch (e) {
    return false;
  }
};

export const getAllRoleData = async () => {
  try {
    const q = query(collection(db, "roles"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs
      .map((doc) => doc.data())
      .sort((curr, prev) => prev.updated_at - curr.updated_at);

    return data;
  } catch (e) {
    return false;
  }
};

export const getAllWorkplaceData = async () => {
  try {
    const q = query(collection(db, "workplaces"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs
      .map((doc) => doc.data())
      .sort((curr, prev) => prev.updated_at - curr.updated_at);

    return data;
  } catch (e) {
    return false;
  }
};

export const getPresenceInfo = async (userId) => {
  try {
    const q = query(
      collection(db, "presences"),
      where("user.id", "==", userId)
      // orderBy("clock_in", "desc"),
      // limit(10)
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs
      .map((doc) => doc.data())
      .sort((curr, prev) => prev.clock_in - curr.clock_in)
      .slice(0, 10);

    return data;
  } catch (e) {
    return false;
  }
};

export const getLogbookInfo = async (userId) => {
  try {
    const q = query(collection(db, "logbooks"), where("user.id", "==", userId));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs
      .map((doc) => doc.data())
      .sort((curr, prev) => prev.selected_date - curr.selected_date);

    return data;
  } catch (e) {
    return false;
  }
};

export const getUserInfo = async (userId) => {
  try {
    const q = query(collection(db, "users"), where("id", "==", userId));
    const querySnapshot = await getDocs(q);
    const [data] = querySnapshot.docs.map((doc) => doc.data());

    return data;
  } catch (e) {
    return false;
  }
};
