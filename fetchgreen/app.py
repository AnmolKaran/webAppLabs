from flask import Flask, render_template, jsonify
app = Flask(__name__)
teams  = {
	  "commanders": 1,
	  "eagles": 3,
	  "giants": 4
	}
@app.route('/')
def hello_world():
    return render_template('main.html')

@app.route("/upvote")
def kitchen_ops():
    
    teams["commanders"] +=1
    return jsonify(teams)

@app.route("/downvote")
def kitchen_ops():
    
    teams["commanders"] +=1
    return jsonify(teams)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)