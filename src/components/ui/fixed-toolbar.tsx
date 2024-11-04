import { withCn } from '@udecode/cn';

import { Toolbar } from './toolbar';

export const FixedToolbar = withCn(
  Toolbar,
  'supports-backdrop-blur:bg-background/60 sticky left-0 top-0 z-30 w-full justify-between overflow-x-auto rounded-t-lg border-2 border-b-border bg-background/95 backdrop-blur'
);
