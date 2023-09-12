(ns formswizard.state
  (:require [formswizard.db.state :refer [db_ctx]]
            [formswizard.model.project-state.keys :as keys]
            [formswizard.model.project-state.schema :as schema]
            [formswizard.model.project-state.cryptedData :as cryptedData]
            [formswizard.model.project-state.api :as api]))

;(def state (atom {:cryptedData []}))


;; On first write access (setSchema! or setKeys!) of a form, the formAdminToken will be set.
;; Later write accesses must use the same formAdminToken.
(defn authorized? [formId formAdminToken]
  ;(if (get @state formId)
  ;  (= formAdminToken (get-in @state [formId :formAdminToken]))
  ;  (swap! state assoc-in [formId :formAdminToken] formAdminToken))
  (let [correctFormAdminToken (:formAdminToken
                                ((:q_id_unary db_ctx) '{:find [(pull ?e [:formAdminToken])]
                                                        :where [[?e :xt/spec ::api/formAdminTokenRecord]
                                                                [?e :formId ?formId]]
                                                        :in [?formId]}
                                                      formId))]
       (if correctFormAdminToken
           (= formAdminToken correctFormAdminToken)
           ((:tx db_ctx) [[:xtdb.api/put {:xt/id (str "formAdminToken_" formId)
                                          :xt/spec ::api/formAdminTokenRecord
                                          :formId formId
                                          :formAdminToken formAdminToken}]]))))


(defn setSchema! [formId schema]
  ;(swap! state assoc-in [formId :schema] schema)
  ((:tx db_ctx) [[:xtdb.api/put (assoc schema
                                       :xt/id (str "schema_" formId)
                                       :xt/spec ::schema/schema
                                       :formId formId)]]))

(defn getSchema [formId]
  ;(select-keys (get @state formId) [:schema])
  {:schema ((:q_id_unary db_ctx) '{:find [(pull ?e [*])]
                                   :where [[?e :xt/spec ::schema/schema]
                                           [?e :formId ?formId]]
                                   :in [?formId]}
                                 formId)})


(defn setKeys! [formId keys]
  ;(swap! state assoc-in [formId :keys] keys))
  ((:tx db_ctx) [[:xtdb.api/put (assoc keys
                                       :xt/id (str "keys_" formId)
                                       :xt/spec ::keys/keys
                                       :formId formId)]]))

(defn getKeys [formId]
  ;(select-keys (get @state formId) [:keys])
  {:keys ((:q_id_unary db_ctx) '{:find [(pull ?e [*])]
                                 :where [[?e :xt/spec ::keys/keys]
                                         [?e :formId ?formId]]
                                 :in [?formId]}
                               formId)})


(defn addCryptedDatum! [formId cryptedDatum]
  ;(swap! state update-in [formId :cryptedData] conj cryptedDatum)
  ((:tx db_ctx) [[:xtdb.api/put (assoc cryptedDatum
                                       :xt/id (str "cryptedDatum_" (:uuid cryptedDatum))
                                       :xt/spec ::cryptedData/cryptedDatum
                                       :formId formId)]]))

(defn getCryptedData [formId]
  ;(select-keys (get @state formId) [:cryptedData])
  {:cryptedData ((:q_unary db_ctx) '{:find [(pull ?e [*])]
                                     :where [[?e :xt/spec ::cryptedData/cryptedDatum]
                                             [?e :formId ?formId]]
                                     :in [?formId]}
                                   formId)})
