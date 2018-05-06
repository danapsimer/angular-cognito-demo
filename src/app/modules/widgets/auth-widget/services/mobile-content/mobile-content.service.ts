import {Injectable} from '@angular/core';

export type MobileContentT = {
  countryName: string,
  countryCallCode: string,
  format: string,
  regex: RegExp
};

export type SelectViewContentT = {
  value: string,
  viewValue: string
}[];

@Injectable()
export class MobileContentService {

  getAllCountryNameCodeList(): string[] {
    return ['US', 'HK', 'CN'];
  }

  getFormat(countryNameCode: string): string {
    return this.getContent(countryNameCode).format;
  }

  getContent(countryNameCode: string): MobileContentT {
    switch (countryNameCode) {
      case 'CN':
        return {
          countryName: 'China',
          countryCallCode: '+86',
          format: '131 2345 6789',
          regex: /^(\+?0?86\-?)? ?((13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/
        };
      case 'HK':
        return {
          countryName: 'Hong Kong',
          countryCallCode: '+852',
          format: '5123 4567',
          regex: /^(\+?852\-?)? ?([569]\d{3}\-?\d{4})$/
        };
      case 'US':
        return {
          countryName: 'United States',
          countryCallCode: '+1',
          format: '(###) ###-####',
          regex: /^(\+?0?0?1\-?)? ?(\(?\d{3}\)? ?\d{3}\-?\d{4})$/
        };
      default:
        return {
          countryName: 'undefined',
          countryCallCode: 'undefined',
          format: 'undefined',
          regex: /./
        };
    }
  }

  inferCountryCode(phoneNumber: string): string {
    return this.getAllCountryNameCodeList().find(code => phoneNumber.match(this.getContent(code).regex) != null);
  }

  getCountryCallCode(countryNameCode: string): string {
    return this.getContent(countryNameCode).countryCallCode;
  }

  getSelectViewContent(): SelectViewContentT {
    return this.getAllCountryNameCodeList()
      .map(value => {
        return {
          value: value,
          viewValue: `${value} ${this.getCountryCallCode(value)}`
        };
      });
  }
}
