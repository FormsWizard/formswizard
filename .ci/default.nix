{ pkgs, formsDesigner, processing }:

let
in pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_latest
    nodePackages_latest.pnpm
  ];
  shellHook = ''
    set -e
    cd ./frontend/

    echo 'Dependencies are being copied…'
    cp -r ${formsDesigner}/packages packages-forms-designer
    cp -r ${processing}/packages packages-processing
    chmod -R +w packages-*
    
    echo 'Install node dependencies…'
    pnpm i

    echo 'Build node dependencies…'
    pnpm turbo run build --filter='./packages*/*'

    echo 'Building app (next demo build)'
    pnpm turbo run build --filter='./apps/demo'
    touch ./apps/demo/out/.nojekyll

    exit
  '';
}
