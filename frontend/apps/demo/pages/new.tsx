'use client';

import { WizardProvider, MainLayout, useWizard } from '@formswizard/forms-designer'
import { Publish } from 'publish';
import { PrePublishModal } from '../components';

const SomeComponentUsingTheWizardState = () => {
  const { jsonSchema, uiSchema } = useWizard()

  return (
    <>
      <h5>JSON Schema:</h5>
      <code>{JSON.stringify(jsonSchema)}</code>
      <h5>UI Schema:</h5>
      <code>{JSON.stringify(uiSchema || null)}</code>
    </>
  )
}

export default function New() {
  return (
    <WizardProvider>
      <SomeComponentUsingTheWizardState/>
      <Publish/>
      <MainLayout/>
      <PrePublishModal />
    </WizardProvider>
  );
}
