#!/usr/bin/jjs -fv

var version = $ENV.VERSION;
var kubectl = $ENV.KUBECTL;

var name = "battleapp";
var url = "http://disruptor.ninja:30080/battleapp/resources/users";
var timeout = 2;

var deleteDeployment = kubectl + " delete deployment -l name=" + name + ",version!=" + version;
execute(deleteDeployment);

var testUrl = "curl --write-out %{http_code} --silent --output /dev/null " + url + " --max-time " + timeout;
execute(testUrl);
while ($OUT != "200") {
    $EXEC("sleep 1");
    execute(testUrl);
}

function execute(command) {
    $EXEC(command);
    print($OUT);
    print($ERR);
}