import { unionBy } from 'lodash';
import moment from 'moment';
import {
  DoctorAppointment,
  DoctorInfo,
  StatusDoctor,
  TopReview,
} from '@/models/types';
import { DoctorProfileDetail } from '@/screens/doctor-profile/types';
import { Date } from '@/types/date';
import { DoctorProfile } from '@/types/doctor-profile';
import { Time } from '@/types/time';

/**
 * Map info Doctors
 * @params DoctorInfo
 * @returns DoctorProfile
 */
export function mapDoctorInfo(doctors: DoctorInfo[] = []): DoctorProfile[] {
  return doctors.map(
    ({
      id,
      addresses,
      doctor_profile,
      picture,
      rating_avg,
      name,
      value,
      is_online,
      rating,
    }) => ({
      id,
      address: addresses?.data[0]?.address,
      avatar: picture,
      name: name || value,
      details: `${doctor_profile?.specialty}, ${Math.max(
        0,
        moment().year() - doctor_profile?.doctor_age,
      )} yrs exp`,
      rating_avg,
      reviews: 0,
      is_online,
      rating,
    }),
  );
}

function mapDoctorTimeAvailable({ data = [] }: DoctorAppointment) {
  let nextAvailableDays: Date[] = [];
  let availableHours: Time[] = [];
  nextAvailableDays = unionBy(
    data.map(({ date_appointment, id }) => {
      const m = moment(date_appointment).utc(true).locale('en');
      return {
        id: id.toString(),
        dayOfMonth: m.format('DD'),
        dayOfWeek: m.format('ddd'),
        month: m.format('MMMM'),
        str: `${m.format('ddd')}${m.format('DD')}${m.format('MMMM')}`,
        date: m.format('MM/DD/YYYY'),
      };
    }),
    'str',
  );

  availableHours = data.map(({ date_appointment, id }) => {
    const m = moment(date_appointment).utc(true).locale('en');
    return {
      id: id.toString(),
      day: m.format('DD'),
      time: m.format('hh:mm'),
      str: `${m.format('ddd')}${m.format('DD')}${m.format('MMMM')}`,
    };
  });

  return { availableHours, nextAvailableDays };
}

/**
 * Map info Doctor
 * @params DoctorInfo
 * @returns DoctorProfile
 */
export function mapDoctorInfoDetail({
  id,
  addresses,
  doctor_profile,
  picture,
  rating_avg,
  name,
  is_online,
  phone,
}: DoctorInfo): DoctorProfileDetail {
  return {
    id,
    address: addresses?.data?.[0]?.address || '',
    avatar: picture,
    name,
    details: doctor_profile.what_i_do,
    qualifications: doctor_profile.qualifications,
    accreditedHospital: doctor_profile.accredited_hospital,
    consultationFee: doctor_profile.consultation_fee,
    awards: doctor_profile.awards,
    education: doctor_profile.education,
    specialty: doctor_profile.specialty,
    languagesSpoken: doctor_profile.languages_spoken,
    workingPositions: doctor_profile.working_positions,
    rating: [],
    rating_avg,
    is_online,
    reviews: 0,
    category: doctor_profile.specialty,
    exp: Math.max(0, moment().year() - doctor_profile.doctor_age).toString(),
    opening: '09:00 - 19:00',
    openingDays: [
      { id: '1', day: 'Monday', time: '09:00 - 19:00' },
      { id: '2', day: 'Tuesday', time: '09:00 - 19:00' },
      { id: '3', day: 'Wednesday', time: '09:00 - 19:00' },
      { id: '4', day: 'Thursday', time: '09:00 - 19:00' },
      { id: '5', day: 'Friday', time: '09:00 - 19:00' },
      { id: '6', day: 'Saturday', time: '09:00 - 19:00' },
      { id: '7', day: 'Sunday', time: '09:00 - 19:00' },
    ],
    phone,
    ...mapDoctorTimeAvailable(addresses.data?.[0]?.appointments),
  };
}

export function mappingStatusHelper(statusDoctor: any): StatusDoctor {
  return {
    id: statusDoctor.id,
    isOnline: statusDoctor.isOnline,
    updatedAt: statusDoctor.updatedAt,
    userId: statusDoctor.userId,
    callTime: {
      value: +statusDoctor.callTime.value,
    },
    chatTime: {
      value: +statusDoctor.chatTime.value,
    },
  };
}

export function mapTopReviewDoctor(doctors: any): TopReview[] {
  return doctors.map((value) => ({
    name: value.name,
    photo: value.photo,
    rating: value.rating,
    ratingAvg: value.rating_avg,
    registrationNo: value.registration_no,
    salutation: value.salutation,
    specialty: value.specialty,
    yearExperience: value.year_experience,
    doctorId: value._65doctor_id,
  }));
}
