from flask import Flask
from router import router


if __name__ == '__main__':
    app = Flask(__name__)
    app.register_blueprint(router, url_prefix='/')
    app.run(debug=True)