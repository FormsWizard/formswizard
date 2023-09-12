(ns formswizard.model.project-state.cryptedData
  (:require [clojure.spec.alpha :as s]))

(s/def ::data string?)  ;; ArmoredPGPMessage
(s/def ::keyId string?)  ;; PGPID
(s/def ::armoredPublicKey string?)  ;; ArmoredPubKey
(s/def ::id string?)

(s/def ::cryptedDatum (s/keys :req-un [::data ::keyId ::armoredPublicKey]))
(s/def ::cryptedDatumWithId (s/keys :req-un [::data ::keyId ::armoredPublicKey ::id]))
(s/def ::cryptedData (s/coll-of ::cryptedDatumWithId))
