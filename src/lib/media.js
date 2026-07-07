/* Shared media-capability flags, matching the original script.js gates. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer:fine)').matches
