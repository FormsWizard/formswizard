(ns formswizard.resolver.openapi.openapi
  (:require [reitit.openapi :as openapi]))

(def route
  {:get {:no-doc true
         :openapi {:info {:title "FormsWizard OpenAPI"
                          :description "openapi3-docs of FormsWizard backend"
                          :version "0.2.0"}
                   ;; used in /secure APIs below
                   :components {:securitySchemes {"auth" {:type :apiKey
                                                          :in :header
                                                          :name "Example-Api-Key"}}}}
         :handler (openapi/create-openapi-handler)}})

(def openapi-feature openapi/openapi-feature)
