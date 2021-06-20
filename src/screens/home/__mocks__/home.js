const IMAGE_CATE = 'https://c.files.bbci.co.uk/5435/production/_113475512__110894880_gettyimages-1055182908.jpg'
const IMAGE_TOPIC = 'https://cloud2.spineuniverse.com/sites/default/files/imagecache/large-content/wysiwyg_imageupload/3998/2017/04/04/operating_room_green_progress-1807543_1280-1_0.jpg'
const IMAGE_DOCTOR = 'https://65doctor.com/upload/member/photos/515/138x154rohit.PNG'

export const mocksData = {
  categories: [
    { id: 0, name: 'Dentist', image: IMAGE_CATE },
    { id: 1, name: 'Cardiology', image: IMAGE_CATE },
    { id: 2, name: 'Physical', image: IMAGE_CATE },
    { id: 3, name: 'Pediatric', image: IMAGE_CATE },
    { id: 4, name: 'Endocrinology', image: IMAGE_CATE },
    { id: 5, name: 'General Surgery', image: IMAGE_CATE }
  ],

  topics: [
    {id: 0, name: 'Vitae dolorem maxime.', image: IMAGE_TOPIC},
    {id: 1, name: 'Vitae dolorem maxime.', image: IMAGE_TOPIC},
    {id: 2, name: 'Vitae dolorem maxime.', image: IMAGE_TOPIC},
    {id: 3, name: 'Vitae dolorem maxime.', image: IMAGE_TOPIC},
  ],

  topDoctors: [
    {id: 0, name: 'Ralph Edwards', details: 'Dentist, 5 yrs exp', address: '6391 Elgin St. Celina, Delaware 10299', avatar: IMAGE_DOCTOR, reviews: 1000, rating: 1},
    {id: 1, name: 'Ralph Edwards', details: 'Dentist, 5 yrs exp', address: '6391 Elgin St. Celina, Delaware 10299', avatar: IMAGE_DOCTOR, reviews: 1000, rating: 2},
    {id: 2, name: 'Ralph Edwards', details: 'Dentist, 5 yrs exp', address: '6391 Elgin St. Celina, Delaware 10299', avatar: IMAGE_DOCTOR, reviews: 1000, rating: 3},
    {id: 3, name: 'Ralph Edwards', details: 'Dentist, 5 yrs exp', address: '6391 Elgin St. Celina, Delaware 10299', avatar: IMAGE_DOCTOR, reviews: 1000, rating: 5},
    {id: 4, name: 'Ralph Edwards', details: 'Dentist, 5 yrs exp', address: '6391 Elgin St. Celina, Delaware 10299', avatar: IMAGE_DOCTOR, reviews: 1000, rating: 3},
    {id: 5, name: 'Ralph Edwards', details: 'Dentist, 5 yrs exp', address: '6391 Elgin St. Celina, Delaware 10299', avatar: IMAGE_DOCTOR, reviews: 1000, rating: 4},
    {id: 6, name: 'Ralph Edwards', details: 'Dentist, 5 yrs exp', address: '6391 Elgin St. Celina, Delaware 10299', avatar: IMAGE_DOCTOR, reviews: 1000, rating: 5},
    {id: 7, name: 'Ralph Edwards', details: 'Dentist, 5 yrs exp', address: '6391 Elgin St. Celina, Delaware 10299', avatar: IMAGE_DOCTOR, reviews: 1000, rating: 3},
    {id: 8, name: 'Ralph Edwards', details: 'Dentist, 5 yrs exp', address: '6391 Elgin St. Celina, Delaware 10299', avatar: IMAGE_DOCTOR, reviews: 1000, rating: 5},
    {id: 9, name: 'Ralph Edwards', details: 'Dentist, 5 yrs exp', address: '6391 Elgin St. Celina, Delaware 10299', avatar: IMAGE_DOCTOR, reviews: 1000, rating: 4},
    {id: 10, name: 'Ralph Edwards', details: 'Dentist, 5 yrs exp', address: '6391 Elgin St. Celina, Delaware 10299', avatar: IMAGE_DOCTOR, reviews: 1000, rating: 2},
    {id: 11, name: 'Ralph Edwards', details: 'Dentist, 5 yrs exp', address: '6391 Elgin St. Celina, Delaware 10299', avatar: IMAGE_DOCTOR, reviews: 1000, rating: 3},
    {id: 12, name: 'Ralph Edwards', details: 'Dentist, 5 yrs exp', address: '6391 Elgin St. Celina, Delaware 10299', avatar: IMAGE_DOCTOR, reviews: 1000, rating: 1},
  ]
}