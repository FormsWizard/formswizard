(ns formswizard.resolver.example.files.download
  (:require [clojure.java.io :as io]))

(def route {:get {:summary "downloads a file"
                  :swagger {:produces ["image/png"]}
                  :responses {200 {:description "an image"
                                   #_#_:content {"image/png" {:schema any?}}}}
                  :handler (fn [_]
                             {:status 200
                              :headers {"Content-Type" "image/png"}
                              :body (io/input-stream
                                     (io/resource "reitit.png"))})}})
