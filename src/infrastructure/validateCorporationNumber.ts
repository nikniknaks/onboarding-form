import axios from 'axios';
import { NUMBER_VALIDATION_ENDPOINT } from './constants';

interface ValidResponse {
  valid: true;
  corporationNumber: CorporationNumber;
}

interface InvalidResponse {
  valid: false;
  message: string;
}

type ValidationResponse = ValidResponse | InvalidResponse;

type CorporationNumber = `${string & { length: 8 }}`;

export async function validateCorporationNumber(corporationNumber: CorporationNumber): Promise<ValidationResponse> {
  try {
    const response = await axios.get(`${NUMBER_VALIDATION_ENDPOINT}${corporationNumber}`);
    return {
      corporationNumber: response.data.corporationNumber,
      valid: true
    };
} catch (error) {
    if (error.response && error.response.status === 400) {
        return {
        valid: false,
        message: error.response.data.message || 'Invalid corporation number'
        };
    }
    
    return {
        valid: false,
        message: 'Validation service unavailable'
    };
  }
}