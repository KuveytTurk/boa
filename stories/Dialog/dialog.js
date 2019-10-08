/* eslint-disable max-len */
/* eslint-disable max-len */
import React from 'react';
import { action } from '@storybook/addon-actions';
import { DialogHelper } from '@kuveytturk/boa-components/Dialog';
import { Button } from '@kuveytturk/boa-components/Button';
import {
  ComponentBase,
  DialogType,
  DialogResponseStyle,
  DialogResponse,
} from '@kuveytturk/boa-base';
import { DocViewer } from '@kuveytturk/boa-components/DocViewer';
import { warningDoc, successDoc, objectDoc, dialogDoc } from './docs';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

class DialogHelperFixture extends ComponentBase {
  state = { expanded: {} };

  handleExpandClick = id => {
    this.setState(prevState => {
      const expanded = Object.assign({}, prevState.expanded);
      expanded[id] = !expanded[id];
      return { expanded };
    });
  };

  onClick = type => {
    if (type === 'warning') {
      DialogHelper.show(
        this.props.context,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        DialogType.WARNING,
        DialogResponseStyle.OK,
        null,
        null,
        null,
        null,
        true,
      );
    } else if (type === 'success') {
      DialogHelper.show(
        this.props.context,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        DialogType.SUCCESS,
        DialogResponseStyle.OK,
        null,
        null,
        null,
        null,
        false,
      );
    } else if (type === 'object') {
      const obj = {
        mainContent:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        subcontents: [
          {
            header: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            contents: ['Phasellus', 'Donec', 'Fusce aliquet'],
          },
          {
            header: 'Sed convallis mauris in est elementum, nec accumsan ante pulvinar.',
            contents: ['Donec lacinia', 'Curabitur blandit', 'Turpis eget'],
          },
          {
            header: 'Cras in nibh eu nunc aliquam suscipit sed vitae dolor.',
            contents: ['Phasellus', 'Donec', 'Fusce aliquet'],
          },
          {
            header: 'Etiam hendrerit metus quis vulputate finibus.',
            contents: ['Donec lacinia', 'Curabitur blandit', 'Turpis eget'],
          },
          {
            header: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            contents: ['Phasellus', 'Donec', 'Fusce aliquet'],
          },
          {
            header: 'Sed convallis mauris in est elementum, nec accumsan ante pulvinar.',
            contents: ['Donec lacinia', 'Curabitur blandit', 'Turpis eget'],
          },
          {
            header: 'Cras in nibh eu nunc aliquam suscipit sed vitae dolor.',
            contents: ['Phasellus', 'Donec', 'Fusce aliquet'],
          },
          {
            header: 'Etiam hendrerit metus quis vulputate finibus.',
            contents: ['Donec lacinia', 'Curabitur blandit', 'Turpis eget'],
          },
        ],
      };
      const onClose = function onClose(closeType) {
        let closeTypeString;
        Object.keys(DialogResponse).forEach(key => {
          if (DialogResponse[key] === closeType) {
            closeTypeString = `DialogResponse.${key}`;
          }
        });
        action('onClose')(closeTypeString);
      };
      DialogHelper.show(
        this.props.context,
        obj,
        DialogType.ERROR,
        DialogResponseStyle.YESNOCANCEL,
        null,
        onClose,
        null,
        false,
      );
    } else if (type === 'dialog') {
      const content = (
        <Button
          context={this.props.context}
          type="contained"
          text="Open Dialog"
          onClick={() =>
            DialogHelper.show(
              this.props.context,
              <div>Test</div>,
              DialogType.ERROR,
              DialogResponseStyle.OK,
              'Test Title',
              null,
              null,
              null,
              true,
            )
          }
        />
      );
      DialogHelper.show(
        this.props.context,
        content,
        DialogType.ERROR,
        DialogResponseStyle.OK,
        'Test Title',
        null,
        null,
        null,
        true,
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <div>
          <DocViewer content="# Samples" editorType="github" />
        </div>
        <div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <DocViewer content="## String Content" editorType="github" />
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded['1'],
              })}
              style={{ position: 'absolute', right: 0, marginTop: 5 }}
              onClick={() => this.handleExpandClick('1')}
              aria-expanded={this.state.expanded['1']}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
          <Collapse in={this.state.expanded['1']} timeout="auto" unmountOnExit>
            <DocViewer content={warningDoc} editorType="github" lang="js" />
            <Button
              fullWidth
              context={this.props.context}
              variant="contained"
              colorType="primary"
              text={'Show'}
              onClick={() => this.onClick('warning')}
            />
          </Collapse>
        </div>
        <div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <DocViewer content="## Long String Content" editorType="github" />
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded['2'],
              })}
              style={{ position: 'absolute', right: 0, marginTop: 5 }}
              onClick={() => this.handleExpandClick('2')}
              aria-expanded={this.state.expanded['2']}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
          <Collapse in={this.state.expanded['2']} timeout="auto" unmountOnExit>
            <DocViewer content={successDoc} editorType="github" lang="js" />
            <Button
              fullWidth
              context={this.props.context}
              variant="contained"
              colorType="primary"
              text={'Show'}
              onClick={() => this.onClick('success')}
            />
          </Collapse>
        </div>
        <div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <DocViewer content="## Object Content" />
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded['3'],
              })}
              style={{ position: 'absolute', right: 0, marginTop: 5 }}
              onClick={() => this.handleExpandClick('3')}
              aria-expanded={this.state.expanded['3']}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
          <Collapse in={this.state.expanded['3']} timeout="auto" unmountOnExit>
            <DocViewer content={objectDoc} editorType="github" lang="js" />
            <Button
              fullWidth
              context={this.props.context}
              variant="contained"
              colorType="primary"
              text={'Show'}
              onClick={() => this.onClick('object')}
            />
          </Collapse>
        </div>
        <div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <DocViewer content="## Dialog in Dialog" editorType="github" />
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded['4'],
              })}
              style={{ position: 'absolute', right: 0, marginTop: 5 }}
              onClick={() => this.handleExpandClick('4')}
              aria-expanded={this.state.expanded['4']}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
          <Collapse in={this.state.expanded['4']} timeout="auto" unmountOnExit>
            <DocViewer content={dialogDoc} editorType="github" lang="js" />
            <Button
              fullWidth
              context={this.props.context}
              variant="contained"
              colorType="primary"
              text={'Show'}
              onClick={() => this.onClick('dialog')}
            />
          </Collapse>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DialogHelperFixture);
