import { describe, it, expect } from 'vitest';
import { validateCorporationDetails } from '../infrastructure/validateCorporationDetails';

describe('Form Submission Integration Tests', () => {
  // Skip this test if running in CI environment to avoid hitting real API
  it.skipIf(process.env.CI)('should validate valid corporation details with the real API', async () => {
    // Use a known valid test case
    const result = await validateCorporationDetails({
      firstName: "Test",
      lastName: "User",
      corporationNumber: "826417395", // Use a valid test corporation number
      phone: "+13062776103",
    });    
    expect(result.valid).toBe(true);
  });
  
  it.skipIf(process.env.CI)('should reject invalid corporation details with the real API', async () => {
    // Use a known invalid test case
    const result = await validateCorporationDetails({
      firstName: "Test",
      lastName: "User",
      corporationNumber: "00000000", // Use an invalid test corporation number
      phone: "+13062776103",
    });
    
    expect(result.valid).toBe(false);
    expect(result.message).toBeDefined();
  });
});