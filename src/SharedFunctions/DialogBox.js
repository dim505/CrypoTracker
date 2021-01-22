import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";


//component used to act as a template for dialog boxes 
export default class DialogBox extends Component {
  render() {
    return (
      <Dialog
        open={this.props.OpnSaveWarningBox}
        onClose={() => this.props.CloseSaveWarnBox()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"!!! WARNING !!!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.CloseSaveWarnBox()} color="primary">
            NO
          </Button>
          <Button onClick={e => this.props.Save(e)} color="primary" autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
