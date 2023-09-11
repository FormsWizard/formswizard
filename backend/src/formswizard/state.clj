(ns formswizard.state)

(def state (atom {:cryptedData []}))


;; On first write access (setSchema! or setKeys!) of a form, the formAdminToken will be set.
;; Later write accesses must use the same formAdminToken.
(defn authorized? [formId formAdminToken]
  (if (get @state formId)
    (= formAdminToken (get-in @state [formId :formAdminToken]))
    (swap! state assoc-in [formId :formAdminToken] formAdminToken)))


(defn setSchema! [formId schema]
  (swap! state assoc-in [formId :schema] schema))

(defn getSchema [formId]
  (select-keys (get @state formId) [:schema]))


(defn setKeys! [formId keys]
  (swap! state assoc-in [formId :keys] keys))

(defn getKeys [formId]
  (select-keys (get @state formId) [:keys]))


(defn addCryptedDatum! [formId cryptedDatum]
  (swap! state update-in [formId :cryptedData] conj cryptedDatum))

(defn getCryptedData [formId]
  (select-keys (get @state formId) [:cryptedData]))
