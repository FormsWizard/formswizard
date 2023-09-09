(ns formswizard.server-test
  (:require [clojure.test :refer [deftest testing is]]
            [formswizard.server :refer [app]]
            [ring.mock.request :refer [request json-body]]
            [clojure.java.io :as io]))

(deftest example-server

  (testing "GET"
    (is (= (-> (request :get "/math/plus?x=20&y=3")
               app :body slurp)
           (-> {:request-method :get :uri "/math/plus" :query-string "x=20&y=3"}
               app :body slurp)
           (-> {:request-method :get :uri "/math/plus" :query-params {:x 20 :y 3}}
               app :body slurp)
           "{\"total\":23}")))

  (testing "POST"
    (is (= (-> (request :post "/math/plus") (json-body {:x 40 :y 2})
               app :body slurp)
           (-> {:request-method :post :uri "/math/plus" :body-params {:x 40 :y 2}}
               app :body slurp)
           "{\"total\":42}")))

  (testing "Download"
    (is (= (-> {:request-method :get :uri "/files/download"}
               app :body (#(slurp % :encoding "ascii")) count)  ;; binary
           (.length (io/file "resources/reitit.png"))
           506325)))

  (testing "Upload"
    (let [file (io/file "resources/reitit.png")
          multipart-temp-file-part {:tempfile file
                                    :size (.length file)
                                    :filename (.getName file)
                                    :content-type "image/png;"}]
         (is (= (-> {:request-method :post :uri "/files/upload" :multipart-params {:file multipart-temp-file-part}}
                    app :body slurp)
                "{\"name\":\"reitit.png\",\"size\":506325}")))))
