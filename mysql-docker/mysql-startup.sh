#!/bin/bash

SED="$(which sed)"
AWK="$(which awk)"
CAT="$(which cat)"

$SED '/dockerhost$/d' /etc/hosts > /etc/hosts.tmp

DOCKERHOST="$(printf "%d." $(
  echo $($AWK '$2 == "00000000" {print $3}' /proc/net/route) | $SED 's/../0x& /g' | tr ' ' '\n' | tac
  ) | $SED 's/\.$/\n/')"

echo "$DOCKERHOST dockerhost" >> /etc/hosts.tmp
$CAT /etc/hosts.tmp > /etc/hosts
rm -rf /etc/hosts.tmp

#######################################################################

curl -X PUT -d "$MYSQL_ROOT_PASSWORD" -ssf http://$DOCKERHOST:8500/v1/kv/MYSQL_PASSWORD
curl -X PUT -d "$MYSQL_DATABASE" -ssf http://$DOCKERHOST:8500/v1/kv/MYSQL_DATABASE
curl -X PUT -d 'root' -ssf http://$DOCKERHOST:8500/v1/kv/MYSQL_USER

