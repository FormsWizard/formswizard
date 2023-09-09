(ns formswizard.routes
  (:require [formswizard.resolver.openapi.swagger :as swagger]
            [formswizard.resolver.openapi.openapi :as openapi]
            [formswizard.resolver.example.math.plus :as plus]
            [formswizard.resolver.example.math.minus :as minus]
            [formswizard.resolver.example.async :as async]
            [formswizard.resolver.example.files.upload :as upload]
            [formswizard.resolver.example.files.download :as download]
            [formswizard.resolver.example.secure :as secure]))

(def routes
  [["/swagger.json" swagger/route]
   ["/openapi.json" openapi/route]

   ["/math"
    ["/plus" plus/route]
    ["/minus" minus/route]]
   ["/files"
    ["/upload" upload/route]
    ["/download" download/route]]
   ["/async" async/route]
   ["/secure" secure/route]])
