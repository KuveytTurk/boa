/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import numeral from 'numeral';
import IBAN from 'iban';
import phoneFormatter from 'phone-formatter';
import 'numeral/locales';
import { Language } from './language';

/* eslint-disable */
Date.prototype.toJSON = function() { 
  return Moment(this).format(); 
};
/* eslint-enable  */

export class Localization {
  static language = 'en';

  static languageId = Language.EN;

  static currencyFormats = {
    D: '0',
    F: '0.00',
    M: '0.0,',
    FX: '0.0,00',
  };

  static numberFormats = {
    D: '0',
    F: '0,0',
    FDOT: '0.0',
  };

  static staticConstructor(langId) {
    const locales = {
      ar: {
        delimiters: {
          thousands: ',',
          decimal: '.',
        },
        abbreviations: {
          thousand: 'ألف',
          million: 'مليون',
          billion: 'مليار',
          trillion: 'تريليون',
        },
        ordinal: () => {
          return ' ';
        },
        currency: {
          symbol: 'KD',
        },
      },
    };

    this.languageId = langId;

    if (this.languageId === Language.TR) this.language = 'tr';
    else if (this.languageId === Language.EN) this.language = 'en';
    else if (this.languageId === Language.DE) this.language = 'de';
    else if (this.languageId === Language.RU) this.language = 'ru';
    else if (this.languageId === Language.AR) this.language = 'ar-ly';
    else {
      this.languageId = Language.EN;
      this.language = 'en';
    }

    if (!numeral.locales.hasOwnProperty('ar-ly')) {
      numeral.register('locale', 'ar-ly', locales.ar);
    }
    moment.locale(this.language);
    numeral.locale(this.language);
  }

  static createLocalizationContext(langId) {
    const localization = {
      isRightToLeft: false,
    };

    this.languageId = langId;

    if (this.languageId === Language.AR) {
      localization.isRightToLeft = true;
    }

    return localization;
  }

  static changeLocalizationLanguage(langId) {
    this.languageId = langId;
    this.language = 'en';
    if (this.languageId === Language.TR) this.language = 'tr';
    else if (this.languageId === Language.DE) this.language = 'de';
    else if (this.languageId === Language.RU) this.language = 'ru';
    else if (this.languageId === Language.AR) this.language = 'ar-ly';
    else {
      this.languageId = Language.EN;
      this.language = 'en';
    }

    moment.locale(this.language);
    numeral.locale(this.language);
  }

  static getLocalizationLanguage() {
    return { language: this.language, languageId: this.languageId };
  }

  /*
    Date Time Functions
  */
  static getDateLocale() {
    return moment.localeData();
  }

  static getFormattedDateLocale(date, format) {
    return moment(date, format);
  }

  static getDateTimeFormat(format) {
    // eslint-disable-next-line no-underscore-dangle
    return moment.localeData()._longDateFormat[format];
  }

  static formatDateTime(date, format) {
    return moment.utc(date).format(format);
  }

  static formatDateTimeGMT(date, format) {
    return moment(date).format(format);
  }

  static getDateValue(value) {
    return moment.utc(value);
  }

  static getFloatValue(value) {
    // eslint-disable-next-line no-underscore-dangle
    return numeral(value)._value;
  }

  static getIntegerValue(value) {
    // eslint-disable-next-line no-underscore-dangle
    return parseInt(numeral(value)._value, 10);
  }

  /**
   *
   * @param {*} currency
   * @param {*} format
   */
  static formatCurrency(currency, format) {
    if (currency === null) {
      return null;
    }

    if (format) {
      if (format === 'D') {
        return numeral(currency).format(this.currencyFormats.D);
      }
      if (format === 'F') {
        return numeral(currency).format(this.currencyFormats.F);
      }
      if (format === 'M') {
        return numeral(currency).format(this.currencyFormats.M);
      }
      if (format === 'FX') {
        return numeral(currency).format(this.currencyFormats.FX);
      }

      return numeral(currency).format(format);
    }

    return numeral(currency).format(this.currencyFormats.M);
  }

  /**
   *
   * @param {*} currency
   */
  static formatMoney(currency) {
    return numeral(currency).format(this.currencyFormats.M);
  }

  /**
   *
   * @param {*} number
   * @param {*} format
   */
  static formatNumber(number, format) {
    if (number === null) {
      return null;
    }

    if (format) {
      if (format === 'D') {
        return numeral(number).format(this.numberFormats.D);
      }
      if (format === 'F') {
        return numeral(number).format(this.numberFormats.F);
      }
      if (format === 'FDOT') {
        return numeral(number).format(this.numberFormats.FDOT);
      }

      return number;
    }

    return numeral(number).format(this.numberFormats.D);
  }

  /**
   *
   * @param {*} value
   */
  static formatCreditCard(value) {
    if (value == null || value === undefined) return null;

    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    let i = 0;
    for (i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  }

  /**
   *
   * @param {*} value
   */
  static formatIban(value) {
    if (value == null || value === undefined) return null;
    return IBAN.printFormat(value);
  }

  static formatTelephoneNumber(value, format) {
    let defaultFormat = '0 (NNN) NNN NN NN';
    if (value == null || value === undefined) return null;
    if (format) defaultFormat = format;

    const normalizedNumber = phoneFormatter.normalize(value);
    return phoneFormatter.format(normalizedNumber, defaultFormat);
  }

  /*
    String Functions
  */
  static stringUpperCase(value) {
    if (value === null) {
      return '';
    }

    if (this.languageId === 1) {
      const letters = { i: 'İ', ş: 'Ş', ğ: 'Ğ', ü: 'Ü', ö: 'Ö', ç: 'Ç', ı: 'I' };
      value = value.replace(/(([iışğüçö]))/g, letter => {
        return letters[letter];
      });
    }
    return value.toUpperCase();
  }

  static stringLowerCase(value) {
    if (value === null) {
      return '';
    }
    let returnValue = value.toString();
    if (this.languageId === 1) {
      const letters = { İ: 'i', I: 'ı', Ş: 'ş', Ğ: 'ğ', Ü: 'ü', Ö: 'ö', Ç: 'ç' };
      returnValue = returnValue.replace(/(([İIŞĞÜÇÖ]))/g, letter => {
        return letters[letter];
      });
    }
    return returnValue.toLowerCase();
  }

  static getDelimiters() {
    return numeral.localeData().delimiters;
  }
}

export function getLocalization() {
  return Localization.getLocalizationLanguage();
}

export { Language };
