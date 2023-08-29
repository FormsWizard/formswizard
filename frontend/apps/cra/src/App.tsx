import { WizardApp, WizardProvider } from '@formswizard/forms-designer'
import { useAppSelector, selectJsonSchema } from '@formswizard/state'

function Inner() {
  const jsonSchema = useAppSelector(selectJsonSchema)
  console.log({jsonSchema})
  return <></>
}

export const App = () => {
  return <>
    <WizardProvider>
      <Inner/>
    </WizardProvider>
    <WizardApp />
  </>
}
