# Hive Query App

This is a prototype / example application to demonstrate hosting a web app via Apache NiFi which allows users to submit Hive queries.  By default, it is intended to be run on HDP Sandbox 3.0.1 with Apache NiFi 1.11.4 installed.

## Installing the application:

  1. Download the "hql_form.xml" template found here: https://raw.githubusercontent.com/devriesb/hive_query/master/templates/hql_form.xml

  2. Import the template into the NiFi instance running on the HDP Sandbox


  3.  Start all processors in the template.  
      - There will be processors that are invalid due to dependencies on services that have not been started... start those services, then start the processors.


  4. The Hive Query App will be available at : http://sandbox-hdp.hortonworks.com:18081/hql.html

       - You may need to wait / refresh for the app to initially become available, as when the NiFi flow starts it needs to download / unpack / install the Hive Query App.  You can examine the NiFi flow for any issues.

## Running the application in a different environment

There are variables set at the "hive web form" level that specify some behaviors of the flow.  These can be modified if you wish to run in a different environment.

- **app.dir** - Specifies where the application will be "installed"
- **hq.git.repo.url** - Specified the location of the application repository, which will be used to download and install the app.
