(ns formswizard.server
  (:require [reitit.ring :as ring]
            [reitit.http :as http]
            [reitit.coercion.spec]
            [reitit.swagger :as swagger]
            [reitit.swagger-ui :as swagger-ui]
            [reitit.openapi :as openapi]
            [reitit.http.coercion :as coercion]
            [reitit.dev.pretty :as pretty]
            [reitit.interceptor.sieppari :as sieppari]
            [reitit.http.interceptors.parameters :as parameters]
            [reitit.http.interceptors.muuntaja :as muuntaja]
            [reitit.http.interceptors.exception :as exception]
            [reitit.http.interceptors.multipart :as multipart]
            [reitit.http.interceptors.dev :as dev]
            [reitit.http.spec :as spec]
            [spec-tools.spell :as spell]
            [ring.adapter.jetty :as jetty]
            [aleph.http :as aleph]
            [muuntaja.core :as m]
            [clojure.java.io :as io]
            [clojure.spec.alpha :as s]
            [spec-tools.core :as st]
            [sieppari.async.manifold]
            [manifold.deferred :as d]))

(s/def ::x int?)
(s/def ::y int?)
(s/def ::total pos-int?)

(s/def ::seed string?)
(s/def ::results
  (st/spec
    {:spec (s/and int? #(< 0 % 100))
     :description "between 1-100"
     :swagger/default 10
     :reason "invalid number"}))

(def app
  (http/ring-handler
   (http/router
    [["/swagger.json"
      {:get {:no-doc true
             :swagger {:info {:title "my-api"
                              :description "swagger-docs with reitit-http"
                              :version "0.0.1"}
                       ;; used in /secure APIs below
                       :securityDefinitions {"auth" {:type :apiKey
                                                     :in :header
                                                     :name "Example-Api-Key"}}}
             :handler (swagger/create-swagger-handler)}}]
     ["/openapi.json"
      {:get {:no-doc true
             :openapi {:info {:title "my-api"
                              :description "openapi3-docs with reitit-http"
                              :version "0.0.1"}
                       ;; used in /secure APIs below
                       :components {:securitySchemes {"auth" {:type :apiKey
                                                              :in :header
                                                              :name "Example-Api-Key"}}}}
             :handler (openapi/create-openapi-handler)}}]

     ["/files"
      ;{:tags ["files"]}

      ["/upload"
       {:post {:summary "upload a file"
               :parameters {:multipart {:file multipart/temp-file-part}}
               :responses {200 {:body {:name string?, :size int?}}}
               :handler (fn [{{{:keys [file]} :multipart} :parameters}]
                          {:status 200
                           :body {:name (:filename file)
                                  :size (:size file)}})}}]

      ["/download"
       {:get {:summary "downloads a file"
              :swagger {:produces ["image/png"]}
              :responses {200 {:description "an image"
                               #_#_:content {"image/png" {:schema any?}}}}
              :handler (fn [_]
                         {:status 200
                          :headers {"Content-Type" "image/png"}
                          :body (io/input-stream
                                 (io/resource "reitit.png"))})}}]]

     ["/async"
      {:get {;:tags ["async"]
             :summary "fetches random users asynchronously over the internet"
             :parameters {:query (s/keys :req-un [::results] :opt-un [::seed])}
             :responses {200 {:body any?}}
             :handler (fn [{{{:keys [seed results]} :query} :parameters}]
                        (d/chain
                         (aleph/get
                          "https://randomuser.me/api/"
                          {:query-params {:seed seed, :results results}})
                         :body
                         (partial m/decode "application/json")
                         :results
                         (fn [results]
                           {:status 200
                            :body results})))}}]

     ["/math"
      ;{:tags ["math"]}

      ["/plus"
       {:get {:summary "plus with data-spec query parameters"
              :parameters {:query {:x int?, :y int?}}
              :responses {200 {:body {:total pos-int?}}}
              :handler (fn [{{{:keys [x y]} :query} :parameters}]
                         {:status 200
                          :body {:total (+ x y)}})}
        :post {:summary "plus with data-spec body parameters"
               ;; OpenAPI3 named examples for request & response
               :openapi {:requestBody
                         {:content
                          {"application/json"
                           {:examples {"add-one-one" {:summary "1+1"
                                                      :value {:x 1 :y 1}}
                                       "add-one-two" {:summary "1+2"
                                                      :value {:x 1 :y 2}}}}}}
                         :responses
                         {200
                          {:content
                           {"application/json"
                            {:examples {"two" {:summary "2"
                                               :value {:total 2}}
                                        "three" {:summary "3"
                                                 :value {:total 3}}}}}}}}
               :parameters {:body {:x int?, :y int?}}
               :responses {200 {:body {:total int?}}}
               :handler (fn [{{{:keys [x y]} :body} :parameters}]
                          {:status 200
                           :body {:total (+ x y)}})}}]

      ["/minus"
       {:get {:summary "minus with clojure.spec query parameters"
              :parameters {:query (s/keys :req-un [::x ::y])}
              :responses {200 {:body (s/keys :req-un [::total])}}
              :handler (fn [{{{:keys [x y]} :query} :parameters}]
                         {:status 200
                          :body {:total (- x y)}})}
        :post {:summary "minus with clojure.spec body parameters"
               :parameters {:body (s/keys :req-un [::x ::y])}
               :responses {200 {:body (s/keys :req-un [::total])}}
               :handler (fn [{{{:keys [x y]} :body} :parameters}]
                          {:status 200
                           :body {:total (- x y)}})}}]]
     ["/secure"
      {;:tags ["secure"]
       :openapi {:security [{"auth" []}]}
       :swagger {:security [{"auth" []}]}}
      ["/get"
       {:get {:summary "endpoint authenticated with a header"
              :responses {200 {:body {:secret string?}}
                          401 {:body {:error string?}}}
              :handler (fn [request]
                         ;; In a real app authentication would be handled by middleware
                         (if (= "secret" (get-in request [:headers "example-api-key"]))
                           {:status 200
                            :body {:secret "I am a marmot"}}
                           {:status 401
                            :body {:error "unauthorized"}}))}}]]]

    {:reitit.interceptor/transform dev/print-context-diffs ;; pretty context diffs
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
                           (multipart/multipart-interceptor)]}})
   (ring/routes
    (swagger-ui/create-swagger-ui-handler
     {:path "/"
      :config {:validatorUrl nil
               :urls [{:name "swagger", :url "swagger.json"}
                      {:name "openapi", :url "openapi.json"}]
               :urls.primaryName "openapi"
               :operationsSorter "alpha"}})
    (ring/create-default-handler))
   {:executor sieppari/executor}))

(defn start []
  (let [port 4000]
       (jetty/run-jetty #'app {:port port, :join? false})
       (println "server running at port" port)))
