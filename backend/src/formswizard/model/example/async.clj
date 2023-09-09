(ns formswizard.model.example.async
  (:require [clojure.spec.alpha :as s]
            [spec-tools.core :as st]
            [spec-tools.json-schema :as json-schema]))

(s/def ::seed string?)
(s/def ::results
  (st/spec
    {:spec (s/and int? #(< 0 % 100))
     :description "between 1-100"
     :swagger/default 10
     :reason "invalid number"}))

(comment
  (json-schema/transform ::results))
