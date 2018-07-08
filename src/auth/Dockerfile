FROM tomcat:8.0

WORKDIR /usr/local/tomcat

COPY AuthSkitter.war $CATALINA_BASE/webapps/

COPY server.xml conf/

EXPOSE 4000