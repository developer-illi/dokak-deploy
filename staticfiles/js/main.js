$(function (){
    var email_ck = false;
    var pass_ck = false;
    var email_val = ''
    var pass_val = ''
    var nick_ck = false;
    function validatePhoneNumber(phoneNumber) {
        // '-' 없이 입력된 핸드폰 번호의 정규 표현식
        var phonePattern = /^\d{10,11}$/;

        // 정규 표현식을 사용하여 핸드폰 번호 검사
        if (phonePattern.test(phoneNumber)) {
            return true; // 유효한 핸드폰 번호
        } else {
            return false; // 유효하지 않은 핸드폰 번호
        }
    }
    $('#main_logo_img').click(function (){
       location.href = '/';
    });
    $('.login_page_open').click(function (){
        $('.login_wrapper').css({display:'flex'});
        $('.login_pg').css({display:'flex'});
        $('.content').css({opacity:0.2});
        $('.header').css({opacity:0.2});
    });
    $('.login_close').click(function (){
        $('.login_wrapper').css({display:'none'});
        $('.content').css({opacity:1});
        $('.header').css({opacity:1});
    });
   $('#buis_btn').click(function (){
       $('.buisnessman_text').css({display: 'block'});
       $('.alliance_text').css({display: 'none'});
   });
   $('#allia_btn').click(function (){
       $('.buisnessman_text').css({display: 'none'});
       $('.alliance_text').css({display: 'block'});
   });
   $('.sign_up_btn').click(function (){
       $('.login_pg').css({display:'none'});
       $('.join_pg').css({display:'block'});
   });
   $('.join_close').click(function (){
       $('.join_pg').css({display:'none'});
       $('.content').css({opacity:1});
       $('.header').css({opacity:1});
   });
   $('.accept_close').click(function (){
       $('.accept_pg').css({display:'none'});
       $('.content').css({opacity:1});
       $('.header').css({opacity:1});
   })
    $('.sign_in_btn').click(function (){
       $('.login_pg').css({display:'block'});
       $('.join_pg').css({display:'none'});
   });
    $('.login_btn').click(function (){

    });
    $('#arow_down').click(function (){
        $('#arow_down').css({display:'none'});
        $('#arow_up').css({display:'block'});
        $('#eng').css({display:'block'});
        $('#chi').css({display:'block'});
        $('#jap').css({display:'block'});
    });
    $('#arow_up').click(function (){
        $('#arow_down').css({display:'block'});
        $('#arow_up').css({display:'none'});
        $('#eng').css({display:'none'});
        $('#chi').css({display:'none'});
        $('#jap').css({display:'none'});
    });
    $('.close_today').click(function (){
       $('.actis').css({display:'none'});
    });
    function validatePassword(password) {
    // 비밀번호 길이가 8~32자 사이인지 확인
        if (password.length < 8 || password.length > 32) {
            return false;
        }

        // 영문 대문자, 영문 소문자, 숫자, 특수 문자 중 2가지 이상을 조합한 패턴 검사
        var patternCount = 0;

        // 영문 대문자 확인
        if (/[A-Z]/.test(password)) {
            patternCount++;
        }

        // 영문 소문자 확인
        if (/[a-z]/.test(password)) {
            patternCount++;
        }

        // 숫자 확인
        if (/\d/.test(password)) {
            patternCount++;
        }

        // 특수 문자 확인
        if (/[$@$!%*?&#]/.test(password)) {
            patternCount++;
        }
        return patternCount >= 2;
    }
    function isValidEmail(email) {
        // 이메일 주소의 정규식 패턴을 정의합니다.
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        // 이메일 주소가 패턴과 일치하는지 확인합니다.
        return emailPattern.test(email);
    }
    function isValidpassword(pass,r_pass){
        var pass_v = pass
        var r_pass_v = r_pass
        if (pass_v==r_pass_v){
            return true
        }else {
            return false
        }
    }
    var pass_cker = document.getElementById('LOGIN_PW_IN');
    pass_cker.addEventListener("blur", function (){
        var password = $('#LOGIN_PW_IN').val();
        if(validatePassword(password)){
            $('.password_text').css({color:'#49c343'});
        }else {
            $('.password_text').css({color:'#f00'});
        }
    });
    var r_pass_cker = document.getElementById('LOGIN_PW_CK');
    r_pass_cker.addEventListener("blur",function (){
        var password = $('#LOGIN_PW_IN').val();
        var r_password = $('#LOGIN_PW_CK').val();
        if(isValidpassword(password,r_password)==true){
            var text = document.getElementById("password_ck_text");
            text.textContent = '비밀번호가 일치합니다.';
            $('.password_ck_text').css({color:'#49c343'})
            pass_val = password;
            pass_ck = true;
        }else {
            var text = document.getElementById("password_ck_text");
            text.textContent = '비밀번호가 일치하지 않습니다.';
            $('.password_ck_text').css({color:'#f00'})
        }
    });
    var input_nick_ck = document.getElementById('input_nick');
    input_nick_ck.addEventListener("blur", function (){
        nick_ck = false;
        var nick = $('#input_nick').val();
        var text_info_nick = document.getElementById('nick_text');
        $.ajax({
                url:'nick_ck',
                type:'POST',
                cache :false,
                async:false,
                dataType:'JSON',
                data:{
                    'nick':nick
                },
                success:function (response){
                    if(response.ck_tf==true){
                        nick_ck = true;
                        text_info_nick.textContent = '사용가능한 닉네임입니다.'
                        $('#nick_text').css({color:'#49c343'});
                    }else {
                        text_info_nick.textContent = '중복된 닉네임입니다.'
                        $('#nick_text').css({color:'#f00'});
                    }


                }
        });
    });
    $('#auth_code_send').click(function (){
        var email = $('#sign_up_email').val();
        if(isValidEmail(email)){
            $.ajax({
                url:'email_send',
                type:'POST',
                cache :false,
                async:false,
                dataType:'JSON',
                data:{
                    'email':email
                },
                success:function (response){
                    if(response.ck_ck==true){
                        alert(response.msg);
                        $('#auth_code_ck').css({display:'block'});
                        $('#auth_code_send').css({display:'none'});
                    }else {
                        alert(response.msg);
                    }
                }
            });
        }else {
            alert('유효하지 않은 이메일 주소입니다.');
        }
    });
    $('#LOGIN_BTN').click(function (){
        var email = $('#LOGIN_ID').val();
        var password = $('#LOGIN_PW').val();
        if(email&&password){
            $.ajax({
                url:'login',
                type:'POST',
                cache :false,
                async:false,
                dataType:'JSON',
                data:{
                    'email':email,
                    'password':password,
                },
                success:function (response){
                    if(response.ckck == true){
                        alert(response.msg);
                        location.href = '/';
                    }else {
                        alert(response.msg);
                    }

                }
            });
        }else {
            if(!email||email==''){
                alert('이메일을 입력해주세요.');
            };
            if(!password||password==''){
                alert('비밀번호를 입력해주세요')
            }
        }

    });
    $('#auth_code_ck').click(function (){
        var button = document.getElementById('auth_code_ck');
        var input = document.getElementById('auth_code_input');
        var email_inp = document.getElementById('sign_up_email');
        var email = $('#sign_up_email').val();
        var code = $('#auth_code_input').val();
        $.ajax({
                url:'email_ck',
                type:'POST',
                cache :false,
                async:false,
                dataType:'JSON',
                data:{
                    'email':email,
                    'code':code,
                },
                success:function (response){
                    alert(response.msg);
                    if(response.ck_tf==true) {
                        button.disabled = true;
                        input.disabled = true;
                        email_inp.disabled = true;
                        email_val = email;
                        email_ck = true;
                    }
                }
        });
    });
    $('#info_btn').click(function (){
        var name = $('#input_name').val();
        var phone = $('#input_phone').val();
        var nick = $('#input_nick').val();
        if(validatePhoneNumber(phone)==true&&nick_ck==true){
            $.ajax({
                url:'sign_up',
                type:'POST',
                cache :false,
                async:false,
                dataType:'JSON',
                data:{
                    'email':email_val,
                    'password':pass_val,
                    'name':name,
                    'nick':nick,
                    'phone':phone
                },
                success:function (response){
                    alert(response.msg);
                    email_ck = false;
                    pass_ck = false;
                    email_val = ''
                    pass_val = ''
                    nick_ck = false;
                    location.href = '/';
                }
            });
        }else {
            if (validatePhoneNumber(phone)==false){
                alert('핸드폰 번호를 올바르게 입력해주세요');
            };
            if(nick_ck==false){
                alert('닉네임이 중복 되어있습니다.')
            }
        }
    });
    // 전체 선택 체크박스 요소 가져오기
    var selectAllCheckbox = document.getElementById("selectAll");

        // 다른 체크박스 요소들 가져오기
    var otherCheckboxes = document.querySelectorAll(".otherCheckbox");

        // 전체 선택 체크박스의 변경 이벤트 리스너 추가
    selectAllCheckbox.addEventListener("change", function() {
        var isChecked = selectAllCheckbox.checked;

            // 다른 모든 체크박스의 상태를 변경
        otherCheckboxes.forEach(function(checkbox) {
            checkbox.checked = isChecked;
        });
    });
    $('#next_btn_one').click(function (){
        if(pass_ck==false){
            alert('모든 항목을 입력해주세요.');
        }else if(email_ck==false){
            alert('이메일 인증을 완료해주세요.')
        }else {
            $('.accept_pg').css({display:'block'});
            $('.join_pg').css({display:'none'});
        }
    });
    $('#next_btn').click(function (){
        var service = $('#ser_box').val();
        var info = $('#info_box').val();
        var age = $('#age_box').val();
        if(service==false||info==false||age==false){
            alert('{필수}항목을 모두 선택해주세요.');
        }else {
            $('.accept_pg').css({display:'none'});
            $('.info_pg').css({display:'block'});
            var text = document.getElementById('in_email_text');
            text.textContent = email_val;
        }
    });
});

	const countDownTimer = function (id, date) {
		var _vDate = new Date(date); // 전달 받은 일자
		var _second = 1000;
		var _minute = _second * 60;
		var _hour = _minute * 60;
		var _day = _hour * 24;
		var timer;

		function showRemaining() {
			var now = new Date();
			var distDt = _vDate - now;

			if (distDt < 0) {
				clearInterval(timer);
				document.getElementById(id).textContent = '강의가 시작 되었습니다!';
				return;
			}

			var days = Math.floor(distDt / _day);
			var hours = Math.floor((distDt % _day) / _hour);
			var minutes = Math.floor((distDt % _hour) / _minute);
			var seconds = Math.floor((distDt % _minute) / _second);

			//document.getElementById(id).textContent = date.toLocaleString() + "까지 : ";
			document.getElementById(id).textContent = days + '일 ';
			document.getElementById(id).textContent += hours + '시간 ';
			document.getElementById(id).textContent += minutes + '분 ';
			document.getElementById(id).textContent += seconds + '초';
		}

		timer = setInterval(showRemaining, 1000);
	}

	var dateObj = new Date();
	dateObj.setDate(dateObj.getDate() + 1);

	countDownTimer('sample01', '09/14/2023 09:00 PM'); // 내일까지
	countDownTimer('sample02', '09/16/2023 00:00 AM'); // 2024년 4월 1일까지, 시간을 표시하려면 01:00 AM과 같은 형식을 사용한다.
	countDownTimer('sample03', '09/17/2023 00:00 AM'); // 2024년 4월 1일까지
	countDownTimer('sample04', '09/18/2024 00:00 AM'); // 2024년 4월 1일까지
	countDownTimer('sample05', '10/01/2024'); // 2024년 4월 1일까지
window.onload = function() {
    countDownTimer();
    alert(test_tie);
};
document.querySelectorAll('.live_btn').forEach(div => {
            div.addEventListener('click', function() {
                // 클릭된 div의 ID를 가져와서 출력합니다.
                const divId = this.id;
                alert(`Div ID: ${divId}`);
            });
});
