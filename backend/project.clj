(defproject formswizard "0.1.0-SNAPSHOT"
  :description "FormsWizard backend based on clojure+reitit+xtdb"
  :url "https://github.com/FormsWizard/formswizard"
  :license {:name "EPL-2.0 OR GPL-2.0-or-later WITH Classpath-exception-2.0"
            :url "https://www.eclipse.org/legal/epl-2.0/"}
  :dependencies [[org.clojure/clojure "1.11.1"]
                 [ring/ring-jetty-adapter "1.10.0"]
                 [metosin/reitit "0.7.0-alpha5"]
                 [metosin/ring-swagger-ui "5.0.0-alpha.0"]
                 [metosin/spec-tools "0.10.6"]
                 [aleph "0.6.3"]]
  :main formswizard.core/-main
  :repl-options {:init-ns formswizard.core}
  :profiles {:dev {:dependencies [[ring/ring-mock "0.4.0"]]}})
