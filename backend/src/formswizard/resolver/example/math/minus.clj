(ns formswizard.resolver.example.math.minus
  (:require [clojure.spec.alpha :as s]
            [formswizard.model.example.math.minus :as minus]))

(def route
  {:get {:summary "minus with clojure.spec query parameters"
         :parameters {:query (s/keys :req-un [::minus/x ::minus/y])}
         :responses {200 {:body (s/keys :req-un [::minus/total])}}
         :handler (fn [{{{:keys [x y]} :query} :parameters}]
                    {:status 200
                     :body {:total (- x y)}})}
   :post {:summary "minus with clojure.spec body parameters"
          :parameters {:body (s/keys :req-un [::minus/x ::minus/y])}
          :responses {200 {:body (s/keys :req-un [::minus/total])}}
          :handler (fn [{{{:keys [x y]} :body} :parameters}]
                     {:status 200
                      :body {:total (- x y)}})}})
