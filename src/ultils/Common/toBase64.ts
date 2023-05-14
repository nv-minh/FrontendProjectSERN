import { Buffer } from 'buffer';

export const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const blodToBase64 = (blod: any) => new Buffer(blod, 'base64').toString();
