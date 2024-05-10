export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        fontFamily: {
          sinclair: ['FS Sinclair', 'sans-serif'],
          pixel: ['Smallest Pixel-7', 'sans-serif'],
          swiss: ['Swiss Extended Bold', 'sans-serif'],
        },
        colors: {
          'dg-black': '#040404',
          'dg-offblack': '#171616',
          'dg-white': '#fdfcf9',
  
          'dg-gray_dk': '#56585d',
          'dg-gray': '#9ca3af',
          'dg-gray_lt': '#c4c8cf',
  
          'dg-delta_neg': '#eb3515',
          'dg-delta_equ': '#aea683',
          'dg-delta_pos': '#45db6d',
  
          'dg-yellow': '#fff000',
  
          'dg-superearth_dk': '#219ffb',
          'dg-superearth': '#6bb7ea',
          'dg-superearth_lt': '#bdddeb',
  
          'dg-terminids': '#ffa000',
          'dg-automatons': '#ee5b58',
          'dg-illuminate': '#9729ff',
        },
      },
    },
    plugins: [],
  }
  
  