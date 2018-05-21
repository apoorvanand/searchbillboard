// client-side js
// run by the browser each time your view template is loaded

$(function() {
  
  $.get('/results', function(results) {
    if(results[0]){
      results[1].forEach(function(result) {
        $('ul#images').prepend('<li><span class="artwork"><img height="20" src="'+result.image+'"></span> '+result.rank + '. ' +result.artistName+' - '+result.title+'</li>');
      });
      $('ul#images').prepend('Results for: '+results[0]+'<br /><br />');
    }
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var date = $('input').val();
    $.post('/results?' + $.param({date: date}), function() {
      window.location.reload();
    });
  });

});
