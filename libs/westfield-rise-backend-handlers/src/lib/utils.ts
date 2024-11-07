const initialBackoff = 1000; // Adjust this to your needs
export const getBackoffTime = (retryAttempt: number) => {
  return initialBackoff * Math.pow(2, retryAttempt);
};

export const delay = (duration: number) => {
  return new Promise(resolve => setTimeout(resolve, duration));
};
