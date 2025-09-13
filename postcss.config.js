import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default {
  plugins: [
    postcssImport,
    autoprefixer,
    ...(process.env.NODE_ENV === 'production' 
      ? [cssnano({ preset: 'default' })] 
      : [])
  ]
};