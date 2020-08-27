

$('#builder-hql').queryBuilder({
   plugins: [
     'bt-tooltip-errors',
     'not-group'
   ],
   filters: [
 {
     id: 'date',
     label: 'Datepicker',
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
       id: 'key',
       label: 'key',
       type: 'string'
     },
     {
       id: 'foo',
       label: 'foo',
       type: 'string'
     },
     {
       id: 'bar',
       label: 'bar',
       type: 'string'
     },
     {
       id: 'baz',
       label: 'baz',
       type: 'string'
     },
     {
       id: 'category',
       label: 'Category',
       type: 'integer',
       input: 'select',
       values: {
         1: 'Books',
         2: 'Movies',
         3: 'Music',
         4: 'Tools',
         5: 'Goodies',
         6: 'Clothes'
       },
       operators: [
         'equal',
         'not_equal',
         'in',
         'not_in',
         'is_null',
         'is_not_null'
       ]
     },
     {
       id: 'in_stock',
       label: 'In stock',
       type: 'integer',
       input: 'radio',
       values: {
         1: 'Yes',
         0: 'No'
       },
       operators: [
         'equal'
       ]
     },
     {
       id: 'price',
       label: 'Price',
       type: 'double',
       validation: {
         min: 0,
         step: 0.01
       }
     },
     {
       id: 'id',
       label: 'Identifier',
       type: 'string',
       placeholder: '____-____-____',
       operators: [
         'equal',
         'not_equal'
       ],
        validation: {
          format: /^.{4}-.{4}-.{4}$/
        }
  }]
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
    $.post("http://sandbox-hdp.hortonworks.com:18081/submit",
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
    $.post("http://sandbox-hdp.hortonworks.com:18081/submit",
`{"sql": "${result.sql}","delivery": "preview"}`
, function(data,status){
            alert("Data: " + data + "\nStatus: " + status);
        });
});



