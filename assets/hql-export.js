

$('#builder-hql').queryBuilder({
   plugins: [
     'bt-tooltip-errors',
     'not-group'
   ],
   filters: [
     {
         id: 'telemeter',
         label: 'Telemeter',
         type: 'string',
         input: 'select',
         values: {
             'Telemeter A': 'Telemeter A',
             'Telemeter B': 'Telemeter B',
             'Telemeter C': 'Telemeter C'
         },
         operators: [
                 'equal',
                 'not_equal',
                 'in',
                 'not_in',
                 'is_null',
                 'is_not_null'
         ]
     },{
               id: 'file1',
               label: 'file1',
               type: 'string'
             },
             {
                     id: 'file2',
                     label: 'file2',
                     type: 'string'
                   },
     {
     id: 'eventdate',
     label: 'Event Date',
     type: 'date',
     validation: {
       format: 'YYYY/MM/DD'
     },
     plugin: 'datepicker',
     plugin_config: {
       format: 'yyyy/mm/dd',
       todayBtn: 'linked',
       todayHighlight: true,
       autoclose: true
     }
   },
     {
         id: 'metadata_1',
         label: 'Metadata 1',
         type: 'string'
     },
     {
         id: 'metadata_2',
         label: 'Metadata 2',
         type: 'string'
     },
     {
         id: 'metadata_x',
         label: 'Metadata X',
         type: 'string'
     },
    {
        id: 'tmats_metadata_1',
        label: 'TMATS Metadata 1',
        type: 'string'
    },
    {
        id: 'tmats_metadata_2',
        label: 'TMATS Metadata 2',
        type: 'string'
    },
    {
        id: 'tmats_metadata_x',
        label: 'TMATS Metadata X',
        type: 'string'
    },

    {
        id: 'ch_10_datapoint_1',
        label: 'Ch 10 Data Point 1',
        type: 'double'
    },
    {
        id: 'ch_10_datapoint_2',
        label: 'Ch 10 Data Point 2',
        type: 'double'
    },
    {
        id: 'ch_10_datapoint_x',
        label: 'Ch 10 Data Point X',
        type: 'double'
    },
      {
        id: 'key',
        label: 'key',
        type: 'string'
      },
       {
           id: 'ts',
           label: 'Datapoint Timestamp',
           type: 'date',
           validation: {
             format: 'YYYY/MM/DD'
           },
           plugin: 'datepicker',
           plugin_config: {
             format: 'yyyy/mm/dd',
             todayBtn: 'linked',
             todayHighlight: true,
             autoclose: true
           }
         }

]
});

$('#btn-reset').on('click', function() {
  $('#builder-hql').queryBuilder('reset');
});

$('#hql-reset').on('click', function() {
  $('#preview-results').empty();
});

$('#btn-get-sql').on('click', function() {
  var result = $('#builder-hql').queryBuilder('getSQL', 'question_mark');

  if (result.sql.length) {
    alert(result.sql + '\n\n' + JSON.stringify(result.params, null, 2));
  }
});


$('#preview-hive').on('click', function() {
  var result = $('#builder-hql').queryBuilder('getSQL',false);

$.ajaxSetup({
   headers:{
      'Content-Type': 'application/json'
   }
});
    $.post("/submit",
`{"sql": "${result.sql}","delivery": "preview"}`
, function(data,status){
            $('#preview-results').html(data);
        });
});


$('#download-hive').on('click', function() {
  var result = $('#builder-hql').queryBuilder('getSQL',false);

$.ajaxSetup({
   headers:{
      'Content-Type': 'application/json'
   }
});
    $.post("/submit",
`{"sql": "${result.sql}","delivery": "download"}`
, function(data,status){
        //alert("Data: " + data + "\nStatus: " + status);

        // The actual download
        var blob = new Blob([data], { type: 'text/csv' });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "results.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        });
});
