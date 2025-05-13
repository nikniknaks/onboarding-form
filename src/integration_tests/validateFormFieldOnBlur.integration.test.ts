import { describe, it, expect } from 'vitest';
import { validateCorporationNumber } from '../infrastructure/validateCorporationNumber';
import { CorporationNumber } from '../infrastructure/validateCorporationNumber';

describe('Form Submission Integration Tests', () => {
  // Skip this test if running in CI environment to avoid hitting real API
  it.skipIf(process.env.CI)('should validate valid corporation details with the real API', async () => {
    // Use a known valid test case
    const result = await validateCorporationNumber("826417395" as CorporationNumber);
    console.log("result", result);
    expect(result.valid).toBe(true);
    expect(result.corporationNumber).toBe("826417395");
  });
  
  it.skipIf(process.env.CI)('should reject invalid corporation details with the real API', async () => {
    // Use a known invalid test case
    const result = await validateCorporationNumber("00000000" as CorporationNumber);
    
    expect(result.valid).toBe(false);
    expect(result.message).toBeDefined();
  });
});