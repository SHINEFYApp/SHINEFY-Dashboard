import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:border-primary hover:bg-white/50 transition-all text-sm font-medium"
      title={i18n.language === 'ar' ? t('language.switchToEnglish') : t('language.switchToArabic')}
    >
      <Languages className="w-4 h-4 text-gray-500" />
      <span>{i18n.language === 'ar' ? t('language.en') : t('language.ar')}</span>
    </button>
  );
};
