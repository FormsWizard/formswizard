(ns formswizard.resolver.example.math.plus)

(def route
  {:get {:summary "plus with data-spec query parameters"
         :parameters {:query {:x int?, :y int?}}
         :responses {200 {:body {:total pos-int?}}}
         :handler (fn [{{{:keys [x y]} :query} :parameters}]
                    {:status 200
                     :body {:total (+ x y)}})}
   :post {:summary "plus with data-spec body parameters"
          ;; OpenAPI3 named examples for request & response
          :openapi {:requestBody
                    {:content
                     {"application/json"
                      {:examples {"add-one-one" {:summary "1+1"
                                                 :value {:x 1 :y 1}}
                                  "add-one-two" {:summary "1+2"
                                                 :value {:x 1 :y 2}}}}}}
                    :responses
                    {200
                     {:content
                      {"application/json"
                       {:examples {"two" {:summary "2"
                                          :value {:total 2}}
                                   "three" {:summary "3"
                                            :value {:total 3}}}}}}}}
          :parameters {:body {:x int?, :y int?}}
          :responses {200 {:body {:total int?}}}
          :handler (fn [{{{:keys [x y]} :body} :parameters}]
                     {:status 200
                      :body {:total (+ x y)}})}})
