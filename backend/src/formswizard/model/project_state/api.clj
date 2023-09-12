(ns formswizard.model.project-state.api
  (:require [clojure.spec.alpha :as s]))

(s/def ::formId string?)  ;; References the form; enables submission
(s/def ::formAdminToken string?)  ;; Grants write permissions for updating the forms and adding pubKeys
                                  ;; Must be keeped secret between admins and server, to prevent denial-of-service
                                  ;; PubKeys will also be signed (keyId of author is part of link) and checked clientside, so server can't manipulate pubKeys (TODO)
(s/def ::formAdminTokenRecord (s/keys :req-un [::formAdminToken]))
