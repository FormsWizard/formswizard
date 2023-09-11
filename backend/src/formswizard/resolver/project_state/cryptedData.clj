(ns formswizard.resolver.project-state.cryptedData
  (:require [clojure.spec.alpha :as s]
            [formswizard.model.project-state.api :as api]
            [formswizard.model.project-state.cryptedData :as cryptedData]
            [formswizard.state :as state]
            [formswizard.lib.http :as http]))

(def route
  {:get {:summary "get project-state.cryptedData"
         :parameters {:query (s/keys :req-un [::api/formId])}
         :responses {200 {:body (s/keys :opt-un [::cryptedData/cryptedData])}}
         :handler (fn [{{{:keys [formId]} :query} :parameters}]
                    {:status 200
                     :body (state/getCryptedData formId)})}
   :post {:summary "add project-state.cryptedData"
          :parameters {:body (s/keys :req-un [::api/formId ::cryptedData/cryptedDatum])}
          :responses http/ok-response
          :handler (fn [{{{:keys [formId cryptedDatum]} :body} :parameters}]
                     (state/addCryptedDatum! formId cryptedDatum)
                     http/ok)}})
