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

    ## required for clean build, but slows down -> should be optional
    rm -r node_modules || true
    find packages -name node_modules -exec rm -r {} \; || true


    echo 'Dependencies are being copied…'
    chmod -R +w packages-processing packages-forms-designer
    rm -r packages-processing packages-forms-designer || true
    cp -r ${formsDesigner}/packages packages-forms-designer
    cp -r ${processing}/packages packages-processing
    chmod -R +w packages-processing packages-forms-designer

    pnpm i
    pnpm turbo run build --filter='./packages*/*'

    echo 'chmod -w $EXTERNAL_PACKAGES'
    chmod -R -w packages-processing packages-forms-designer
    find . -name node_modules -exec chmod -R +w {} \;
    find packages-processing packages-forms-designer -name .turbo -exec chmod -R +w {} \;
    find packages-processing packages-forms-designer -name .dist -exec chmod -R +w {} \;


    packages-processing/react-redux-yjs/node_modules/y-websocket/bin/server.js &


    export NEXT_PUBLIC_BACKEND='https://backend.formswizard.winzlieb.eu'
    export NEXT_PUBLIC_SIGNALING='wss://signaling.formswizard.winzlieb.eu'
    export NEXT_PUBLIC_WS='wss://ws.formswizard.winzlieb.eu'


    pnpm turbo run build --filter='./apps/*'
    (cd apps/demo/out; python -m http.server 8080 || true) &
    xdg-open http://localhost:8080/new.html &


    cd apps/demo

    #xdg-open http://localhost:3000/new &
    #pnpm dev
    #exit
  '';
}
