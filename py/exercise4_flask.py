1xx 정보
2xx 성공
3xx 리다이렉트
4xx 클라이언트 에러
5xx 서버 에러

HEAD    리소스 정보 습득
GET     데이터 습득
POST    데이터 갱신
PUT     새 리소스 작성
DELETE

---------------------------------------------------------------------------flask1.html

from flask import Flask, render_template, request

app = Flask(__name__, static_folder='.', static_url_path='', template_folder='.')

@app.route('/')
def home():
    return app.send_static_file('flask1.html')

@app.route('/<word>')
def echo(word):
    a = request.args.get('a')           # http://localhost:9999/good?a=1&b=2
    b = request.args.get('b')
    return render_template('flask1.html', **{'word': word, 'a': a, 'b': b})

app.run(port=9999, debug=True)

---------------------------------------------------------------------------flask2.html


