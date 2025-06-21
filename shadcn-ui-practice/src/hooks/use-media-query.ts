import * as React from "react";

export function useMediaQuery(query: string): boolean {
  // Default to true (desktop) for SSR and initial render
  const [matches, setMatches] = React.useState(true);

  React.useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);

    // Update the state initially
    setMatches(media.matches);

    // Define a callback function to handle changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the listener
    media.addEventListener("change", listener);

    // Clean up
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}
