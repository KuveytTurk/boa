import * as React from 'react';

export interface ErrorBoundaryProps {
  children: Node;
}

export interface ErrorBoundaryInstance extends React.Component<any, any> {}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryInstance
> {}
