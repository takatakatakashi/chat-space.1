$(function(){
  function buildHTML(message) {
    var image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html = `<div class="message" data-id="${message.id}">
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-meesage">
            <p class="lower-message__content">
              ${message.content}
            </p>
            ${image}
          </div>
        </div>`
  $('.messages').append(html);
  }
  $('#new_message').on('submit', function(e){

    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    console.log(url);
    $.ajax({
      url: url,
      type: "post",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
      }).done(function(message){
        var html = buildHTML(message);
        $('.messages').append(html);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        $('form')[0].reset();
      }).fail(function(){
        alert('error');
      });
      return false;
  });
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message:last').data("id");
      console.log(last_message_id);
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function (messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
    setInterval(reloadMessages, 7000);
});