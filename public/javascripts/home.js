$(document).ready(function() {

  $(document).on('click', '.post-upvote', function(event) {
    let $target = $(event.target);
    let voting = $target.data('voting');
    if (voting) return;
    $.ajax({
      url: `/api/posts/${$target.data('id')}/upvote`,
      method: 'PUT',
      beforeSend: function() {
        $target.data('voting', true);
      },
      success: function(data) {
        $target.next().html(data.score + ' 赞');
      },
      complete: function() {
        $target.data('voting', false);
      }
    })
  });

});