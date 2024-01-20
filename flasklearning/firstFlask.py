from flask import Flask, render_template
app = Flask(__name__)
app.debug = True


@app.route('/')
def hello_world():
    print('someone on page')
    return render_template('dom2.html')

@app.route('/yo')
def yo():
    print('someone on page')
    return "yo"

@app.route('/yo/hey')
def yohey():
    return render_template("yohey.html")



if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 80)

    