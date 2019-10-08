import React from 'react';
import { Button } from '@kuveytturk/boa-components/Button';

export default function Buttons() {
  return (
    <div>
      <Button label={'Contained'} />
      <Button variant={'flat'} label={'Flat'} />
      <Button variant={'icon'} dynamicIcon={'Home'} label={'Home'} />
    </div>
  );
}
