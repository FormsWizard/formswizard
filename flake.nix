{
  description = "Forms Wizard";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.11";
  };

  outputs = { self, nixpkgs, ... }:
  let
    system = "x86_64-linux";
    pkgs = import nixpkgs {inherit system;};
    inherit (pkgs) lib;
  in rec {
    devShells.${system}."doc" = import ./doc/shell.nix { inherit pkgs; };
    #devShell.${system} = devShells.${system}."doc";  ## will be changed

    packages.${system} = { 
      frontend = import ./frontend { inherit pkgs; };
    };
    defaultPackage.${system} = packages.${system}.frontend;
  };
}
