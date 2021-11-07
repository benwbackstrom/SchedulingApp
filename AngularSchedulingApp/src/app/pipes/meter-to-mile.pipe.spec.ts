import { MeterToMilePipe } from './meter-to-mile.pipe';

describe('MeterToMilePipe', () => {
  it('create an instance', () => {
    const pipe = new MeterToMilePipe();
    expect(pipe).toBeTruthy();
  });

  //Testing the transform method within the pipe
  it('should transform 1609 to 1', () => {
    const pipe = new MeterToMilePipe();
    expect(pipe.transform(1609)).toBe(1);
  })

  it('should transform 4022.5 to 2.5', () => {
    const pipe = new MeterToMilePipe();
    expect(pipe.transform(4022.5)).toBe(2.5);
  })
});
