(ns formswizard.resolver.openapi.swagger
  (:require [reitit.swagger :as swagger]))

(def route
  {:get {:no-doc true
         :swagger {:info {:title "FormsWizard SwaggerAPI"
                          :description "swagger-docs of FormsWizard backend"
                          :version "0.2.4"}
                   ;; used in /secure APIs below
                   :securityDefinitions {"auth" {:type :apiKey
                                                 :in :header
                                                 :name "Example-Api-Key"}}}
         :handler (swagger/create-swagger-handler)}})

(def swagger-feature swagger/swagger-feature)
