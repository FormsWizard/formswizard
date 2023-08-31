import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogProps,
  Typography, List, ListItem, Link
} from '@mui/material';
import {useCallback, useState} from "react";
import {usePublishSchemaToYjs} from "publish";
import {useWizard} from "@formswizard/forms-designer";

export function PrePublishModal() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [published, setPublished] = useState<boolean>(false)
  const {jsonSchema, uiSchema} = useWizard()
  const {publish} = usePublishSchemaToYjs({jsonSchema, uiSchema})
  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePublish = useCallback(() => {
    publish()
    setPublished(true)
  }, [publish, setPublished])
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
                variant={'contained'}
                color={'primary'}>veröffentlichen</Button>
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Veröffentlichen...</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            {published ?
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                  <Typography variant={'body1'}>
                    Das Formular wurde veröffentlicht.
                  </Typography>
                  <Typography variant={'body1'}>
                    Die Eingabe kann unter folgendem Link erfolgen:
                    <br/>
                    <Link target='_blank' href={'/submit'}>Eingabemaske</Link>
                  </Typography>
                  <Typography variant={'body1'}>
                    Die Admin-Oberfläche kann unter folgendem Link aufgerufen werden:
                    <br/>
                    <Link target='_blank' href={'/admin'}>Admin-Oberfläche</Link>
                  </Typography>
                  <Typography variant={'body1'}>
                    Das Formular kann jetzt weiter bearbeitet werden. Zum veröffentlichen der Änderungen muss
                    erneut auf den Button "veröffentlichen" geklickt werden.
                  </Typography>
                </DialogContentText>
                :
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
                    Auf Basis des Erstellten Formulares wird ein weitere Link für eine Admin-Oberfläche generiert, über
                    die
                    die eingegebenen Daten eingesehen und exportiert werden können.
                  </Typography>

                  Verschiedene Sicherheitsstufen können eingestellt werden, um den Zugriff auf die Daten zu beschränken
                  und
                  gegebenenfalls nur bestimmten Personenkreisen den Zugriff auf die eingegebenen Daten zu gewähren.
                </DialogContentText>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color={'warning'}>Abbrechen</Button>
            <Button onClick={handleClose}>als Vorlage speichern</Button>
            <Button onClick={handlePublish} variant={'contained'} color={'primary'}>Veröffentlichen</Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}