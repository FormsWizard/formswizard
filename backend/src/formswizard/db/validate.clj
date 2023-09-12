(ns formswizard.db.validate
  (:require [clojure.spec.alpha :as s]
            [formswizard.db.export :refer [all_docs write-edn]]
            [clojure.pprint :refer [pprint]]))

(defn validate
  "Validate a xtdb-document or a collection of documents.
   When not conforming to the spec, an explaination is associated."
  [doc]
  (if (map? doc)
      (when-not (:xt/fn doc)
                (let [spec (:xt/spec doc)]
                     (when-not spec
                               (println ":xt/spec must not be empty!" doc))
                     (if (s/valid? spec doc)
                         doc
                         (assoc doc :explain (s/explain-data spec doc)))))
      (map validate doc)))

(defn validate-db
  "Validate the database.
   The db_ctx is only returned, when all documents have been confirmed."
  [db_ctx]
  (let [validated-docs (validate (all_docs db_ctx))
        errors (filter :explain validated-docs)
        file "/tmp/validation-errors"]
       (if (not-empty errors)
           (do
             (println "There have been validation errors in" (count errors) "database documents.")
             (println "It seems that the latest update changed this specs:" (into [] (keys (group-by :xt/spec errors))))
             (write-edn file errors)
             (println "Details have been written to:" file))
           db_ctx)))

(defn validate-tx
  "Validate docs before they are written to the database."
  [tx-ops]
  (let [docs (->> tx-ops
                  (filter #(= :xtdb.api/put (first %)))
                  (map second))
        errors (filter :explain (validate docs))]
       (if (not-empty errors)
           (do (println "Transaction canceled due to validiation errors:")
               (pprint errors))
           tx-ops)))
