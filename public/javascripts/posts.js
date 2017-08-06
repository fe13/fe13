$(document).ready(function() {

  $('.post-edit .post-form').on('submit', function(event) {
    event.preventDefault();

    let id = this.elements._id.value;
    let post = {
      title: this.elements.title.value,
      url: this.elements.url.value,
      type: this.elements.type.value,
      text: this.elements.text.value
    };

    $.ajax({
      url: `/api/posts/${id}`,
      method: 'PUT',
      data: JSON.stringify(post),
      contentType: 'application/json',
      success: function() {
        location.href = `/p/${id}`;
      },
      error: function(xhr, status, error) {
        // 处理错误
      }
    });
  });

});