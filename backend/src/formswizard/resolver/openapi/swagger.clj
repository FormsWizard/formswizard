(ns formswizard.resolver.openapi.swagger
  (:require [reitit.swagger :as swagger]))

(def route
  {:get {:no-doc true
         :swagger {:info {:title "my-api"
                          :description "swagger-docs with reitit-http"
                          :version "0.0.1"}
                   ;; used in /secure APIs below
                   :securityDefinitions {"auth" {:type :apiKey
                                                 :in :header
                                                 :name "Example-Api-Key"}}}
         :handler (swagger/create-swagger-handler)}})

(def swagger-feature swagger/swagger-feature)
