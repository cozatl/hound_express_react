import { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';

// Define the TypeScript interface for props
interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
  image?: string;
  robots?: string;
  lang?: string;
}

// Aux function to convert languages "fr" en "fr_FR", "pt" en "pt_PT", etc.
export const getOgLocale = (langCode: string): string => {
  // Si el usuario ya pasa un formato largo (ej: "en_US" o "es_MX"), lo dejamos igual
  if (langCode.includes('_') || langCode.includes('-')) {
    return langCode.replace('-', '_');
  }
  // Specific common mappings in case language from 1 country does not match standard
  const specialCases: Record<string, string> = {
    en: 'en_US', // Inglés (General / USA)
    ja: 'ja_JP', // Japonés (País: JP)
    zh: 'zh_CN', // Chino Simplificado (China)
    ko: 'ko_KR', // Coreano (Corea del Sur: KR)
    da: 'da_DK', // Danés (Dinamarca: DK)
    el: 'el_GR', // Griego (Grecia: GR)
    sv: 'sv_SE', // Sueco (Suecia: SE)
    uk: 'uk_UA', // Ucraniano (Ucrania: UA)
    cs: 'cs_CZ', // Checo (República Checa: CZ)
  };

  if (specialCases[langCode]) {
    return specialCases[langCode];
  }

  // For the others (fr, it, pt, de), duplicate characters with uppercase: fr_FR, de_DE
  return `${langCode}_${langCode.toUpperCase()}`;
};

// Apply the interface to the component function
export default function SEO({ 
  title, 
  description, 
  keywords, 
  type = 'website', 
  image,
  robots = 'index, follow',
  lang = 'en'
}: SEOProps): ReactElement {
  const siteTitle = "My React App";
  const ogLocale = getOgLocale(lang); // <-- Generate format for Open Graph automatically

  return (
    <Helmet>
      {/* HTML Language Tag */}
      <html lang={lang} /> {/* <-- Web page language */}

      {/* Standard HTML Meta Tags */}
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={description || "Default description for my React application."} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />

      {/* Open Graph / Facebook Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={ogLocale} /> {/* <-- Configure language for social networks */}
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}