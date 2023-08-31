import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogProps,
  Typography
} from '@mui/material';
import {usePublishFormsState} from "publish";

export function PrePublishModal() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  //const { publish } = usePublishFormsState()

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePublish = () => {
    //publish()
  }
  const descriptionElementRef = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    if (open) {
      const {current: descriptionElement} = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
      <div>
        <Button onClick={handleClickOpen('paper')}
                sx={{position: 'absolute', top: '25px', right: '400px', zIndex: 10000}} variant={'inset'}
                color={'primary'}>veröffentlichen</Button>
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Publish</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
            >
              <Typography variant={'body1'}>
                Das eben erstellte Formular kann im folgenden Dialog entweder als Template gespeichert oder
                veröffentlicht werden.
              </Typography>

              <Typography variant={'body1'}>
                Nach der Veröffentlichung kann das Formular über einen Link zur Dateneingabe aufgerufen werden.
              </Typography>
              <Typography variant={'body1'}>
                Auf Basis des Erstellten Formulares wird ein weitere Link für eine Admin-Oberfläche generiert, über die
                die eingegebenen Daten eingesehen und exportiert werden können.
              </Typography>

              Verschiedene Sicherheitsstufen können eingestellt werden, um den Zugriff auf die Daten zu beschränken und
              gegebenenfalls nur bestimmten Personenkreisen den Zugriff auf die eingegebenen Daten zu gewähren.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Abbrechen</Button>
            <Button onClick={handleClose}>als Vorlage</Button>
            <Button onClick={handlePublish}>Veröffentlichen</Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}
