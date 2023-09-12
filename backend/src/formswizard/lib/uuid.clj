(ns formswizard.lib.uuid)

(defn uuid []
  (str (java.util.UUID/randomUUID)))
