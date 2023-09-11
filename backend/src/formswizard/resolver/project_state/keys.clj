(ns formswizard.resolver.project-state.keys
  (:require [clojure.spec.alpha :as s]
            [formswizard.model.project-state.api :as api]
            [formswizard.model.project-state.keys :as keys]
            [formswizard.state :as state]
            [formswizard.lib.http :as http]))

(def route
  {:get {:summary "get project-state.keys"
         :parameters {:query (s/keys :req-un [::api/formId])}
         :responses {200 {:body (s/keys :opt-un [::keys/keys])}}
         :handler (fn [{{{:keys [formId]} :query} :parameters}]
                    {:status 200
                     :body (state/getKeys formId)})}
   :post {:summary "set project-state.keys"
          :parameters {:body (s/keys :req-un [::api/formId ::api/formAdminToken ::keys/keys])}
          :responses (merge http/ok-response
                            http/unauthorized-response)
          :handler (fn [{{{:keys [formId formAdminToken keys]} :body} :parameters}]
                     (if (state/authorized? formId formAdminToken)
                       (do (state/setKeys! formId keys)
                           http/ok)
                       http/unauthorized))}})
