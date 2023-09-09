(ns formswizard.state)

(def state (atom {}))

(defn setSchema! [schema]
  (swap! state assoc :schema schema))

(defn getSchema []
  (select-keys @state [:schema]))
