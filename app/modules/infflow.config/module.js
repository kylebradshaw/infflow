(function(){
  'use strict';

  angular
      .module('infflow.config', [])
      .constant('OAUTH_ID', 'ip8GGZAZ6s2cC6DQOM-a6fnZkCo')
      // .constant('IP_URL', 'http://jsonip.appspot.com/?callback=getip');
      .constant('IP_URL', 'http://api.hostip.info/get_html.php')
      .constant('GEO_URL', 'http://freegeoip.net/json/:ipAddress/?callback=JSON_CALLBACK');

}());
