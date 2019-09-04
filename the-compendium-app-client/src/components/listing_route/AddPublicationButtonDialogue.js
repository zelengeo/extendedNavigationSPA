import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  button: {
    margin: `${theme.spacing(2)}px 0`,
    alignSelf: 'flex-start'
  },
  iconLeft: {
    marginRight: theme.spacing(1)
  }
}));

function AddPublicationButtonDialogue({ saveData }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function closeDialogue() {
    setOpen(false);
  }

  function openDialogue() {
    setOpen(true);
  }

  let titleRef;
  let contentRef;

  function saveDialogueData(event, ...args) {
    console.log('Data', event.target, args, titleRef, contentRef);
    closeDialogue();
  }

  return (
    <React.Fragment>
      <Button variant="contained" className={classes.button} color="primary" onClick={openDialogue}>
        <AddIcon className={classes.iconLeft} />
        <Typography align="center" variant="button">
          Add publication
        </Typography>
      </Button>
      <Dialog
        open={open}
        fullWidth
        maxWidth="xl"
        onClose={closeDialogue}
        aria-labelledby="add-publication-dialog-title"
      >
        <DialogTitle id="add-publication-dialog-title">Add Publication</DialogTitle>
        <DialogContent>
          <DialogContentText color="primary">Write your content here:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title-input"
            label="Publication title"
            type="text"
            inputRef={ref => (titleRef = ref)}
          />
          <TextField
            margin="dense"
            id="content-input"
            label="Publication content"
            multiline
            rows={10}
            inputRef={ref => (contentRef = ref)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={saveDialogueData} color="primary" variant="contained">
            Save
          </Button>
          <Button onClick={closeDialogue} color="default">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

AddPublicationButtonDialogue.defaultProps = {
  saveData: (...args) => console.log('Arguments: ', args)
};

AddPublicationButtonDialogue.propTypes = {
  saveData: PropTypes.func
};

export default AddPublicationButtonDialogue;
