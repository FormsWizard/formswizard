(ns formswizard.webserver.routes
  (:require [formswizard.resolver.openapi.swagger :as swagger]
            [formswizard.resolver.openapi.openapi :as openapi]
            [formswizard.resolver.project-state.schema :as schema]
            [formswizard.resolver.project-state.keys :as keys]
            [formswizard.resolver.project-state.cryptedData :as cryptedData]))

(def routes
  [["/swagger.json" swagger/route]
   ["/openapi.json" openapi/route]

   ["/project-state"
     ["/schema" schema/route]
     ["/keys" keys/route] 
     ["/cryptedData" cryptedData/route]]])
