import { storiesOf } from '@storybook/react';
import Input from './Input';
import InputAction from './InputAction';
import InputMask from './InputMask';
import InputNumeric from './InputNumeric';

const stories = storiesOf('Inputs', module);

stories.add('Input', Input);
stories.add('InputAction', InputAction);
stories.add('InputMask', InputMask);
stories.add('InputNumeric', InputNumeric);
