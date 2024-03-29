(ns formswizard.lib.http
  (:require [clojure.spec.alpha :as s]))

(s/def :ok/result #{"ok"})
(s/def ::ok (s/keys :req-un [:ok/result]))
(def ok-response {200 {:body ::ok}})
(def ok {:status 200
         :body {:result "ok"}})

(s/def :unauthorized/result #{"unauthorized"})
(s/def ::unauthorized (s/keys :req-un [:unauthorized/result]))
(def unauthorized-response {401 {:body ::unauthorized}})
(def unauthorized {:status 401
                   :body {:result "unauthorized"}})
