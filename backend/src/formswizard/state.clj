(ns formswizard.state)

(def state (atom {:cryptedData []}))


(defn setSchema! [schema]
  (swap! state assoc :schema schema))

(defn getSchema []
  (select-keys @state [:schema]))


(defn setKeys! [keys]
  (swap! state assoc :keys keys))

(defn getKeys []
  (select-keys @state [:keys]))


(defn addCryptedDatum! [cryptedDatum]
  (swap! state update :cryptedData conj cryptedDatum))

(defn getCryptedData []
  (select-keys @state [:cryptedData]))
