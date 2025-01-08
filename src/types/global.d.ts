declare global {
  interface Window {
    Android?: {
      saveString?: (key: string, value: string) => void;
      getString?: (key: string) => string;
    };
  }
}
