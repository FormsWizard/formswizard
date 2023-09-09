(ns formswizard.resolver.openapi.openapi
  (:require [reitit.openapi :as openapi]))

(def route
  {:get {:no-doc true
         :openapi {:info {:title "my-api"
                          :description "openapi3-docs with reitit-http"
                          :version "0.0.1"}
                   ;; used in /secure APIs below
                   :components {:securitySchemes {"auth" {:type :apiKey
                                                          :in :header
                                                          :name "Example-Api-Key"}}}}
         :handler (openapi/create-openapi-handler)}})

(def openapi-feature openapi/openapi-feature)
