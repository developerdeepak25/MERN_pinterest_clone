import { deleteObject, ref } from "firebase/storage";
import storage from "./firebaseConfigs";

export const deleteFile = async (name) => {
  try {
    const fileRef = ref(storage, `files/${name}`);
    // console.log(ref);
    await deleteObject(fileRef)
      .then(() => {
        //
        console.log(" File deleted successfully");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(" Uh-oh, an error occurred!");
      });
  } catch (error) {
    console.error("did not got a file");
    throw error;
  }
};
