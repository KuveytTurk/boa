import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  state = {
    hasError: false,
  };

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ open: false });
  }

  componentDidCatch(error) {
    // Display fallback UI
    this.setState({ hasError: true, error, open: true });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info); // client exception log
  }

  showErrorDialog(error) {
    return (
      <Dialog
        open={this.state.open}
        // onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{error.message}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{error.stack}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      // eslint-disable-next-line no-console
      console.log('Error Occured: ', this.state.error);
      return this.showErrorDialog(this.state.error);
      // return <h1>Something went wrong. {this.state.error}</h1>;
    }
    return this.props.children;
  }
}
