import { MilitaryToRegularTimePipe } from './military-to-regular-time.pipe';

describe('MilitaryToRegularTimePipe', () => {
  it('create an instance', () => {
    const pipe = new MilitaryToRegularTimePipe();
    expect(pipe).toBeTruthy();
  });
});
