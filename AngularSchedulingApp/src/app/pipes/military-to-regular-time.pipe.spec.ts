import { MilitaryToRegularTimePipe } from './military-to-regular-time.pipe';

describe('MilitaryToRegularTimePipe', () => {
  const pipe = new MilitaryToRegularTimePipe();
  
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  //Testing the transform method
  it('should transform 0 to 12:00 AM', () => {
    expect(pipe.transform(0)).toBe('12:00 AM');
  })

  it('should transform 12 to 12:00 PM', () => {
    expect(pipe.transform(12)).toBe('12:00 PM');
  })

  it('should transform 10.5 to 10:30 AM', () => {
    expect(pipe.transform(10.5)).toBe('10:30 AM');
  })

  it('should transform 15.5 to 3:30 PM', () => {
    expect(pipe.transform(15.5)).toBe('3:30 PM');
  })
});
