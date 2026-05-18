# @hilal-ds/icons

Re-exports of [Lucide icons](https://lucide.dev) so all Hilal docs and consumers use a single import path.

```tsx
import { Search, ChevronDown, User } from '@hilal-ds/icons';

<Search size={16} aria-hidden />
```

Tree-shaking is preserved — only the icons you import end up in your bundle.
