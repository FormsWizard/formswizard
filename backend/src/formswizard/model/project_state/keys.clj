(ns formswizard.model.project-state.keys
  (:require [clojure.spec.alpha :as s]))

(s/def ::pubKey string?)
(s/def ::pubKeys (s/coll-of ::pubKey))

(s/def ::keys (s/keys :req-un [::pubKeys]))
