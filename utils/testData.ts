import { CheckoutInfo } from '../pages/CheckoutInfoPage';

export const Checkout = {
  valid: { firstName: 'John', lastName: 'Doe', zip: '12345' } satisfies CheckoutInfo,
  missingFirstName: { firstName: '', lastName: 'Doe', zip: '12345' } satisfies CheckoutInfo,
  missingLastName: { firstName: 'John', lastName: '', zip: '12345' } satisfies CheckoutInfo,
  missingZip: { firstName: 'John', lastName: 'Doe', zip: '' } satisfies CheckoutInfo,
};

export const Products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  redTShirt: 'Test.allTheThings() T-Shirt (Red)',
};
