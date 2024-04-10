const convertBase64 = (file: File): Promise<string> => {
  return new Promise(resolve => {
    const reader = new FileReader();
    console.log('????><?><>?<?><?', file);
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
    };
  });
};

export default convertBase64;
