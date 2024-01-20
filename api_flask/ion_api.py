from flask import Flask, render_template,request
import requests                             # third party - not flask
import json

app = Flask(__name__)

@app.route('/')
def hello_form():
  return render_template('form.html')

@app.route('/inputted',methods=['POST','GET'])
def submitted():
    if request.method == "POST":
        x = request.form.get("x")
        y = request.form.get("y")
        remote_url = "https://ion.tjhsst.edu/api/schedule?format=json"
        r = requests.get(remote_url)    
        print(r.text)
        
        j = json.loads(r.text)
        print(j['results'][0]['date'])



        weather_url = f"https://api.weather.gov/points/39,-70"
        d = requests.get(weather_url)
        newJ = json.loads(d.text)
        forecast_url = newJ['properties']['forecast']

        f = requests.get(forecast_url)
        finJ = json.loads(f.text)
        tonightWeather = finJ["properties"]['periods'][1]['temperature']


    otherweather_url = "https://api.weather.gov/points/33.4052,-111.8610"
    mesad = requests.get(otherweather_url)
    mesaJ = json.loads(mesad.text)
    mesaforecast_url = mesaJ['properties']['forecast']

    mesaf = requests.get(mesaforecast_url)
    mesaJ = json.loads(mesaf.text)
    mesatonightWeather = mesaJ["properties"]['periods'][1]['temperature']


    return render_template('foo.html', schedule=j,tonightTemp = finJ,mesaTemp = mesaJ)


app.debug = True
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)