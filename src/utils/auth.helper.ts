import { AreaCodeProps } from '@/screens/login-phone/types';

export const mapperAreacode = (areacodes: any[]): AreaCodeProps[] => {
  return areacodes.map(({ id, area_name, area_code, area_shortname }) => ({
    id,
    areaCode: area_code,
    areaName: area_name,
    areaShortname: area_shortname,
  }));
};
