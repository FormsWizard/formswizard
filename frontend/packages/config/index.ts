type Url = string;

type FormsWizardConfig = {
  server: {
    backend: Url
    signaling: Url
    ws: Url
  },
  feature: {
    developerMode: Boolean
  }
}

export const config: FormsWizardConfig = {
  server: {
    backend: process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:4000',
    signaling: process.env.NEXT_PUBLIC_SIGNALING || 'ws://localhost:4444',
    ws: process.env.NEXT_PUBLIC_WS || 'ws://localhost:1234'
  },
  feature: {
    developerMode: String(process.env.NEXT_PUBLIC_DEVELOPER_MODE).toLowerCase() === 'true'
  }
}
