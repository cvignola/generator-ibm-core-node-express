"use strict"
module.exports = JSON.stringify({
  "analytics": {
    "apiKey": "analytics-api-key",
    "serviceInfo": {
      "label": "analytics-serviceinfo-label",
      "name": "mobile-analytics_Prod",
      "plan": "analytics-serviceinfo-plan"
    }
  },
  "appid": {
    "clientId": "appid-client-id",
    "oauthServerUrl": "https://appid-oauth-server-url.com",
    "profilesUrl": "https://appid-profiles-url.com",
    "secret": "appid-secret",
    "tenantId": "appid-tenantid",
    "serviceInfo": {
      "label": "appid-serviceinfo-label",
      "name": "AdvancedMobileAccess",
      "plan": "appid-serviceinfo-plan"
    },
  },
  "auth": {
    "tenantId": "auth-tenantid",
    "serviceInfo": {
      "label": "auth-serviceinfo-label",
      "name": "auth-serviceinfo-name",
      "plan": "auth-serviceinfo-plan"
    },
  },
  "backendPlatform": "NODE",
  "cloudant": [{
    "password": "cloudant-password",
    "url": "https://cloudant-url.com",
    "username": "cloudant-username",
    "serviceInfo": {
      "label": "cloudant-serviceinfo-label",
      "name": "cloudantNoSQLDB",
      "plan": "cloudant-serviceinfo-plan"
    }
  }],
  "name": "project-name",
  "objectStorage": [{
    "password": "object-storage-password",
    "projectId": "object-storage-projectid",
    "region": "object-storage-region",
    "userId": "object-storage-userid",
    "serviceInfo": {
      "label": "objectStorage-serviceinfo-label",
      "name": "Object-Storage",
      "plan": "objectStorage-serviceinfo-plan"
    }
  }],
  "push": {
    "appGuid": "push-app-guid",
    "appSecret": "push-app-secret",
    "clientSecret": "push-client-secret",
    "serviceInfo": {
      "label": "push-serviceinfo-label",
      "name": "imfpush",
      "plan": "push-serviceinfo-plan"
    }
  },
  "sdks": [{
    "name": "sdks-name",
    "spec": "https://sdks-spec.com"
  }],
  "server": {
    "diskQuota": "manifest-disk-quota",
    "domain": "manifest-domain",
    "env": {},
    "host": "manifest-host",
    "instances": 3,
    "memory": "manifest-memory",
    "name": "manifest-name",
    "organization": "manifest-org",
    "services": [
      "my-cloudant-instance", "my-objectstorage-instance", "my-appid-instance"
    ],
    "space": "manifest-space"
  }
});
