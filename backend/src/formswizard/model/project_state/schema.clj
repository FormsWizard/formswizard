(ns formswizard.model.project-state.schema
  (:require [clojure.spec.alpha :as s]))

(s/def ::jsonSchema any?)
(s/def ::uiSchema any?)

(s/def ::schema (s/keys :req-un [::jsonSchema ::uiSchema]))
