import '../src/env-test';

describe('Test environment', () => {
  test('Variable POST is defined', async () => {
    expect(process.env.PORT).toBeDefined();
  });
});
