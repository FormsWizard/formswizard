{
  description = "Forms Wizard";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.11";
    formsDesigner.url = "github:FormsWizard/forms-designer/main";
    processing.url = "github:FormsWizard/processing/main";
  };

  outputs = { self, nixpkgs, formsDesigner, processing, ... }:
  let
    system = "x86_64-linux";
    pkgs = import nixpkgs {inherit system;};
    inherit (pkgs) lib;
  in rec {
    devShells.${system}."doc" = import ./doc/shell.nix { inherit pkgs; };
    #devShell.${system} = devShells.${system}."doc";  ## will be changed

    packages.${system} = { 
      frontend = import ./frontend { inherit pkgs formsDesigner processing; };
    };
    defaultPackage.${system} = packages.${system}.frontend;
  };
}
