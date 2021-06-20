const IMAGE_DOCTOR = 'https://www.ascom.com/content/dam/ascom/ws/ready-for-use/global/patient-systems/telligence/ascom-telligence-patient-devices.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg'
export const mocksData = {
  time: '3h',
  filters: ['Date', 'Patient name', 'Amount'],
  invoices: [
    { id: 0, name: 'Ralph Edwards', time: 'Oct 20th - 11:49', avatar: IMAGE_DOCTOR, call_time: 15.0 },
    { id: 1, name: 'Ralph Edwards', time: 'Oct 20th - 11:49', avatar: IMAGE_DOCTOR, call_time: 15.1 },
    { id: 2, name: 'Ralph Edwards', time: 'Oct 20th - 11:49', avatar: IMAGE_DOCTOR, call_time: 15.2 },
    { id: 3, name: 'Ralph Edwards', time: 'Oct 20th - 11:49', avatar: IMAGE_DOCTOR, call_time: 15.3 },
  ]
}