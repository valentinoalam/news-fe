'use client';

import React from 'react';

import { withRef } from '@udecode/cn';

import { PlateElement } from '@/components/plate-ui/plate-element';

export const CodeLineElement = withRef<typeof PlateElement>((props, ref) => (
  <PlateElement ref={ref} {...props} />
));
