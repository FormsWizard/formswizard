(ns formswizard.resolver.example.async
  (:require [clojure.spec.alpha :as s]
            [formswizard.model.example.async :as async]
            [aleph.http :as aleph]
            [muuntaja.core :as m]
            [manifold.deferred :as d]))

(def route {:get {;:tags ["async"]
                  :summary "fetches random users asynchronously over the internet"
                  :parameters {:query (s/keys :req-un [::async/results] :opt-un [::async/seed])}
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
                                 :body results})))}})
