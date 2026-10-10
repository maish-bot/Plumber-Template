/* =====================================================================
   BUSINESS DETAILS — edit this file to customise the website.
   Save, upload, done. Every button, phone number and the opening
   hours on the page use these details.
   ===================================================================== */

window.SITE = {
  name: "PlumberPro",

  // Phone as shown, and the same number in international format for "Call" buttons
  phone: "0121 555 7890",
  phoneLink: "+441215557890",

  // WhatsApp in international format without the + (leave "" to hide)
  whatsapp: "441215557890",

  email: "info@plumberpro.co.uk",

  // Main town shown in headings, and the areas you cover
  town: "Oldbury & Birmingham",
  areas: ["Oldbury", "Birmingham", "Smethwick", "Dudley", "West Bromwich", "Halesowen", "Tipton", "Rowley Regis"],

  // Gas Safe registration number (leave "" to hide)
  gasSafe: "123456",

  // Google rating shown near the top (set rating to "" to hide)
  rating: "4.9",
  reviewCount: "180",

  // Do you take emergency call-outs 24/7? (true / false)
  emergency247: true,

  // Office hours for quotes and planned work. Days: 0 = Sunday … 6 = Saturday.
  hours: [
    { label: "Monday – Friday", days: [1, 2, 3, 4, 5], open: "08:00", close: "18:00" },
    { label: "Saturday",        days: [6],             open: "09:00", close: "14:00" },
    { label: "Sunday",          days: [0],             open: "",      close: "" }
  ],

  // Where the quote form sends messages: create a free form at https://formspree.io
  // and paste its link, e.g. "https://formspree.io/f/abcdwxyz".
  // Leave "" and the form opens the visitor's email app instead.
  formEndpoint: "",

  // Social links (leave "" to hide)
  facebook: "https://facebook.com/",
  instagram: "",
  google: ""   // your Google reviews link
};
