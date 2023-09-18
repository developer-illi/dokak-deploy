$(function (){
    var form = document.getElementById('lecture_form');
    var submitButton = form.querySelector('button[type="submit"]');

    // 폼 제출 이벤트 핸들러를 추가합니다.
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // 폼의 기본 동작을 중단합니다.
        // 여기에 폼 유효성 검사 또는 추가 로직을 수행합니다.

        // 예를 들어, 간단한 유효성 검사를 수행하는 코드:
        var titleInput = form.querySelector('input[name="title"]');
        var teacherInput = form.querySelector('input[name="teacher"]');
        var companyInput = form.querySelector('input[name="company"]');
        var liveInput = form.querySelector('input[name="live_time"]');
        var runInput = form.querySelector('input[name="run_time"]');
        var textInput = form.querySelector('input[name="lecture_text"]');
        // var imgInput = form.querySelector('input[name="title_img"]');
        var urlsInput = form.querySelector('input[name="urls"]');

        if (titleInput.value.trim() === '') {
            alert('제목을 입력해주세요.');
            titleInput.focus();
            return false;
        }

        if (teacherInput.value.trim() === '') {
            alert('강사 명을 입력해주세요.');
            teacherInput.focus();
            return false;
        }
        if (companyInput.value.trim() === '') {
            alert('소속 명을 입력해주세요.');
            companyInput.focus();
            return false;
        }
        if (liveInput.value.trim() === '') {
            alert('강의 시작 시간을 입력해주세요.');
            liveInput.focus();
            return false;
        }
        if (runInput.value.trim() === '') {
            alert('강의 종료 시간을 입력해주세요.');
            runInput.focus();
            return false;
        }
        if (urlsInput.value.trim() === '') {
            alert('URL을 입력해주세요.');
            urlsInput.focus();
            return false;
        }
        form.submit();
    // 유효성 검사가 통과되면 폼을 제출합니다.
    // 여기에 서버로 데이터를 보내는 등의 추가 작업을 수행할 수 있습니다.
    // form.submit(); // 실제로 폼을 제출합니다.
    });
    var titles = document.getElementById('title');
    titles.addEventListener('blur',function (){
        var title = $('#title').val();
        title_change(title);
    });
    var names = document.getElementById('teacher');
    names.addEventListener('blur', function (){
        var name = $('#teacher').val();
        name_change(name);
    });
    var companys = document.getElementById('company');
    companys.addEventListener('blur', function (){
        var company = $('#company').val();
        company_change(company);
    });
    var content_t = document.getElementById('lecture_text');
    content_t.addEventListener('blur', function (){
        var contents = $('#lecture_text').val();
        intro_change(contents);
    });

    var img_input = document.getElementById('title_img');
    img_input.addEventListener('change', function (){
        previewImage(this);
    })
});


function title_change(text){
    var title_ch = document.getElementById('pre_title');
    title_ch.textContent = text;
}
function name_change(text){
    var namae_ch = document.getElementById('pre_name');
    namae_ch.textContent = text;
}
function company_change(text){
    var company_ch = document.getElementById('pre_company');
    company_ch.textContent = text;
}
function intro_change(text){
    var intro = document.getElementById('pre_intro');
    intro.textContent = text;
}
function previewImage(input) {
    var img_section = document.getElementById('pre_img_section');
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // 미리보기 영역에 이미지를 표시합니다.
            img_section.innerHTML = `<img src="${e.target.result}" alt="Selected Image">`;
        };

        // 파일을 읽어옵니다.
        reader.readAsDataURL(input.files[0]);
    } else {
        // 파일이 선택되지 않았거나 지원하지 않는 형식일 경우 기본 문구를 표시합니다.
        img_section.innerHTML = '이미지를 선택하세요.';
    }
}
function preview_ch(id){
    var pk_k = id;
    var img_section = document.getElementById('pre_img_section');
    $.ajax({
        url:'preview_ck',
        type:'POST',
        cache :false,
        // contentType: 'application/json; charset=utf-8',
        async:false,
        dataType:'JSON',
        data:{
            'pk':pk_k
        },
        success:function (response){
            var imgurl = decodeURIComponent(response.img);
            title_change(response.title);
            name_change(response.name);
            company_change(response.company);
            intro_change(response.text);
            img_section.innerHTML = `<img src="${imgurl}" alt="Selected Image">`;
        }
    });
}