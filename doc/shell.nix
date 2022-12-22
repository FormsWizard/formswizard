{ pkgs }:

pkgs.mkShell {
  name = "Build and serve docs";

  packages = with pkgs; [ mdbook mdbook-mermaid ];

  shellHook = ''
    cd $(git rev-parse --show-toplevel)/doc
    mdbook-mermaid install
    mdbook serve --port 3333 --open
  '';
}
