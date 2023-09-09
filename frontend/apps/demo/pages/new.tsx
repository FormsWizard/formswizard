'use client';

import {MainLayout, StorelessWizardProvider} from '@formswizard/forms-designer'
import {Provider} from "react-redux";
import {PGPProvider} from 'pgp-provider';
//import {DemoYjsProvider} from 'project-state-demo-yjs';
import {PrePublishModal, PreviewToggle} from '@formswizard/wizard-general';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import {combinedStore} from "@formswizard/wizard-general/src/combinedStore";

export default function New() {
  return (
      <Provider store={combinedStore}>
        {/*<DemoYjsProvider store={combinedStore}>*/}
	<PGPProvider>
          <StorelessWizardProvider>
            <MainLayout appBar={
              <AppBar position="fixed" sx={{zIndex: 10000}}>
                <Toolbar variant="dense">
                  <Grid container spacing={2} justifyContent={'spaces-between'} alignItems={'center'} flex={1}>
                    <Grid item>
                      <Typography variant="h6" component="div">
                        {'Formular Designer'}
                      </Typography>
                    </Grid>
                    <Grid item flex={1}>
                      <PreviewToggle/>
                    </Grid>
                    <Grid item>
                      <PrePublishModal/>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
            }/>
          </StorelessWizardProvider>
	</PGPProvider>
	{/*</DemoYjsProvider>*/}
      </Provider>
  );
}
