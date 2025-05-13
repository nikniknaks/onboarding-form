import axios from 'axios';
import { NUMBER_VALIDATION_ENDPOINT } from './constants';

export interface ValidationResponse {
  valid: boolean;
  corporationNumber?: CorporationNumber;
  message?: string;
}

export type CorporationNumber = `${string & { length: 8 }}`;

export async function validateCorporationNumber(corporationNumber: CorporationNumber): Promise<ValidationResponse> {
  console.log('axios get: ', `${NUMBER_VALIDATION_ENDPOINT}${corporationNumber}`)
  try {
    const response = await axios.get(`${NUMBER_VALIDATION_ENDPOINT}${corporationNumber}`);
    console.log("response: ", response)
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