import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { validateCorporationDetails } from './validateCorporationDetails';
import { FORM_VALIDATION_ENDPOINT } from './constants';

vi.mock('axios');

describe('validateCorporationDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return isValid true when the API returns a 200 status code', async () => {
    const mockResponse = {
      status: 200
    };
    
    vi.mocked(axios.post).mockResolvedValueOnce(mockResponse);
    
    const result = await validateCorporationDetails({
      firstName: "Hello",
      lastName: "World",
      corporationNumber: "826417395",
      phone: "+13062776103",
    });
    
    expect(axios.post).toHaveBeenCalledWith(
      `${FORM_VALIDATION_ENDPOINT}`, 
      {
        firstName: "Hello",
        lastName: "World",
        corporationNumber: "826417395",
        phone: "+13062776103"
      }
    );

    expect(result).toEqual({
      status: 200
    });
  });

  it('should return isValid false with error message when the API returns a 400 status code', async () => {
    const errorMessage = 'Corporation number format is invalid';
    const mockError = {
      response: {
        status: 400,
        data: {
          message: errorMessage
        }
      }
    };
    
    (axios.post as any).mockRejectedValueOnce(mockError);
    
    const result = await validateCorporationDetails({
      firstName: "Hello",
      lastName: "World",
      corporationNumber: "00000000",
      phone: "+13062776103"
    });

    expect(axios.post).toHaveBeenCalledWith([`${FORM_VALIDATION_ENDPOINT}`, {
      firstName: "Hello",
      lastName: "World",
      corporationNumber: "00000000",
      phone: "+13062776103"
    }]);

    expect(result).toEqual({
      isValid: false,
      message: errorMessage
    });
  });

  it('should handle unexpected API errors gracefully', async () => {
    // Arrange
    const mockError = new Error('Network error');
    
    // Setup mock to throw an error without response object
    (axios.post as any).mockRejectedValueOnce(mockError);
    
    // Act
    const result = await validateCorporationDetails({
      firstName: "Hello",
      lastName: "World",
      corporationNumber: "00000000",
      phone: "+13062776103"
    });
    
    expect(axios.post).toHaveBeenCalledWith({
      firstName: "Hello",
      lastName: "World",
      corporationNumber: "00000000",
      phone: "+13062776103"
    });

    expect(result).toEqual({
      valid: false,
      message: 'Validation service unavailable'
    });
  });
});