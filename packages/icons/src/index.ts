/**
 * Re-export every Lucide icon. Tree-shaking still works — bundlers will only
 * include the icons you actually import.
 *
 *   import { Search, ChevronDown } from '@hilal-ds/icons';
 *
 * Why re-export instead of just using lucide-react directly?
 *   - One import path across all Hilal docs and examples.
 *   - We can swap or augment the icon set later without consumers changing imports.
 *   - We can ship Hilal-specific custom icons here too (planned).
 */
export * from 'lucide-react';
