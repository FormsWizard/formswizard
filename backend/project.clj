(defproject formswizard "0.2.4" #_"-SNAPSHOT"
  :description "FormsWizard backend based on clojure+reitit+xtdb"
  :url "https://github.com/FormsWizard/formswizard"
  :license {:name "EPL-2.0 OR GPL-2.0-or-later WITH Classpath-exception-2.0"
            :url "https://www.eclipse.org/legal/epl-2.0/"}
  :dependencies [;; core
                 [org.clojure/clojure "1.11.1"]
                 [yogthos/config "1.2.0"]
                 [mount "0.1.17"]
                 [spootnik/signal "0.2.4"]
                 ;; http
                 [ring/ring-jetty-adapter "1.10.0"]
                 [ring/ring-devel "1.10.0"]
                 [metosin/reitit "0.7.0-alpha5"]
                 [metosin/ring-swagger-ui "5.0.0-alpha.0"]
                 [metosin/spec-tools "0.10.6"]
                 [zerg000000/simple-cors "0.0.8"]
                 [aleph "0.6.3"]
                 ;; db
                 [com.xtdb/xtdb-core "1.24.0"]
                 [com.xtdb/xtdb-rocksdb "1.24.0"]]
  :main formswizard.core
  :profiles {:dev {:dependencies [[ring/ring-mock "0.4.0"]]}
             :test {:jvm-opts ["-Ddb-inmemory=true" "-Ddb-export-prefix="]}
             :uberjar {:aot :all}})
