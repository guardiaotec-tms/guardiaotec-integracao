import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage();

export const getFileDownloadUrl = async (filenameInStorage: string) => {
  const storageRef = ref(storage, filenameInStorage);
  const downloadUrl = await getDownloadURL(storageRef).then((url) => {
    // Insert url into an <img> tag to "download"
    return url;
  });
  return downloadUrl;
};
