import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Ana Sayfa',
      href: '/'
    },  
    {
      text: 'Özgeçmiş',
      href: '/ozgecmis'
    }, 
    {
      text: 'Uzmanlık Alanları',
      href: '/uzmanlik-alanlari'
    }, 
    {
      text: 'Videolar',
      href: 'https://www.youtube.com/@AlpBurakCatakoglu'
    },
    {
      text: 'İletişim',
      href: '/iletisim'
    },
  ],
  actions: [{ variant: 'primary', text: 'Randevu', href: '/iletisim' }],
};

export const footerData = {
  links: [
    {
      title: 'Koroner',
      links: [
        { text: 'Koroner Anjiyografi', href: '/anjiyo' },
        { text: 'Balon ve Stent', href: '/stent' },
      ],
    },
    {
      title: 'Yapısal',
      links: [
        { text: 'TAVİ', href: '/tavi' },
        { text: 'MitraClip / TriClip', href: '/mitraclip' },
        { text: 'ASD Kapatma', href: '/asd-kapatma' },
        { text: 'PFO Kapatma', href: '/pfo-kapatma' },
        { text: 'LAA Kapatma', href: '/laa-kapatma' },
      ],
    },
    {
      title: 'Periferik',
      links: [
        { text: 'Karotis Stent', href: '/karotis-stent' },
        { text: 'Renal Denervasyon', href: '/renal-denervasyon' },
      ],
    },
    {
      title: 'Hakkımızda',
      links: [
        { text: 'Ana Sayfa', href: '/' },
        { text: 'Özgeçmiş', href: '/ozgecmis' },
        { text: 'Videolar', href: 'https://youtube.com/c/AlpBurakCatakoglu' },
        { text: 'İletişim', href: '/iletisim' },
        { text: 'Randevu', href: '/iletisim' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Kullanım Şartları', href: getPermalink('/kullanim-sartlari') },
    { text: 'Gizlilik', href: getPermalink('/gizlilik') },
  ],
  socialLinks: [
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: 'https://youtube.com/c/AlpBurakCatakoglu' },
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/DrAlpBurak' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://instagram.com/DrAlpBurak' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://facebook.com/drcatakoglu' },
    { ariaLabel: 'Linkedin', icon: 'tabler:brand-linkedin', href: 'https://linkedin.com/in/catakoglu' },
    { ariaLabel: 'WhatsApp', icon: 'tabler:brand-whatsapp', href: 'https://wa.me/905344025050' },
  ],
  footNote: `
    <img class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEqBKE6ijFFzJozNObA7PZO8VwqiDhBe7-AQ&s" alt="onWidget logo" loading="lazy"></img>
    Kalbimiz ile tasarladık <a class="text-blue-600 underline dark:text-muted" href="https://klinovo.com/"> Klinovo</a> · Tüm hakları saklıdır
  `,
};
