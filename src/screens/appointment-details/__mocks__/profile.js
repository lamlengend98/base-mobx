const IMAGE_DOCTOR = 'https://65doctor.com/upload/member/photos/515/138x154rohit.PNG'

export const mocksData = {
  doctorProfile: {
    id: 0,
    name: 'Ralph Edwards',
    category: 'Dentist',
    exp: '25',
    details: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.',
    address: '6391 Elgin St. Celina, Delaware 10299',
    avatar: IMAGE_DOCTOR,
    phone: '511-751-3277',
    reviews: 1000,
    rating: 4,
    opening: '09:00 - 19:00',
    openingDays: [
      { day: 'Monday', time: '09:00 - 19:00' },
      { day: 'Tuesday', time: '09:00 - 19:00' },
      { day: 'Wednesday', time: '09:00 - 19:00' },
      { day: 'Thursday', time: '09:00 - 19:00' },
      { day: 'Friday', time: '09:00 - 19:00' },
      { day: 'Saturday', time: '09:00 - 19:00' },
      { day: 'Sunday', time: '09:00 - 19:00' },
    ]
  },

  nextAvailableDays: [
    { dayOfWeek: 'MON', dayOfMonth: 15, month: 'March' },
    { dayOfWeek: 'TUE', dayOfMonth: 16, month: 'March' },
    { dayOfWeek: 'WED', dayOfMonth: 17, month: 'March' },
    { dayOfWeek: 'THU', dayOfMonth: 18, month: 'March' },
    { dayOfWeek: 'FRI', dayOfMonth: 19, month: 'March' },
    { dayOfWeek: 'SAT', dayOfMonth: 20, month: 'March' },
  ],

  availableHours: [
    { id: 9, time: '09:00' },
    { id: 10, time: '10:00' },
    { id: 11, time: '11:00' },
    { id: 13, time: '13:00' },
    { id: 14, time: '14:00' },
    { id: 15, time: '15:00' },
    { id: 16, time: '16:00' },
    { id: 17, time: '17:00' }
  ]
}