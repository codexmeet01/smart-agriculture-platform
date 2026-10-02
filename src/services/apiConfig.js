// Central API configuration and abstraction layer
// Ensures zero hardcoded keys and allows seamless toggling between realistic mock mode and live backend APIs

export const API_BASE_URL = import.meta.env.VITE_API_URL || "";
export const IS_PRODUCTION_API = Boolean(API_BASE_URL);

/**
 * Universal simulated network delay helper for realistic UX testing
 */
export const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generic safe fetcher with mock fallback
 */
export async function fetchWithFallback(endpoint, options = {}, mockFallbackFn) {
  if (IS_PRODUCTION_API) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText} (${response.status})`);
      }
      return await response.json();
    } catch (err) {
      console.warn(`Falling back to mock provider for ${endpoint}:`, err.message);
      return mockFallbackFn();
    }
  }
  await delay();
  return mockFallbackFn();
}
