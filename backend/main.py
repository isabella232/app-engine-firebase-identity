from flask import Flask, jsonify, request
import flask_cors
import logging
import google.auth.transport.requests
import google.oauth2.id_token

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)
flask_cors.CORS(app, resources={r"/api/*": {"origins": "https://andy-playground-development.uc.r.appspot.com"}})
try:
  import googleclouddebugger
  googleclouddebugger.enable()
except ImportError:
  pass


@app.route('/')
def hello():
    """Return a friendly HTTP greeting."""
    logging.info('This is an info message')
    return 'V16 Hello World! Public'

@app.route('/api/valid', methods=['POST', 'PUT', 'GET'])
def vaid():
    try:
        HTTP_REQUEST = google.auth.transport.requests.Request()
        session = HTTP_REQUEST.session or {}
        req = request or {}
        environ = request.environ or []
        auth_header = environ['HTTP_AUTHORIZATION'] or ''
        id_token = auth_header.split(' ').pop() or ''
        claims = google.oauth2.id_token.verify_firebase_token(
            id_token, HTTP_REQUEST)
        if not claims:
            return 'Unauthorized', 401
    except Exception as err:
        print(err)
        pass

    return "OK 2.10"

@app.route('/api/alsoValid', methods=['GET'])
def alsoValid():
    try:
        HTTP_REQUEST = google.auth.transport.requests.Request()
        session = HTTP_REQUEST.session or {}
        req = request or {}
        environ = request.environ or []
        auth_header = environ['HTTP_AUTHORIZATION'] or ''
        id_token = auth_header.split(' ').pop() or ''
        claims = google.oauth2.id_token.verify_firebase_token(
            id_token, HTTP_REQUEST)
        if not claims:
            return 'Unauthorized', 401
    except Exception as err:
        print(err)
        pass

    return "OK 2.10"

@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal eRRor occurred.', 500
