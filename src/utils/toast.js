import { useToast } from 'vue-toastification';

const toast = useToast();

/**
 * Shows a toast notification.
 * @param {string} message The message to display in the toast.
 * @param {string} type The type of the toast (e.g., 'success', 'error').
 */
export function showToast(message, type = 'success') {
  toast[type](message);
}
