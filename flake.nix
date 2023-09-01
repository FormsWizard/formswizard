{
  description = "Forms Wizard";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.05";
    formsDesigner = { url = "github:FormsWizard/forms-designer/main";
                      inputs.nixpkgs.follows = "nixpkgs"; };
    processing = { url = "github:FormsWizard/processing/main";
                   inputs.nixpkgs.follows = "nixpkgs"; };
  };

  outputs = { self, nixpkgs, formsDesigner, processing, ... }:
  let
    system = "x86_64-linux";
    pkgs = import nixpkgs {inherit system;};
    inherit (pkgs) lib;
  in rec {
    devShells.${system} = {
      doc = import ./doc/shell.nix { inherit pkgs; };
    };
    #devShell.${system} = devShells.${system}."doc";  ## will be changed

    packages.${system} = rec {
      ci = import ./.ci { inherit pkgs formsDesigner processing; };
      frontend = import ./frontend { inherit pkgs formsDesigner processing; };
      default = frontend;
    };
  };
}
