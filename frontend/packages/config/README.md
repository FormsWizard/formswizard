# @formswizard/config

This npm-package wraps all runtime `config` options used by other FormsWizard frontend packages.
It provides typescript types and default values.

## Implementation

For now the config is statically build from environment-variables at compile time (of the next or vite application requiring this package).

In future the mechanism of [`swlkup`](https://github.com/johannesloetzsch/swlkup/blob/master/frontend/config.ts) might be used, for loading configuration at runtime.

It would also be nice to do runtime type validation using a JsonSchema.
