(ns formswizard.model.project-state.cryptedData
  (:require [clojure.spec.alpha :as s]))

(s/def ::data string?)  ;; ArmoredPGPMessage
(s/def ::uuid string?)  ;; UUID
(s/def ::keyId string?)  ;; PGPID
(s/def ::armoredPublicKey string?)  ;; ArmoredPubKey

(s/def ::cryptedDatum (s/keys :req-un [::data ::uuid ::keyId ::armoredPublicKey]))
(s/def ::cryptedData (s/coll-of ::cryptedDatum))
