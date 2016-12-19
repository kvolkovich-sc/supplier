FROM mysql:latest
MAINTAINER gr4per

RUN apt-get update && apt-get install -qy --no-install-recommends curl && apt-get clean && rm -rf /var/lib/apt/lists/*
ENV MYSQL_ROOT_PASSWORD=1111 MYSQL_DATABASE=bnp

COPY mysql-healthcheck /usr/local/bin/
HEALTHCHECK --interval=10s --retries=9 CMD ["mysql-healthcheck"]

# When the mysql image starts up, its entrypoint script will load anything it sees in the /docker-entrypoint-initdb.d/ dir before starting mysqld.
COPY mysql-startup.sh /docker-entrypoint-initdb.d

RUN chmod 0755 /docker-entrypoint-initdb.d/mysql-startup.sh
USER mysql
EXPOSE 3306
CMD [ "mysqld", "--default-storage-engine=InnoDB", "--character-set-server=utf8", "--collation-server=utf8_bin", "--lower-case-table-names=1" ]

