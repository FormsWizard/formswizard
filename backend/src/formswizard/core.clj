(ns formswizard.core
  (:require [formswizard.server :as server]))

(defn -main [& args]
  (server/start))
