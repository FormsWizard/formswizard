(ns formswizard.webserver.state
  (:gen-class)  ;; this Class contains our -main function
  (:require [ring.adapter.jetty]
            [ring.middleware.reload]
            [mount.core :as mount :refer [defstate]]
            [formswizard.config.state]
            [formswizard.webserver.app]))

(defstate ^{:on-reload :noop}  ;; When the app is recompiled, mount should not care, but we use ring.middleware.reload/wrap-reload
  webserver
  :start (do (println (str "Start server at http://localhost:" (:port formswizard.config.state/env)))
             (ring.adapter.jetty/run-jetty (ring.middleware.reload/wrap-reload #'formswizard.webserver.app/app)
                                           {:port (:port formswizard.config.state/env) :join? false}))
  :stop (.stop webserver))
