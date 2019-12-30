$(function(){ 
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="main-page__messasge-page__box" data-message-id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__user-name">` +
            message.user_name +
          `</div>` +
          `<div class="upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      var html = `<div class="main-page__messasge-page__box" data-message-id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__user-name">` +
            message.user_name +
          `</div>` +
          `<div class="upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      var html = `<div class="main-page__messasge-page__box" data-message-id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__user-name">` +
            message.user_name +
          `</div>` +
          `<div class="upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-page__messasge-page').append(html);   
      $('.main-page__messasge-page').animate({ scrollTop: $('.main-page__messasge-page')[0].scrollHeight});   
      $('form')[0].reset();
      $('.form__submit').removeAttr('disabled');
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.form__submit').removeAttr('disabled');
    });
  })
  
    var reloadMessages = function() {
      last_message_id = $('.main-page__messasge-page__box:last').data("message-id");
      console.log(last_message_id);
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        console.log(messages);
        if (messages.length !== 0) {
          console.log("aaaa");
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
         $('.main-page__messasge-page').append(insertHTML);   
         $('.main-page__messasge-page').animate({ scrollTop: $('.main-page__messasge-page')[0].scrollHeight}); 
         $("#new_message")[0].reset();
         $(".form__submit").prop("disabled", false);
        }
      })
      .fail(function() {
        console.log('error');
      });
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
});