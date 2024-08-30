interface ConfigProps {
  baseBackendUrl: string;
  baseApiUrl: string;
  baseUrl: string;
  loggingRequests: boolean;
  loggingResponses: boolean;
  loggingNetworkErrors: boolean;
}

export const config: ConfigProps = {
  baseBackendUrl: import.meta.env.VITE_API_URL,
  baseApiUrl: import.meta.env.VITE_API_URL + "api",
  baseUrl: import.meta.env.VITE_APP_URL,
  loggingRequests: import.meta.env.VITE_PUBLIC_LOGGING_REQUESTS == "true",
  loggingResponses: import.meta.env.VITE_PUBLIC_LOGGING_RESPONSES == "true",
  loggingNetworkErrors:
    import.meta.env.VITE_PUBLIC_LOGGING_NETWORK_ERRORS == "true",
};
