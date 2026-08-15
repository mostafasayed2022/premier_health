import axios from "axios";

export const getErrorMessage = (
  error: unknown,
  defaultMessage = "An unexpected error occurred",
): string => {
  if (axios.isAxiosError(error)) {
    // Attempt to extract detail or message from common backend error structures
    return (
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      defaultMessage
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  return String(error) || defaultMessage;
};
