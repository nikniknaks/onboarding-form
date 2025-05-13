import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { validateCorporationNumber } from './validateCorporationNumber';
import { NUMBER_VALIDATION_ENDPOINT } from './constants';

const asCorporationNumber = (value: string) => value as `${string & { length: 8 }}`;

vi.mock('axios');

describe('validateCorporationNumber', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return isValid true when the API returns a 200 status code', async () => {
    const mockResponse = {
      status: 200,
      data: {
        corporationNumber: "826417395",
        valid: true
      }
    };
    
    (axios.get as any).mockResolvedValueOnce(mockResponse);
    
    const result = await validateCorporationNumber(asCorporationNumber('826417395'));
    
    expect(axios.get).toHaveBeenCalledWith(`${NUMBER_VALIDATION_ENDPOINT}826417395`);

    expect(result).toEqual({
      corporationNumber: "826417395",
      valid: true
    });
  });

  it('should return valid is false with error message when the API returns a 400 status code', async () => {
    const errorMessage = 'Corporation number format is invalid';
    const mockError = {
      response: {
        status: 400,
        data: {
          valid: false,
          message: errorMessage
        }
      }
    };
    
    (axios.get as any).mockRejectedValueOnce(mockError);
    
    const result = await validateCorporationNumber(asCorporationNumber('00000000'));

    expect(axios.get).toHaveBeenCalledWith(`${NUMBER_VALIDATION_ENDPOINT}00000000`);

    expect(result).toEqual({
      valid: false,
      message: errorMessage
    });
  });

  it('should handle unexpected API errors gracefully', async () => {
    const mockError = new Error('Network error');
    (axios.get as any).mockRejectedValueOnce(mockError);

    const result = await validateCorporationNumber(asCorporationNumber('00000000'));
    
    expect(result).toEqual({
      valid: false,
      message: 'Validation service unavailable'
    });

  });
});