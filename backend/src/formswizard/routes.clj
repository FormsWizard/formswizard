(ns formswizard.routes
  (:require [formswizard.resolver.openapi.swagger :as swagger]
            [formswizard.resolver.openapi.openapi :as openapi]
            [formswizard.resolver.project-state.schema :as schema]
            [formswizard.resolver.example.math.plus :as plus]
            [formswizard.resolver.example.math.minus :as minus]
            [formswizard.resolver.example.async :as async]
            [formswizard.resolver.example.files.upload :as upload]
            [formswizard.resolver.example.files.download :as download]
            [formswizard.resolver.example.secure :as secure]))

(def routes
  [["/swagger.json" swagger/route]
   ["/openapi.json" openapi/route]

   ["/project-state"
     ["/schema" schema/route]]
   #_["/math"
    ["/plus" plus/route]
    ["/minus" minus/route]]
   #_["/files"
    ["/upload" upload/route]
    ["/download" download/route]]
   #_["/async" async/route]
   #_["/secure" secure/route]])
