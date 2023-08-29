{ pkgs, formsDesigner, processing }:

let
in pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_latest
    nodePackages_latest.pnpm
    python3
    xdg_utils
  ];
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


    packages-processing/react-redux-yjs/node_modules/y-websocket/bin/server.js &


    (cd apps/demo/out; python -m http.server || true) &
    xdg-open http://localhost:8000/ &


    cd apps/cra

    pnpm dev
    exit
  '';
}
