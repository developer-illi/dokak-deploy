from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMessage
import json
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from random import randint
import string
import random
from mainpg.models import *
from urllib.parse import quote, unquote
from datetime import datetime

# Create your views here.
def first_page(request):
    now_time = datetime.now()
    lecture = Lecture.objects.all()
    for lecture_time_set in lecture:
        compare_time_one = datetime.strptime(lecture_time_set.live_time, "%m/%d/%Y %I:%M %p")
        compare_time_two = datetime.strptime(lecture_time_set.runnig_time, "%m/%d/%Y %I:%M %p")
        if now_time > compare_time_one:
            if now_time > compare_time_two:
                lecture_time_set.live = 3
            else:
                lecture_time_set.live = 2
        elif now_time < compare_time_one:
            pass
        lecture_time_set.save()
    try:
        user = request.session['user']
    except:
        user = None
    arg = {'username' : user, 'lecture':lecture}
    return render(request, 'main.html', arg)
def admin(request):
    if request.session['user'] == 'admin':
        now_time = datetime.now()
        lecture = Lecture.objects.all()
        for lecture_time_set in lecture:
            compare_time_one = datetime.strptime(lecture_time_set.live_time, "%m/%d/%Y %I:%M %p")
            compare_time_two = datetime.strptime(lecture_time_set.runnig_time, "%m/%d/%Y %I:%M %p")
            if now_time > compare_time_one:
                if now_time > compare_time_two:
                    lecture_time_set.live = 3
                else:
                    lecture_time_set.live = 2
            elif now_time < compare_time_one:
                pass
            lecture_time_set.save()
        arg = {'lecture':lecture}
        return render(request, 'admin.html',arg)
    else:
        try:
            user = request.session['user']
        except:
            user = None
        lecture = Lecture.objects.all()
        arg = {'username': user, 'lecture': lecture}
        return render(request, 'main.html', arg)
def test(request):
    arg = {}
    return render(request, 'test.html', arg)
@csrf_exempt
def login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        user = User_model.objects.get(email=email, password=password)
        msg = '로그인 되었습니다.'
        ckck = True
        request.session['user'] = user.nick_name
    except ObjectDoesNotExist:
        msg = '이메일 또는 비밀번호를 확인해주세요'
        ckck = False
    arg = {'success': True, 'msg': msg, 'ckck':ckck}
    return HttpResponse(json.dumps(arg),content_type='application/json')

def my_page(request):
    try:
        user = request.session['user']
        user_dic = User_model.objects.get(nick_name=user)
    except:
        user = None
    if user is None:
        return redirect('/')
    arg = {'username': user, 'user':user_dic}
    return render(request, 'my_page.html', arg)
def generate_random_code():
    characters = string.ascii_letters + string.digits  # 알파벳과 숫자
    code = ''.join(random.choice(characters) for _ in range(6))
    return code
@csrf_exempt
def email_sends(request):
    print('222')
    email = request.POST['email']
    print('dd')
    try:
        user_cker = User_model.objects.get(email=email)
        msg = '이미 회원가입이 되어있습니다.'
        ck_ck = False
    except ObjectDoesNotExist:
        try:
            email_cker = Auth_code_ck.objects.get(email=email)
            msg = '이미 전송 되었습니다.'
            ck_ck = False
        except ObjectDoesNotExist:
            email_send(email)
            msg = '전송 되었습니다.'
            ck_ck = True
    arg = {'success': True, 'msg': msg, 'ck_ck':ck_ck}
    return HttpResponse(json.dumps(arg), content_type='application/json')

@csrf_exempt
def email_send(email_to):
    email_to = email_to
    code = generate_random_code()
    msg = '이메일이 전송되었습니다.'
    mail_title = 'Dokak 인증 이메일'
    email_body = f"""
    <html>
    <head></head>
    <body>
        <h1>독학 DOKAK 이메일 인증 안내</h1>
        <p>안녕하세요 고객님</p>
        <p>'회원가입'을 위해 이메일 인증을 진행합니다.</p>
        <p>아래 발급된 이메일 인증번호를 복사하거나 직접 입력하여 인증을 완료해주세요.</p>
        <p>개인정보보호를 위해 인증번호는 5분간 유효합니다.</p>
        <p style='font-size: 40px;font-weight: bold; width: 100%;height: 80px; background-color: #f0f0f0;padding-top: 33px;
            padding-left: 20px'>{code}</p>
        <p>독하게 배우고 성공 할 독사들의 시크릿 커뮤니티, DOKAK</p>
    </body>
    </html>
    """
    mail_to = 'kylie@illi.kr'
    email = EmailMessage(mail_title, email_body, mail_to, [email_to])
    email.content_subtype = 'html'
    email.send()
    code_add = Auth_code_ck.objects.create(email=email_to, auth_code=code)
    code_add.save()
    arg = {'success': True, 'msg': msg}
    return HttpResponse(json.dumps(arg), content_type='application/json')

@csrf_exempt
def sign_up(request):
    u_email = request.POST['email']
    u_pw = request.POST['password']
    u_name = request.POST['name']
    u_phone = request.POST['phone']
    u_nickname = request.POST['nick']
    user = User_model.objects.create(email=u_email, user_name=u_name, phone=u_phone, nick_name=u_nickname, password=u_pw)
    user.save()
    msg = '회원가입 되었습니다.'
    arg = {'success': True, 'msg':msg}
    return HttpResponse(json.dumps(arg), content_type='application/json')
@csrf_exempt
def email_ck(request):
    email = request.POST['email']
    code = request.POST['code']

    try:
        auth_ck = Auth_code_ck.objects.get(email=email,auth_code=code)
        auth_ck.val = True
        auth_ck.save()
        msg = '인증되었습니다.'
        ck_tf = True
    except ObjectDoesNotExist:
        msg = '이메일 또는 코드를 올바르게 입력해주세요'
        ck_tf = False
    arg = {'success': True, 'msg': msg, 'ck_tf':ck_tf}
    return HttpResponse(json.dumps(arg), content_type='application/json')
@csrf_exempt
def nick_ck(request):
    nick = request.POST['nick']
    try:
        nick_ck = User_model.objects.get(nick_name=nick)
        msg = '중복된 닉네임입니다.'
        ck_tf = False
    except ObjectDoesNotExist:
        msg = '사용가능한 닉네임입니다'
        ck_tf = True
    arg = {'success': True, 'msg': msg, 'ck_tf': ck_tf}
    return HttpResponse(json.dumps(arg), content_type='application/json')

@csrf_exempt
def myinfo_ch(request):
    email = request.POST['users']
    name = request.POST['name']
    nick = request.POST['nick']
    phone = request.POST['phone']
    user = User_model.objects.get(email=email)
    if nick !='':
        try:
            user.nick_name = nick
            msg = '변경되었습니다.'
            ck_tf = True
            user.save()
            request.session['user'] = None
        except Exception as e:
            msg = '중복된 닉네임입니다.'
            ck_tf = False
    if name !='':
        user.user_name = name
        msg = '변경되었습니다.'
        ck_tf = True
        user.save()
        request.session['user'] = None

    if phone !='':
        user.phone = phone
        msg = '변경되었습니다.'
        ck_tf = True
        user.save()
        request.session['user'] = None

    arg = {'success': True, 'msg': msg, 'ck_tf': ck_tf}
    return HttpResponse(json.dumps(arg), content_type='application/json')


@csrf_exempt
def lecture_add(request):
    if request.method == 'POST':
        title = request.POST['title']
        company = request.POST['company']
        teacher = request.POST['teacher']
        live_time = request.POST['live_time']
        lecture_text = request.POST['lecture_text']
        run_time = request.POST['run_time']
        url = request.POST['urls']
        title_img = request.FILES.get('title_img')

        try:
            lec = Lecture.objects.create(title=title, title_img=title_img, company=company, teacher=teacher,
                                         live_time=live_time, lecture_text=lecture_text, runnig_time=run_time,urls=url)
            lec.save()
        except :
            print('err')
        dic = {}
    return HttpResponse(json.dumps(dic))

@csrf_exempt
def preview_ck(request):
    pk = request.POST['pk']
    lecture = Lecture.objects.get(pk=pk)
    img_urls = quote(lecture.title_img.url)

    arg = {
        'title':lecture.title,
        'img':img_urls,
        'company':lecture.company,
        'name':lecture.teacher,
        'text':lecture.lecture_text,
        'url':lecture.urls
    }
    return HttpResponse(json.dumps(arg), content_type='application/json')