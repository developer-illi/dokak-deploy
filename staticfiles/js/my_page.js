$(function (){
    $('#my_edit_btn').click(function (){
        $('.my_edit_page').css({display:'flex'});
        $('.content_mypage').css({display: 'none'});
    });
    $('#edit_close_btn').click(function (){
        $('.my_edit_page').css({display:'none'});
        $('.content_mypage').css({display: 'flex'});
    });

    $('#my_edit_save').click(function (){
       var name = $('#name_edit').val();
       var phone = $('#phone_edit').val();
       var nick = $('#nick_edit').val();
       var users = $('#user_email_edit').val();
       $.ajax({
           url:'myinfo_ch',
           type:'POST',
           cache :false,
           async:false,
           dataType:'JSON',
           data:{
               'users':users,
               'name':name,
               'nick':nick,
               'phone':phone
           },
           success:function (response){
               if(response.ck_tf==true){
                   alert('변경 되었습니다. 다시 로그인해주세요!');
                   location.href('/')
               }
           },
           error:function (){
               alert('중복된 닉네임 입니다.');
           }
        });
    });
});
window.onload = function (){
    var inputFieldStates = {};

    // 모든 입력 필드 요소를 가져오기
    var inputFields = document.querySelectorAll(".edit_input");

    // 체크 버튼 요소 가져오기
    var checkButton = document.getElementById("my_edit_save");

    // 각 입력 필드의 변경 이벤트 모니터링
    inputFields.forEach(function(inputField) {
        // 입력 필드의 초기값 저장
        inputFieldStates[inputField.id] = inputField.value;

        inputField.addEventListener("input", function() {
            // 입력 필드의 현재값과 초기값 비교하여 변경 여부 확인
            var isChanged = inputField.value !== inputFieldStates[inputField.id];

            // 변경된 입력 필드가 하나라도 있으면 버튼 활성화
            if (isChanged) {
                checkButton.removeAttribute("disabled");
                return;
            }

            // 모든 입력 필드가 변경되지 않았다면 버튼 비활성화
            checkButton.setAttribute("disabled", "true");
        });
    });
};