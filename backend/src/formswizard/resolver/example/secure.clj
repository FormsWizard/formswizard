(ns formswizard.resolver.example.secure)

(def route
  [""
    {;:tags ["secure"]
     :openapi {:security [{"auth" []}]}
     :swagger {:security [{"auth" []}]}}
    ["/get"
     {:get {:summary "endpoint authenticated with a header"
            :responses {200 {:body {:secret string?}}
                        401 {:body {:error string?}}}
            :handler (fn [request]
                       ;; In a real app authentication would be handled by middleware
                       (if (= "secret" (get-in request [:headers "example-api-key"]))
                         {:status 200
                          :body {:secret "I am a marmot"}}
                         {:status 401
                          :body {:error "unauthorized"}}))}}]])
