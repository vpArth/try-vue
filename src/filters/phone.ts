import { Vue } from 'vue-property-decorator';

const reQuote = (str: string) =>
  str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

export default Vue.filter('phone', (value: string, country: string = '+7') => {
    if (country !== '') {
      let reCountry = new RegExp(`^${reQuote(country)}`);
      if (value.match(reCountry)) {
        return country + ' ' + value.replace(reCountry, '')
          .replace(/\D+/g, '')
          .replace(/(\d+)(\d{3})(\d{2})(\d{2})/, `($1) $2-$3-$4`);
      }
    }
    const numbers = (value || '').replace(/\D+/g, '');
    switch (true) {
      case numbers.length === 11:
        return numbers.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, `+$1 ($2) $3-$4-$5`);
      case numbers.length > 7:
        return numbers.replace(/(\d{3})(\d+)(\d{2})(\d{2})/, `($1) $2-$3-$4`);
      default:
        return numbers.replace(/(\d+)(\d{2})(\d{2})/, `$1-$2-$3`);
    }
  },
);
