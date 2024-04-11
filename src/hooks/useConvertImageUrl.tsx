import { useEffect } from 'react';
import convertBase64 from '../utils/convertBase64';

const useConvertImage = (
  imageUrl: FileList,
  setPreview: React.Dispatch<React.SetStateAction<string>>,
) => {
  useEffect(() => {
    const convertImagetUrl = async (file: File) => {
      const url = await convertBase64(file);
      localStorage.clear();
      localStorage.setItem(file.name, url);
      setPreview(url);
    };

    if (imageUrl?.length) {
      convertImagetUrl(imageUrl[0]);
    }
  }, [imageUrl]);
};

export default useConvertImage;
