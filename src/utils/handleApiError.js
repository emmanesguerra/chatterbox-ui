import { showToast } from '@/utils/toast'; // Assuming you have a showToast function for toasts

/**
 * Centralized API error handling function.
 * @param {Error} error The error object from the API response.
 */
function handleApiError(error) {
  const errorMessage = error.response?.data?.message || error.message || 'Something went wrong!';
  
  showToast(errorMessage, 'error');
  console.error("API Error:", error.response?.data || error.message); //for debugging
}

export default handleApiError;
