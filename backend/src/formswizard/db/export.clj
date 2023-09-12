(ns formswizard.db.export
  (:require [clojure.pprint :refer [pprint]]
            [clojure.edn]))

(defn all_docs [db_ctx]
  (let [{:keys [sync q_unary]} db_ctx]
       (sync)
       (q_unary '{:find [(pull ?e [*])] :where [[?e :xt/id]]})))

(defn edn->pprint [edn]
  (with-out-str (pprint edn)))

(defn write-edn [file docs]
  (->> (edn->pprint docs)
       (spit file)))

(defn export [file db_ctx]
  (->> (all_docs db_ctx)
       (write-edn file)))

(defn seed [file db_ctx]
  (let [{:keys [tx_sync]} db_ctx]
       (->> (clojure.edn/read-string (slurp file))
            (map (fn [entry] [:xtdb.api/put entry]))
            tx_sync)))
