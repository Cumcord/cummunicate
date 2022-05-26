import cummunicate from ".";

window.cummunicate = cummunicate;

/*
 * this makes the esm.sh bundle MUCH smaller LMAO
 * because it just re-exports cummunicate as c
 * (doesnt actually need an `as` because esbuild magic)
 * as opposed to seeing no exports and pissing about trying
 * to convert cjs / iife / whatever to esm
 */
export { cummunicate as c };
