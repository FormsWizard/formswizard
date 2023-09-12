(ns formswizard.config.state
  "Wrapping yogthos/config with defstate allows overwriting the config at runtime and checking it at startup against a spec"
  (:require [clojure.spec.alpha :as s]
            [mount.core :refer [defstate args]]
            [config.core]
            [clojure.string]))

(s/def ::verbose boolean?)

(s/def ::port number?)  ;; the webserver port

(s/def ::db-inmemory boolean?)  ;; we run unit tests in an in-memory instance, otherwise the default db would be looked
(s/def ::db-dir string?)  ;; ignored when ::db-inmemory
(s/def ::db-seed string?)  ;; an edn-file to be used for seeding
(s/def ::db-export-prefix (s/nilable string?))  ;; path where during startup an export should be written
(s/def ::db-validate boolean?)

(s/def ::frontend-base-url string?)
(s/def ::frontend-backend-base-url string?)

(s/def ::env (s/keys :req-un [::verbose
                              ::port
                              ::db-inmemory ::db-dir
                              ::db-export-prefix
                              ::db-validate
                              ::frontend-base-url
                              ::frontend-backend-base-url]
                     :opt-un [::db-seed ]))

(defn strip-secrets [env]
  env
  #_(assoc env :example-secret "*"))

(defn filter-defined [keys-spec m]
  (let [req-un (nth (s/form keys-spec) 2)
        opt-un (nth (s/form keys-spec) 4)
        unnamespaced-keys (map #(-> (clojure.string/replace %
                                                            (if-let [n (namespace %)]
                                                                    (str n "/")
                                                                    "")
                                                            "")
                                    (clojure.string/replace ":" "")
                                    keyword)
                               (concat req-un opt-un))]
       (select-keys m (into [] unnamespaced-keys))))

(defstate env
  :start (let [env (->> (merge (config.core/load-env)
                               (args))  ;; allows: (mount/start-with-args {…})
                        (filter-defined ::env))
               config-errors (s/explain-data ::env env)]
              (when (:verbose env)
                    (println (strip-secrets env)))
              (assert (not config-errors) (with-out-str (s/explain-out config-errors)))
              env))
