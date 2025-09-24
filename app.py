from flask import Flask, request, jsonify, send_from_directory
from analyzer import count_words, basic_analyze
from pathlib import Path
from werkzeug.exceptions import NotFound
from flask_cors import CORS

# STATIC_DIR = os.path.join(os.path.dirname(__file__), 'client','build')
BUILD_DIR = (Path(__file__).parent / 'client' / 'build').resolve()

app = Flask(__name__, static_folder=None)

CORS(app)

@app.route('/api/process', methods=['POST', 'GET'])
def process_text():
    if request.method == 'POST':
        data = request.get_json()
        text = data.get('text', "not text")
        
        if type(text) is not str:
            return "not a string"
        
        d = basic_analyze(text)
        
        return jsonify(d)
    elif request.method =='GET':
        return "send text"
    else:
        return "not implemented"

@app.route('/api/hello')
def hello():
    user = request.args.get('user', 'world')
    return jsonify(message=f'Hello, {user}!')

@app.route('/<path:filename>')
def asset(filename):
    file_path = BUILD_DIR / filename
    if file_path.is_file():
        return send_from_directory(str(BUILD_DIR), filename)
    # not a real file → let 404 handler decide
    raise NotFound()

@app.route('/')
def index():
    return send_from_directory(str(BUILD_DIR), 'index.html')

@app.errorhandler(NotFound)
def fallback(e):
    if request.path.startswith('/api'):
        return 
    print('not found here')
    return send_from_directory(str(BUILD_DIR), 'index.html')


if __name__=="__main__":
    print('Serving from: ', BUILD_DIR)
    print('index.html exists: ', (BUILD_DIR / 'index.html').is_file())
    app.run(port=5000, debug=True)