import { getDownloadURL, getStorage, ref } from 'firebase/storage';

export const getPlaceholderAvatarUrl = (): Promise<string> => {
  const storage = getStorage();
  return getDownloadURL(ref(storage, 'avatars/placeholder'));
};
