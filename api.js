
window.addEventListener('DOMContentLoaded', () => {

    var messages = [];
    //id is the send id
    var message = {
        id: '',
        messages_queue: []
    }

    var personal_message = {
        isYou: true,
        actual_message: ''
    }


    var mmm=[];
    for(var i=0;i<15;i++){
        mmm.push({isYou:false,actual_message:`other message ${i}`});
        mmm.push({isYou:true,actual_message:`My message ${i}`});
    }
    console.log(mmm)
    messages.push({
        id: '9662558307',
        messages_queue: mmm
    });

    mmm=[];
    for(var i=0;i<15;i++){
        mmm.push({isYou:false,actual_message:`other2 message ${i}`});
        mmm.push({isYou:true,actual_message:`My2 message ${i}`});
    }
    console.log(mmm)

    messages.push({
        id: '9662558308',
        messages_queue: mmm
    });

   
    var url1 = "http://localhost:8080/whatsapp/api/v1/user";
    fetch(url1, {
        method: "GET",
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            console.log(json[0].name);
            var profile = '';
            json.forEach(element => {
                profile += ` <div class="row p-2 contact-user" id="${element.phone}">
                <div class="col-3"><img src="${element.profile}" alt="" srcset="" class="imgrounded"></div>
                <div class="col name-center">
                  <p>${element.name}</p>
                </div>
              </div>`;
            });
            $("#userProfile").html(profile);


            json.forEach(element => {
                document.getElementById(`${element.phone}`).addEventListener('click',() => {
                    var messageProfile = `<div class="row chatheader fixed" id="messageProfile"><div class="col-3 p-2 " id="chat_profile" data-id="${element.phone}"><img src="${element.profile}" alt="" srcset="" class="imgrounded"></div>
                <div class="col name-center">
                  <p>${element.name}</p>
                </div></div>`;

                    var ui_message = ``;
                    messages.forEach(m => {

                       

                        if (m.id == element.phone) {
        
                            m.messages_queue.forEach(am => {
                               // console.log(am.actual_message);
                                if (am.isYou) {
                                    ui_message += `<div class="row message-body justify-content-end ">
                                <div class="col-auto end-message m-end">
                                  ${am.actual_message}
                                </div>
                              </div>`;
                                } else {
                                    ui_message += `<div class="row message-body justify-content-start ">
                                <div class="col-auto end-message m-start">
                                  ${am.actual_message}
                                </div>
                                
                              </div>`;
                                }
                            })
                        }
                    })
                    $('#compelet_profile_chat').html(messageProfile + ui_message);
                        
                    var height=document.getElementById("compelet_profile_chat");
                    function scrollToBottom() {
                        height.scrollTop = height.scrollHeight;
                      }
                      scrollToBottom();
                
                });

            });
        })
        .catch(err => {
            console.log(err);

        });


    document.getElementById('send-button').addEventListener('click', () => {
            var phone_user=$("#chat_profile").data('id');
           var me=$("#Text").val();
           if(me.trim()=='') return;
        //   console.log("current user for chat  "+phone_user+"  and message  "+me);
           $('#compelet_profile_chat').append(` <div class="row message-body justify-content-end ">
           <div class="col-auto end-message m-end">
             ${me}
           </div>
         </div>`);
        mmm=[];
         mmm.push({isYou:true,actual_message:`${me}`});
         messages.push({
            id: phone_user,
            messages_queue: mmm
        });
         $("#Text").val('');

         var height=document.getElementById("compelet_profile_chat");
         function scrollToBottom() {
             height.scrollTop = height.scrollHeight;
           }
           scrollToBottom();
        
    });


    document.getElementById("Text").addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
          console.log("Enter key detected.")
          $('#send-button').trigger('click');
        }
      });

    // document.getElementById('get').addEventListener('click', () => {
    //     var url = "http://localhost:8083/api/v1/getAllUser";
    //     fetch(url, {
    //         method: "GET",
    //         // body: JSON.stringify(_data),
    //         // headers: {"Content-type": "application/json; charset=UTF-8"}
    //     })
    //         .then(response => response.json())
    //         .then(json => {
    //             console.log(json);
    //             document.getElementById('testId').innerHTML = JSON.stringify(json);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             document.getElementById('testId').innerHTML = JSON.stringify(err);
    //         });

    // });

    // document.getElementById('post').addEventListener('click', () => {
    //     var url = "http://localhost:8083/api/v1/addUser";
    //     var _data={
    //         "email":"kanchan@gmail.com",
    //         "firstName":"Kanchan",
    //         "lastName":"sharma",
    //         "password":"kanchan"
    //     }
    //     fetch(url, {
    //         method: "POST",
    //         body: JSON.stringify(_data),
    //         headers: {"Content-type": "application/json; charset=UTF-8"}
    //     })
    //         .then(response => response.json())
    //         .then(json => {
    //             console.log(json);
    //             document.getElementById('testId').innerHTML = JSON.stringify(json);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             document.getElementById('testId').innerHTML = JSON.stringify(err);
    //         });

    // });

})



