import { uuid } from 'react-uuid';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { makeId } from './makeId';

const storage = getStorage();

export const uploadFileToStorage = async (file: File, folderName?: string) => {
  console.log(file);
  const filenameInStorage =
    (folderName ? folderName + '/' : '') + file.name + '_' + makeId(8);
  const storageRef = ref(storage, filenameInStorage);
  await uploadBytes(storageRef, file).then((snapshot) => {
    console.log(snapshot);
    console.log('Uploaded a blob or file!');
  });

  return { filenameInStorage, filename: file.name };
};
