import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogProps,
  Typography, Link, Alert, Box
} from '@mui/material';
import { usePublishSchema, usePublishPubKey } from "publish";
import { useWizard } from "@formswizard/forms-designer";
import { useRouter } from 'next/router'

export function PrePublishModal() {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  const [published, setPublished] = useState<boolean>(false)
  const [displayPublishButton, setDisplayPublishButton] = useState<boolean>(true)

  const hash = typeof location != 'undefined' ? location.hash.slice(1) : '';
  const hashParameters = !hash ? {} : Object.fromEntries(new URLSearchParams(hash) as any);

  const formId = useMemo(() => hashParameters.formId || crypto.randomUUID(), [hashParameters.formId]);
  const formAdminToken = useMemo(() => hashParameters.formAdminToken || crypto.randomUUID(), [hashParameters.formAdminToken]);
  const dataKey = useMemo(() => crypto.randomUUID(), []);

  const suffix = process.env.NODE_ENV === 'production' ? '.html' : '';
  const urls = {
    new: `#formId=${formId}&formAdminToken=${formAdminToken}`,
    submit: `./submit${suffix}#formId=${formId}`,
    edit: `./edit${suffix}#formId=${formId}&dataKey=${dataKey}`
  };
  const router = useRouter();
  useEffect( () => { router.replace(urls.new)
                           .catch((e) => { // workaround for https://github.com/vercel/next.js/issues/37362
                                           if (!e.cancelled) throw e
                                         })}, [] );

  const {publishPubKey} = usePublishPubKey({formId, formAdminToken})
  const {jsonSchema, uiSchema} = useWizard()  // TODO when reopening a form with hashParameters.formId, we need initialize the formsDesigner-state from the backend
  const {publishSchema} = usePublishSchema({formId, formAdminToken, jsonSchema, uiSchema});

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    setDisplayPublishButton(true)
  };

  const handlePublish = useCallback(() => {
    publishPubKey()
    publishSchema()
    setPublished(true)
    setDisplayPublishButton(false)
  }, [publishPubKey, publishSchema, setPublished])

  const descriptionElementRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
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
                color={'primary'}>{published ? 'erneut ' : ''} veröffentlichen</Button>
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title"> Veröffentlichen...</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            {published ?
                <Box
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}

                    sx={{
                      '& .MuiTypography-root': {
                        mb: 2
                      }
                    }}
                >
                  <Typography variant={'body1'}>
                    {published ? '✅' : ''}  Das Formular wurde veröffentlicht.
                  </Typography>
                  <Typography variant={'body1'}>
                    Die Eingabe der Daten kann unter folgendem Link erfolgen. Er ist dafür gedacht mit den zu Befragenden geteilt zu werden:
                    <br/>
                    <Link target='_blank' href={urls.submit}>Eingabemaske</Link>
                  </Typography>
                  <Typography variant={'body1'}>
                    Zur Auswertung und kollaborativen Weiterbearbeitung der Daten kann folgender Link aufgerufen werden:
                  </Typography>
                  <Alert variant={'outlined'} severity={'warning'}>
                    Besitzer dieses Links haben Einsicht in ALLE erhobenen Daten<br/><br/>
                    <Link target='_blank' href={urls.edit}>Admin-Oberfläche</Link>
                  </Alert>
                  <Typography variant={'body1'}>
                    Das Formular kann jetzt weiter bearbeitet werden. Zum veröffentlichen der Änderungen muss
                    erneut auf den Button "veröffentlichen" geklickt werden.
                  </Typography>
                </Box>
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
                    Auf Basis des Erstellten Formulares wird ein weiterer Link für eine Admin-Oberfläche generiert, über
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
            <Button onClick={handleClose} color={'warning'} variant={published ? 'contained' : 'text'}>{published ? 'schließen' : 'abbrechen'}</Button>
            <Button onClick={handleClose} disabled={true}>als Vorlage speichern</Button>
            <Button onClick={handlePublish} variant={'contained'} color={'primary'}
                    disabled={!displayPublishButton}
            >{(!displayPublishButton && published) ? 'wurde veröffentlicht' : ( ( published ? 'erneut ' : '' ) + 'Veröffentlichen')}</Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}
