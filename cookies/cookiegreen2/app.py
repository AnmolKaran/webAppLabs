from flask import Flask, render_template, request
app = Flask(__name__)
app.debug = True

from flask import Flask, request, render_template

# ... other normal initialization stuff

@app.route('/')
def read_cookie():
    anmolCookie = request.cookies.get('anmolCookie')
    
    # do stuff with the cookie (conditional, etc)
    return render_template('homePage.html',cook = anmolCookie)

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 80)
