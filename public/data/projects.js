export const projects = [
  {
    id: 'mixbox',
    category: 'design',
    title: 'MIXBOX',
    focus: 'Branding, App Design',
    year: '2025',
    software: 'Adobe Illustrator, Adobe Photoshop, Figma',
    description: 'MixBox is a cocktail subscription brand launching in Antwerp. I designed the full branding and app — a bold, playful identity with a smooth, user-friendly experience that captures the energy of discovering new cocktails every month.',
    images: [
      '/assets/mixbox_1.webp',
      '/assets/mixbox_2.webp',
      '/assets/mixbox_3.webp',
      '/assets/mixbox_4.webp',
      '/assets/mixbox_5.webp',
      '/assets/mixbox_6.webp',
      '/assets/mixbox_7.webp',
      '/assets/mixbox_8.webp',
    ],
    thumbnail: './src/assets/image_1.svg' // For gallery preview
  },
  {
    id: 'menu-design',
    category: 'design',
    title: 'MENU DESIGN',
    focus: 'Menu, Illustration, and UX Design',
    year: '2025',
    software: 'Adobe Illustrator, Figma',
    description: 'Harmonie Massage Café in Kortrijk is a wellness spot where I redesigned their full menu with custom illustrations and stickers. The old design felt messy and hard to read, so I focused on creating something more clear and visually inviting that matches the café\'s relaxing vibe.',
    images: [
      '/assets/menu-design_1.webp',
      '/assets/menu-design_2.webp',
      '/assets/menu-design_3.webp',
      '/assets/menu-design_4.webp',
    ],
    thumbnail: './src/assets/image_2.svg'
  },
  {
    id: 'flower-workshop',
    category: 'design',
    title: 'FLOWER WORKSHOP',
    focus: 'UI/UX & Interactive Form Design',
    year: '2025',
    software: 'Adobe Illustrator, Figma',
    description: 'For Flower Workshop, I designed an interactive booking form that feels more like an experience than a task. I created custom illustrations, playful animations, and unique layouts to make the process engaging and easy to follow. The goal was to keep users interested and guide them smoothly through each step, turning a usually boring form into something fun and memorable.',
    images: [
     '/assets/flower-workshop_1.mp4',
     '/assets/flower-workshop_2.svg',
     '/assets/flower-workshop_3.svg',
     '/assets/flower-workshop_4.svg',
     '/assets/flower-workshop_5.svg',
     '/assets/flower-workshop_6.svg',
     '/assets/flower-workshop_7.svg',
     '/assets/flower-workshop_8.svg',
     '/assets/flower-workshop_9.svg',
     '/assets/flower-workshop_10.svg',
    ],
    thumbnail: './src/assets/image_3.svg'
  },
  {
    id: 'kickstarter',
    category: 'design',
    title: 'KICKSTARTER CAMPAIGN',
    focus: 'Motion Design & Storytelling',
    year: '2025',
    software: 'After Effects, Adobe Illustrator, Figma',
    description: 'For this project, I made a short promo video for a Kickstarter campaign that didn\'t really show off its product well. I focused on making it clear, fun, and attention-grabbing — using motion, storytelling, and visuals to bring the idea to life and make it feel exciting and ready to launch.',
    images: [
         '/assets/kickstarter-campaign_1.mp4',
         '/assets/kickstarter-campaign_2.webp',
         '/assets/kickstarter-campaign_3.svg',
         '/assets/kickstarter-campaign_4.svg',
         '/assets/kickstarter-campaign_5.webp',
         '/assets/kickstarter-campaign_6.svg',
    ],
    thumbnail: './src/assets/image_4.png'
  },


  // CODING PROJECTS
{
  id: 'generative-poster-tool',
  title: 'GENERATIVE POSTER TOOL',
  category: 'coding',
  focus: 'Creative Coding & Interactive Design',
  year: '2025',
  technologies: 'JavaScript, Three.js, WebGL, GLSL',
  description: 'I built an interactive web tool that lets users create their own generative posters in real time. It uses shaders and 3D graphics to make unique abstract visuals that constantly change and react as you design. The goal was to mix art and code — giving users full creative control to experiment and create something different every time.',
  thumbnail: './src/assets/posters_2.webp',
  liveUrl: 'https://shaders-assignemnt.vercel.app/',
  images: [
      '/assets/posters_2.webp',
   '/assets/posters_1.mp4',
  ]
},
{
  id: 'photo-booth-app',
  title: 'PHOTO BOOTH APP',
  category: 'coding',
  focus: 'Mobile App & UI Design',
  year: '2025',
  technologies: 'React Native, Expo SDK, TypeScript, Zustand, JavaScript',
  description: 'A native mobile photo booth app that lets users capture or upload photos, customize them with filters, colors, and text, and save photostrips straight to their gallery. Inspired by vintage photo booths, it combines playful design with modern camera features — built using React Native and Expo to showcase smooth native performance on both iOS and Android.',
  thumbnail: './assets/images/photo-booth-thumb.jpg',
  images: [
      '/assets/photoBooth_2.webp',
    '/assets/photoBooth_1.mp4',
  ]
},
{
  id: 'webrtc-smoothie-maker',
  title: 'WEBRTC SMOOTHIE MAKER',
  category: 'coding',
  focus: 'Creative Coding & Real-Time Interaction',
  year: '2025',
  technologies: 'WebRTC, Socket.IO, GSAP, Device Motion API, JavaScript',
  description: 'A real-time interactive project where users can control a virtual blender on their phone. After scanning a QR code, the phone connects directly to the desktop. No data stored, just a smooth peer-to-peer connection. Users can pick fruits on their phone, see them appear instantly in the blender on screen, shake to blend, and tap to pour the smoothie into a glass. Built with WebRTC, Socket.IO, and GSAP for a fun and seamless experience.',
  thumbnail: './src/assets/image_7.svg',
  images: [
    '/assets/WebRtc_1.mp4',
  ]
}



];