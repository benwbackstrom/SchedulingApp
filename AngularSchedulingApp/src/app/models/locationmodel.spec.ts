import { Locationmodel } from './locationmodel';

describe('Locationmodel', () => {
  it('should create an instance', () => {
    expect(new Locationmodel('222 Test St', 134, 154, 35, 'Test')).toBeTruthy();
  });
});
