(ns formswizard.server
  (:require [reitit.ring :as ring]
            [reitit.http :as http]
            [reitit.coercion.spec]
            [reitit.swagger-ui :as swagger-ui]
            [reitit.http.coercion :as coercion]
            [reitit.dev.pretty :as pretty]
            [reitit.interceptor.sieppari :as sieppari]
            [reitit.http.interceptors.parameters :as parameters]
            [reitit.http.interceptors.muuntaja :as muuntaja]
            [reitit.http.interceptors.exception :as exception]
            [reitit.http.interceptors.dev :as dev]
            [reitit.http.interceptors.multipart :as multipart]
            [reitit.http.spec :as spec]
            [spec-tools.spell :as spell]
            [ring.adapter.jetty :as jetty]
            [muuntaja.core :as m]            
            [sieppari.async.manifold]
            [formswizard.routes :refer [routes]]
            [formswizard.resolver.openapi.swagger :as swagger]
            [formswizard.resolver.openapi.openapi :as openapi]
            [simple-cors.reitit.interceptor :as cors]))

(def cors-config {:cors-config {:allowed-request-methods [:post :put :get]
                                :allowed-request-headers ["Authorization" "Content-Type"]
                                :origins ["http://localhost:4000" "http://localhost:3000" "http://localhost:3001" "http://localhost:3002" "http://localhost:6006" "http://localhost:8080"
                                          "https://formswizard.github.io" "https://formswizard.afg.mission-lifeline.de"]  ;; TODO from config
                                :max-age 300}})

(def app
  (http/ring-handler
   (http/router
    routes
    {:reitit.http/default-options-endpoint (cors/make-default-options-endpoint cors-config)
     :reitit.interceptor/transform dev/print-context-diffs ;; pretty context diffs
     :validate spec/validate ;; enable spec validation for route data
     :reitit.spec/wrap spell/closed ;; strict top-level validation
     :exception pretty/exception
     :data {:coercion reitit.coercion.spec/coercion
            :muuntaja m/instance
            :interceptors [;; swagger feature
                           swagger/swagger-feature
                           ;; openapi feature
                           openapi/openapi-feature
                           ;; query-params & form-params
                           (parameters/parameters-interceptor)
                           ;; content-negotiation
                           (muuntaja/format-negotiate-interceptor)
                           ;; encoding response body
                           (muuntaja/format-response-interceptor)
                           ;; exception handling
                           (exception/exception-interceptor)
                           ;; decoding request body
                           (muuntaja/format-request-interceptor)
                           ;; coercing response bodys
                           (coercion/coerce-response-interceptor)
                           ;; coercing request parameters
                           (coercion/coerce-request-interceptor)
                           ;; multipart
                           (multipart/multipart-interceptor)
                          ]}})
   (ring/routes
    (swagger-ui/create-swagger-ui-handler
     {:path "/"
      :config {:validatorUrl nil
               :urls [{:name "swagger", :url "swagger.json"}
                      {:name "openapi", :url "openapi.json"}]
               :urls.primaryName "openapi"
               :operationsSorter "alpha"}})
    (ring/create-default-handler))
   {:executor sieppari/executor
    :interceptors [(cors/cors-interceptor cors-config)]}))

(defn start []
  (let [port 4000]
       (jetty/run-jetty #'app {:port port, :join? false})
       (println "server running at port" port)))
