import { spy } from 'sinon';
import { assert, expect } from 'chai';
import moment from 'moment';
import numeral from 'numeral';
import { Localization, getLocalization } from '..';
import { Language } from './language';

const languages = [
  { id: Language.TR, code: 'tr' },
  { id: Language.EN, code: 'en' },
  { id: Language.DE, code: 'de' },
  { id: Language.RU, code: 'ru' },
  { id: Language.AR, code: 'ar-ly', isRightToLeft: true },
  { id: 6, code: 'en' }, // for default values
];

describe('Localization', () => {
  it('should default values set to english ', () => {
    Localization.staticConstructor();
    assert.strictEqual(Localization.language, 'en');
    assert.strictEqual(Localization.languageId, 2);
  });

  it('should have curreny formats ', () => {
    expect(Localization.currencyFormats).to.be.have.property('D');
    expect(Localization.currencyFormats).to.be.have.property('F');
    expect(Localization.currencyFormats).to.be.have.property('M');
    expect(Localization.currencyFormats).to.be.have.property('FX');
  });

  it('should have number formats ', () => {
    expect(Localization.currencyFormats).to.be.have.property('D');
    expect(Localization.currencyFormats).to.be.have.property('F');
  });

  it('should static constructor set moment and numeral locales', () => {
    languages.forEach(language => {
      Localization.staticConstructor(language.id);
      assert.strictEqual(moment.locale(), language.code);
      assert.strictEqual(numeral.locale(), language.code);
    });
  });

  it('should static constructor set "ar" locales to numeral', () => {
    delete numeral.locales['ar-ly'];
    spy(numeral, 'register');
    Localization.staticConstructor(5);
    const args = numeral.register.args;
    numeral.register.restore();
    assert.strictEqual(args[0][2].delimiters.thousands, ',');
    assert.strictEqual(args[0][2].delimiters.decimal, '.');
    assert.strictEqual(args[0][2].ordinal(), ' ');
  });

  it('should create localization context set to RTL', () => {
    languages.forEach(language => {
      const localizationContext = Localization.createLocalizationContext(language.id);
      assert.strictEqual(localizationContext.isRightToLeft, !!language.isRightToLeft);
    });
  });

  it('should changeLocalizationLanguage set moment and numeral locales', () => {
    languages.forEach(language => {
      Localization.changeLocalizationLanguage(language.id);
      assert.strictEqual(moment.locale(), language.code);
      assert.strictEqual(numeral.locale(), language.code);
    });
  });

  it('should return localization language', () => {
    languages
      .filter(x => x.id !== 6)
      .forEach(language => {
        Localization.changeLocalizationLanguage(language.id);
        assert.strictEqual(Localization.getLocalizationLanguage().language, language.code);
        assert.strictEqual(Localization.getLocalizationLanguage().languageId, language.id);
        assert.strictEqual(getLocalization().language, language.code);
        assert.strictEqual(getLocalization().languageId, language.id);
      });
  });

  describe('DateTime functions', () => {
    it('should return locale data', () => {
      assert.strictEqual(Localization.getDateLocale(), moment.localeData());
    });

    it('should return formatter local date', () => {
      const date = new Date();
      const format = 'ddMMyyyy';
      const result = Localization.getFormattedDateLocale(date, format).toISOString();
      assert.equal(result, moment(date, format).toISOString());
    });
  });

  describe('String functions', () => {
    it('should string to upper case', () => {
      [
        { value: 'test', result: 'TEST', languageId: Language.TR },
        { value: 'cçgğıioösşuü', result: 'CÇGĞIİOÖSŞUÜ', languageId: Language.TR },
        { value: 'test', result: 'test'.toUpperCase(), languageId: Language.EN },
        { value: 'cçgğıioösşuü', result: 'cçgğıioösşuü'.toUpperCase(), languageId: Language.EN },
      ].forEach(item => {
        Localization.changeLocalizationLanguage(item.languageId);
        assert.strictEqual(Localization.stringUpperCase(item.value), item.result);
      });
    });

    it('should string to upper case', () => {
      [
        { value: 'TEST', result: 'test', languageId: Language.TR },
        { value: 'CÇGĞIİOÖSŞUÜ', result: 'cçgğıioösşuü', languageId: Language.TR },
        { value: 'TEST', result: 'TEST'.toLowerCase(), languageId: Language.EN },
        { value: 'CÇGĞIİOÖSŞUÜ', result: 'CÇGĞIİOÖSŞUÜ'.toLowerCase(), languageId: Language.EN },
      ].forEach(item => {
        Localization.changeLocalizationLanguage(item.languageId);
        assert.strictEqual(Localization.stringLowerCase(item.value), item.result);
      });
    });
  });
});
