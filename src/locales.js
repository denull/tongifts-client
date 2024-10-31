import { locale } from './globals.js';

const locales = {
  en: {
    store: 'Store',
    gifts: 'Gifts',
    leaderboard: 'Leaderboard',
    profile: 'Profile',

    storeTitle: 'Buy and Send Gifts',
    storeSubtitle: 'Unique gifts for everyone by Crypto Pay.',
    giftsTitle: 'Send Gifts in Telegram',
    giftsSubtitle: 'Send gifts to users that can be stored in their app profile.',
  },
  ru: {
    store: 'Магазин',
    gifts: 'Подарки',
    leaderboard: 'Рейтинг',
    profile: 'Профиль',
  }
}

export const loc = function(key) {
  return locales[locale.value][key];
};