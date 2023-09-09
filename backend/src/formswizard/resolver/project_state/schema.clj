(ns formswizard.resolver.project-state.schema
  (:require [clojure.spec.alpha :as s]
            [formswizard.model.project-state.schema :as schema]
            [formswizard.state :as state]
            [formswizard.lib.http :as http]))

(def route
  {:get {:summary "get project-state.schema"
         :parameters {:query (s/keys :req-un [])}
         :responses {200 {:body (s/keys :opt-un [::schema/schema])}}
         :handler (fn [{{{:keys []} :query} :parameters}]
                    {:status 200
                     :body (state/getSchema)})}
   :post {:summary "set project-state.schema"
          :parameters {:body (s/keys :req-un [::schema/schema])}
          :responses http/ok-response
          :handler (fn [{{{:keys [schema]} :body} :parameters}]
                     (state/setSchema! schema)
                     http/ok)}})
