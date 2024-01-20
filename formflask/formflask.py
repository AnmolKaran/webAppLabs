from flask import Flask, render_template, request
app = Flask(__name__)
app.debug = True


# ROUTE TO GENERATE THE FORM
@app.route('/')
def hello_form():
  return render_template('openpage.html')


@app.route('/inputted',methods=['POST','GET'])
def submitted():
  if request.method == 'POST':

    orderName = request.form.get('f_order')
    personName = request.form.get('f_name')
    foods = request.form.get('food')
    basketballs = request.form.get('basketball')
    soccers = request.form.get('soccer')
    question2ans = request.form.get('question2')
    return render_template('submitted.html',order = orderName,name = personName,i_correct = "Correct" if orderName =="test"else "Incorrect", food = foods, basketball = basketballs,soccer = soccers,question2 = question2ans)
  

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 80)

    
  