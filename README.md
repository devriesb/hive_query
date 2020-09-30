# Hive Query App

This is a prototype / example application to demonstrate hosting a web app via Apache NiFi which allows users to submit Hive queries.  By default, it is intended to be run on HDP Sandbox 3.0.1 with Apache NiFi 1.11.4 installed.

## Prerequisites
  1. HDP Sandbox 3.0.1 running
  1. Apache NiFi 1.11.4 installed on the Sandbox
  1. A "combined_table" created in Hive (as defined in hive-tables.txt)


## Installing the application:

  1. Download the "hql_form.xml" template found here: https://raw.githubusercontent.com/devriesb/hive_query/master/templates/hql_form.xml

  1. Import the template into the NiFi instance running on the HDP Sandbox

  1. Instantiate the template.


  1.  Start all services and processors in the template.   
      - There will be processors that are invalid due to dependencies on services that have not been started... start those services, then start the processors.


  1. The Hive Query App will be available at : http://sandbox-hdp.hortonworks.com:18081/hql.html

       - You may need to wait / refresh for the app to initially become available, as when the NiFi flow starts it needs to download / unpack / install the Hive Query App.  You can examine the NiFi flow for any issues.

## Application Overview

The application simply presents a UI allowing users to visually construct a query without having to directly write HQL.  For this, it uses jQuery QueryBuilder (https://querybuilder.js.org/).  Below the Query construction interface, there are 4 buttons:

- **Reset** - Clears the constructed query and any preview results
- **Show HQL** - Displays the HQL equivalent of the constructed query
- **Preview** - Executes the constructed query, limiting the results to 20 rows and displaying it on the page as an HTML table
- **Download** - Executes the constructed query, and returns *all* results as a CSV file


## Flow Overview

The flow backing the application is contained in the process group "hive web query".  HTTP requests are handled by the "HQL Form Entry Point" processor.  Depending on the URI, the request is routed to one of the three process groups:
  * Handle Web Form
  * Handle Raw File
  * Handle submit

Additionally, there is a process group to generate dummy data to query against call "Generate Hive Dummy Data".  Theses four groups are described in further detail below.

### Handle Web Form

This process group serves the static files of the web application from the directory specified by the "${app.dir}" variable.  If a requested file is not found, the request is routed to the "Self-Installer Flow" which will reach out to the github repo specified by the "${hq.git.repo.url}" variable to pull the most recent version of the application.  This helps streamline "installation" of the app, by handling the download automatically after importing and starting the template, as opposed to having to manually download files and move them to the proper location.

### Handle Submit

When a user submits a request via the web form, it is routed to this process group.  This group gets the results from hive, and then returns them as appropriate (either as a full download or as a "preview").  The "Get Results from Hive" group handles the first step by extracting the details of the request and then using those details to construct an HQL query.  If the query returns no results, an HTTP 404 error is returned.  If the query results in multiple batches of results being returned, these are combined into a single file to be returned.

If the request was for a "download", the results are returned as a CSV file.  For a "preview", the results are converted to an HTML table for better readability (in the "Format HTML Table" process group).  This process additionally converts the names of referenced raw files to clickable links to enable download by the user.

### Handle Raw file

Requests for raw files from the data lake are routed here.  The files are retrieved from the "${data.lake.raw.files}" directory if present, and returned.  If a requested file is not found or some other error occurs, a 404 or 500 error is returned respectively.

### Generate Hive Dummy Data

This process group generates data to store in Hive and HDFS to demonstrate use of the application.  It generates random data to store in Hive, and then creates the referenced files in HDFS.  The content of these files is simply the name of the file, but converted to uppercase.

## Running the application in a different environment

There are variables set at the "hive web form" level that specify some behaviors of the flow.  These can be modified if you wish to run in a different environment.

- **app.dir** - Specifies where the application will be "installed"
- **hq.git.repo.url** - Specified the location of the application repository, which will be used to download and install the app.
-  **hive.db.url** - The hive database connection URL
-  **core.site.xml** - The location on disk of core-site.xml
-  **hive.site.xml** - The location on disk of hive-site.xml
- **data.lake.raw.files** - The location of the raw files in HDFS
