(ns formswizard.resolver.example.files.upload
  (:require [reitit.http.interceptors.multipart :as multipart]))

(def route {:post {:summary "upload a file"
                   :parameters {:multipart {:file multipart/temp-file-part}}
                   :responses {200 {:body {:name string?, :size int?}}}
                   :handler (fn [{{{:keys [file]} :multipart} :parameters}]
                              {:status 200
                               :body {:name (:filename file)
                                      :size (:size file)}})}})
