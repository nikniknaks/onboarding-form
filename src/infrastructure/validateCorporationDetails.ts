import axios from 'axios';
import { FORM_VALIDATION_ENDPOINT } from './constants';

interface ValidationResponse {
  valid: boolean;
  message?: string;
}

interface CorporationDetails {
  firstName: string;
  lastName: string;
  corporationNumber: string;
  phone: string;
}

export async function validateCorporationDetails(corporationDetails: CorporationDetails): Promise<ValidationResponse> {
  try {
    const response = await axios.post(`${FORM_VALIDATION_ENDPOINT}`, corporationDetails);
    return {
      valid: true
    }
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