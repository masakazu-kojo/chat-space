$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="main-page__messasge-page" main-page__messasge-page__box=${message.id}>
         <div class="main-page__messasge-page__box__line">
           <div class="main-page__messasge-page__box__line__menber">
             ${message.user_name}
           </div>
           <div class="main-page__messasge-page__box__date">
             ${message.created_at}
           </div>
         </div>
         <div class="main-page__messasge-page__box__chat">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="main-page__messasge-page" main-page__messasge-page__box=${message.id}>
         <div class="main-page__messasge-page__box__line">
           <div class="main-page__messasge-page__box__line__menber">
             ${message.user_name}
           </div>
           <div class="main-page__messasge-page__box__date">
             ${message.created_at}
           </div>
         </div>
         <div class="main-page__messasge-page__box__chat">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
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
})