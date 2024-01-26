import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "./firebaseConfigs";

export const fileUpload = async (file) => {
  try  {
    const storageRef = ref(storage, `files/${file.name}`);
   await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch(error) {
    console.error("did not got a file");
    throw error;
  }
};
