(ns formswizard.resolver.project-state.keys
  (:require [clojure.spec.alpha :as s]
            [formswizard.model.project-state.keys :as keys]
            [formswizard.state :as state]
            [formswizard.lib.http :as http]))

(def route
  {:get {:summary "get project-state.keys"
         :parameters {:query (s/keys :req-un [])}
         :responses {200 {:body (s/keys :opt-un [::keys/keys])}}
         :handler (fn [{{{:keys []} :query} :parameters}]
                    {:status 200
                     :body (state/getKeys)})}
   :post {:summary "set project-state.keys"
          :parameters {:body (s/keys :req-un [::keys/keys])}
          :responses http/ok-response
          :handler (fn [{{{:keys [keys]} :body} :parameters}]
                     (state/setKeys! keys)
                     http/ok)}})
