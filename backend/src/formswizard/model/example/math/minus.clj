(ns formswizard.model.example.math.minus
  (:require [clojure.spec.alpha :as s]))

(s/def ::x int?)
(s/def ::y int?)
(s/def ::total pos-int?)
