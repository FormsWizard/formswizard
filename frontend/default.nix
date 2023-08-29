{ pkgs, formsDesigner, processing }:

let
in pkgs.mkShell {
  shellHook = ''
    set -e

    cd frontend

    echo Dependencies are being copied…
    rm -r packages-forms-designer || true
    rm -r packages-processing || true
    cp -r ${formsDesigner}/packages packages-forms-designer
    cp -r ${processing}/packages packages-processing
    chmod -R +w packages-forms-designer
    chmod -R +w packages-processing
    rm -r packages-forms-designer/tsconfig
    rm -r packages-forms-designer/eslint-config-custom

    pnpm i
    pnpm build


    cd apps/cra

    pnpm dev
    exit
  '';
}
