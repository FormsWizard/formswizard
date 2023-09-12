(ns formswizard.core
  (:require [mount.core :as mount]
            [signal.handler :refer [with-handler]]
            [formswizard.webserver.state :as server]))

(defn -main [& _args]
  (mount/start)

  (let [finaly (fn [] (mount/stop)  ;; Export the database
                      (System/exit 0))]
       (with-handler :term (finaly))  ;; kill
       (with-handler :int (finaly)))  ;; Ctrl+C

  (mount.core/running-states))  ;; Return value for debugging when called on repl
