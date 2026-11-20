export const business = {
  name: 'Kelly Buxton Aesthetics',
  booking: 'https://that-time.co.uk/kelly-buxton-aesthetics',
  whatsapp: 'https://wa.me/447496080844',
  phone: '07496 080844',
  telephone: '+447496080844',
  email: 'Kellybuxton_aesthetics@outlook.com',
  instagram: 'https://www.instagram.com/kellybuxton_aesthetics/',
  facebook: 'https://www.facebook.com/share/1MFsivbMfH/',
  google: 'https://share.google/JrTRWJez9fOURTsgh',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=4F+Station+Road+Mickleover+Derby+DE3+9GH',
  address: '4F Station Road, Mickleover, Derby, DE3 9GH'
};

export const reviews = [
  {
    name: 'Laura T.',
    source: 'Google',
    url: business.google,
    quote: 'I’ve got complete trust in her judgement and wouldn’t go anywhere else.'
  },
  {
    name: 'Stacey M.',
    source: 'Google',
    url: business.google,
    quote: 'Kelly is so knowledgeable and takes the time to answer any questions and offer reassurance.'
  },
  {
    name: 'Kasiea M.',
    source: 'That Time',
    url: business.booking,
    quote: 'Kelly is incredibly professional, kind and knowledgeable, taking the time to explain everything and make you feel comfortable and at ease.'
  },
  {
    name: 'Penny B.',
    source: 'That Time',
    url: business.booking,
    quote: 'Kelly was very knowledgeable and professional over messages and face to face. Very welcoming and calming environment.'
  }
];

export const treatments = [
  { id:'full-face-rejuvenation', number:'01', name:'Full face rejuvenation', category:'The signature focus', image:'full-face-comparison.jpg', description:'A considered look at the whole face, with a personalised plan shaped around your features and your goals.', detail:'Rather than choosing a treatment in isolation, start with a conversation about what you would like to achieve. I consider your face as a whole and talk you through which options, if any, are suitable for you. Your plan, costs and next steps are agreed following your consultation.' },
  { id:'profile-balancing', number:'02', name:'Profile balancing & contouring', category:'Balance & definition', image:'profile-comparison.jpg', description:'A personalised approach to facial proportions, profile and definition.', detail:'Discuss the relationship between your features and the areas you would like to explore. I’m qualified in profile balancing and facial contouring, and I’ll explain the options, limitations and suitability during your consultation.' },
  { id:'lips', number:'03', name:'Lip treatments', category:'Shape & individuality', image:'lips-01.jpg', description:'An individual approach to lip shape and proportion.', detail:'Every face is different. A consultation gives you time to discuss the look you have in mind, your treatment history and whether a lip treatment is appropriate. I’ll explain what to expect, including risks and aftercare, before you decide.' },
  { id:'rhinoplasty', number:'04', name:'Non-surgical rhinoplasty', category:'The finer details', image:'nose-profile.jpg', description:'Explore your profile with an honest conversation about suitability.', detail:'I’m qualified in rhinoplasty treatments. Begin with a free consultation to discuss your concerns and understand the potential benefits, risks, limitations and alternatives. I’ll only consider treatment after an individual assessment.' },
  { id:'brows', number:'05', name:'Brows', category:'Your finishing touches', image:null, description:'Brow appointments to complement your features and personal style.', detail:'Explore my current brow services, prices and appointment availability through That Time. If you are unsure which service to choose, you are welcome to ask me before booking.' },
  { id:'permanent-jewellery', number:'06', name:'Permanent jewellery', category:'Something personal', image:null, description:'A little detail to make your own.', detail:'Discover the permanent jewellery appointments currently available at my clinic. Contact me or visit That Time for the current options, prices and availability.' }
];

export const gallery = [
  {image:'full-face-comparison.jpg', category:'face', title:'Full face rejuvenation', alt:'Two supplied client photographs showing facial treatment results'},
  {image:'full-face-angle.jpg', category:'face', title:'A different perspective', alt:'Angled client facial treatment photograph from my clinic'},
  {image:'lips-01.jpg', category:'lips', title:'Lip detail', alt:'Close-up of a lip treatment, photographed at my clinic'},
  {image:'lips-02.jpg', category:'lips', title:'Lip detail', alt:'Lip treatment photograph with Kelly Buxton Aesthetics branding'},
  {image:'lips-03.jpg', category:'lips', title:'Lip detail', alt:'Close-up lip treatment photograph from the clinic'},
  {image:'lips-04.jpg', category:'lips', title:'Lip detail', alt:'Client lip treatment photograph from my clinic'},
  {image:'lips-05.jpg', category:'lips', title:'Lip detail', alt:'Lip treatment detail photographed in clinic'},
  {image:'profile-comparison.jpg', category:'profile', title:'Profile & proportions', alt:'Paired client photographs showing facial treatment results'},
  {image:'nose-profile.jpg', category:'profile', title:'Profile detail', alt:'Side profile treatment photograph from my clinic'},
  {image:'in-clinic.jpg', category:'clinic', title:'In the clinic', alt:'Treatment in progress at my clinic'},
  {image:'profile-detail.jpg', category:'profile', title:'Profile detail', alt:'Paired side profile client photographs from my clinic'}
];

export const faqs = [
  ['I’m new to aesthetics. Where should I start?', 'Start with a free consultation. You can talk through your goals, ask questions and find out whether a treatment is suitable, without having to choose a treatment first.'],
  ['Can I talk to you before booking?', 'Absolutely. Send me a message on WhatsApp, or book a free consultation through That Time.'],
  ['Where can I find treatment prices?', 'The current treatment list, prices and availability are on my That Time booking page. For a personalised full face plan, start with a consultation.'],
  ['Where is the clinic?', 'You’ll find me at 4F Station Road, Mickleover, Derby, DE3 9GH. The contact page has opening hours and a link to directions.'],
  ['Where will I find booking policies and aftercare?', 'I provide booking, deposit and consultation information through That Time. I also send relevant aftercare information through the booking system.']
];