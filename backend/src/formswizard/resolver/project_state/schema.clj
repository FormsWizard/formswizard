(ns formswizard.resolver.project-state.schema
  (:require [clojure.spec.alpha :as s]
            [formswizard.model.project-state.api :as api]
            [formswizard.model.project-state.schema :as schema]
            [formswizard.state :as state]
            [formswizard.lib.http :as http]))

(def route
  {:get {:summary "get project-state.schema"
         :parameters {:query (s/keys :req-un [::api/formId])}
         :responses {200 {:body (s/keys :opt-un [::schema/schema])}}
         :handler (fn [{{{:keys [formId]} :query} :parameters}]
                    {:status 200
                     :body (state/getSchema formId)})}
   :post {:summary "set project-state.schema"
          :parameters {:body (s/keys :req-un [::api/formId ::api/formAdminToken ::schema/schema])}
          :responses (merge http/ok-response
                            http/unauthorized-response)
          :handler (fn [{{{:keys [formId formAdminToken schema]} :body} :parameters}]
                     (if (state/authorized? formId formAdminToken)
                       (do (state/setSchema! formId schema)
                           http/ok)
                       http/unauthorized))}})
