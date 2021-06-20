import { DefaultClinic, DefaultImage, DefaultProfile, Heart } from '@/assets';

export function getDisplayedAvatar(image: string | undefined) {
  return image ? { uri: image } : DefaultProfile;
}

export function getDisplayedAvatarClinic(image: string | undefined) {
  return image ? { uri: image } : DefaultClinic;
}

export function getDisplayedImage(image: string | undefined) {
  return image ? { uri: image } : DefaultImage;
}

export function getSpecilityImage(image: string | undefined) {
  return image ? { uri: image } : Heart;
}
