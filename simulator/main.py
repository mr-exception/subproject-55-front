# imports
from appJar import gui
from random import random as rnd
from tkinter import *
from time import sleep
import _thread

# configs
mw = 256     # map width
mh = 256     # map height
sc = 1      # stations count
cc = 1       # conditions count
md = 2       # minimum destionations between stations

# gui configs
dv = 20         # map division on canvas
width = 900     # map width
height = 600    # map height
speed_scale = 16

app=gui("weather simulator", [width, height])


# simulation status
simulation_executing = False
# title: set toolbar enables
# description: toolbar buttons are enabled or disabled in different conditions
def setToolbarEnables(e):
    global app, simulation_executing
    simulation_executing = e
    if simulation_executing:
        app.setToolbarButtonDisabled("start")
        app.setToolbarButtonDisabled("step")
        app.setToolbarButtonEnabled("stop")
    else:
        app.setToolbarButtonEnabled("start")
        app.setToolbarButtonEnabled("step")
        app.setToolbarButtonDisabled("stop")

# generating conditions
conditions_geo = [] # geometrics (ex: [2, 13])
conditions_tmp = [] # tempretures (ex: [5, 43])
conditions_hmd = [] # humadities (ex: 12)
conditions_hrv = [] # horizontal view (ex: 4500)
conditions_ios = [] # intensity of sunlight (ex: 42)
conditions_wdc = [] # wind direction (ex: [0, 1])

# title: generate random condition
# description: generated a random condition entering from a side
def generate_random_condition():
    geo = [0, 0]
    wdc = [0, 0]
    if rnd() > 0.5:
        if rnd() > 0.5:
            geo[1] = 0
            wdc[1] = int(rnd()*128)+128
        else:
            geo[1] = 255
            wdc[1] = int(rnd()*128)
        wdc[0] = int(rnd()*256)
        geo[0] = int(rnd()*mw)
    else:
        if rnd() > 0.5:
            geo[0] = 0
            wdc[0] = int(rnd()*128)+128
        else:
            geo[0] = 255
            wdc[0] = (rnd()*128)
        wdc[1] = int(rnd()*256)
        geo[1] = int(rnd()*mh)
    
    conditions_geo.append(geo)
    conditions_wdc.append(wdc)
    # conditions_geo.append([100, 150])
    # conditions_wdc.append([20, 20])
    
    conditions_tmp.append([int(rnd()*256), int(rnd()*256)])
    conditions_hmd.append(int(rnd()*256))
    conditions_hrv.append(int(rnd()*256))
    conditions_ios.append(int(rnd()*256))
    

    print(conditions_geo[-1])
    print(conditions_wdc[-1])

# generating stations
stations_geo = [] # geometrics (ex: [2, 13])
stations_tmp = [] # tempretures (ex: [5, 43])
stations_hmd = [] # humadities (ex: 12)
stations_hrv = [] # horizontal view (ex: 4500)
stations_ios = [] # intensity of sunlight (ex: 42)
stations_wdc = [] # wind direction (ex: [0, 1])

for i in range(0, sc):
    while True:
        x = int(rnd() * mw)
        y = int(rnd() * mh)

        valid = True
        for geo in stations_geo:
            if (x-geo[0])**2 + (y-geo[1])**2 < md**2:
                valid = False
        if valid:
            stations_geo.append([x, y])
            break
    stations_tmp.append([12, 45])
    stations_hmd.append(0)
    stations_hrv.append(0)
    stations_ios.append(0)
    stations_wdc.append([128,128])

# title: render canvas
# description: this method renders canvas from start. get all needed data
# from global variables and renders the canvas widget name 'map_cnv' on app
cell_width = width / dv
cell_height = height / dv
def render_canvas():
    global app, cell_height, cell_width, height, width, stations_geo, stations_tmp, conditions_tmp
    app.clearCanvas("map_cnv")
    for i in range(0, dv):
        app.addCanvasLine("map_cnv", 0, i*cell_height, width, i*cell_height, width=1)
        app.addCanvasLine("map_cnv", i*cell_width, 0, i*cell_width, height, width=1)
    
    for i in range(0, len(conditions_geo)):
        geo = conditions_geo[i]
        h = abs(conditions_wdc[i][1]-128)
        w = abs(conditions_wdc[i][0]-128)
        x = (float(geo[0])/float(mw)) * (width - cell_width) - w/2
        y = (float(geo[1])/float(mh)) * (height - cell_height) - h/2

        tmp = int((conditions_tmp[i][0] + conditions_tmp[i][1]) / 2)
        color_red = tmp
        color_blue = conditions_hmd[i]
        color_green = conditions_ios[i]
        app.addCanvasOval("map_cnv",x, y, w, h, fill='#%02x%02x%02x' % (color_red, color_green, color_blue))
    
    app.setStatusbar("conditions: {}".format(len(conditions_geo)), 3)

    for i in range(0, len(stations_geo)):
        station_geo = stations_geo[i]
        x = (float(station_geo[0])/float(mw)) * (width - cell_width)
        y = (float(station_geo[1])/float(mh)) * (height - cell_height)
        r = min(cell_width/3, cell_height/3)
        h = stations_wdc[i][1]-128
        w = stations_wdc[i][0]-128

        tmp = int((stations_tmp[i][0] + stations_tmp[i][1]) / 2)
        color_red = tmp
        color_blue = stations_hmd[i]
        color_green = stations_ios[i]
        app.addCanvasText("map_cnv", x+(r/2), y-r, "ST {}".format(i))
        app.addCanvasOval("map_cnv",x, y, r, r, fill='#%02x%02x%02x' % (color_red, color_green, color_blue))
        app.addCanvasLine("map_cnv",x+r/2, y+r/2, x+w+r/2, y+h+r/2, width=5)

def run():
    global simulation_executing
    while True:
        sleep(1)
        print("off cycle")
        while simulation_executing:
            handle_cycle()
            render_canvas()
            sleep(1)
            print('on cylce')
for i in range(0, cc):
    generate_random_condition()

_thread.start_new_thread(run, ())

def start_event():
    print("started")
    setToolbarEnables(True)

def stop_event():
    print("stoped")
    setToolbarEnables(False)


# title: calculate single station attributes
# description: calculate a single station attributes in a single cycle
def calc_station(k):
    global conditions_tmp, stations_tmp
    global conditions_geo, stations_geo
    global conditions_hmd, stations_hmd
    global conditions_hrv, stations_hrv
    global conditions_ios, stations_ios
    global conditions_wdc, stations_wdc

    geo = stations_geo[k]
    sum_of_distances = 0
    for cnd_geo in conditions_geo:
        sum_of_distances += ((256-((cnd_geo[0] - geo[0])%256))**2)+((256-((cnd_geo[1] - geo[1])%256))**2)
    
    # calculate
    tmp = [0, 0]
    hmd = 0
    ios = 0
    hrv = 0
    wdc = [0, 0]
    for i in range(0, len(conditions_geo)):
        dst = (256-((conditions_geo[i][0] - stations_geo[k][0])%256))**2 + (256-((conditions_geo[i][1] - stations_geo[k][1])%256))**2
        
        tmp = [tmp[0] + ((conditions_tmp[i][0])*(dst)), tmp[0] + ((conditions_tmp[i][1])*(dst))]
        wdc = [wdc[0] + ((conditions_wdc[i][0])*(dst)), wdc[0] + ((conditions_wdc[i][1])*(dst))]

        hmd += conditions_hmd[i]*dst
        hrv += conditions_hrv[i]*dst
        ios += conditions_ios[i]*dst
        
    stations_tmp[k] = [tmp[0]/sum_of_distances, tmp[1]/sum_of_distances]
    stations_wdc[k] = [wdc[0]/sum_of_distances, wdc[1]/sum_of_distances]
    stations_ios[k] = int(ios / sum_of_distances)
    stations_hrv[k] = int(hrv / sum_of_distances)
    stations_hmd[k] = int(hmd / sum_of_distances)

# title: handle cycle
# description: handles sstations changes in every ccylce
def handle_cycle():
    global conditions_geo, conditions_wdc
    for i in range(0, len(conditions_geo)):
        if i >= len(conditions_geo):
            break

        conditions_geo[i][0] += (float(conditions_wdc[i][0]-128)/speed_scale)
        conditions_geo[i][1] += (float(conditions_wdc[i][1]-128)/speed_scale)
        if conditions_geo[i][0] > width * 1.5 or conditions_geo[i][0] < -0.5*width:
            del conditions_geo[i]
            del conditions_hmd[i]
            del conditions_hrv[i]
            del conditions_ios[i]
            del conditions_tmp[i]
            del conditions_wdc[i]
        
        if conditions_geo[i][1] > height * 1.5 or conditions_geo[i][1] < -0.5*height:
            del conditions_geo[i]
            del conditions_hmd[i]
            del conditions_hrv[i]
            del conditions_ios[i]
            del conditions_tmp[i]
            del conditions_wdc[i]

    for i in range(0, sc):
        calc_station(i)

# title: step event
# event: clicked on step button in app toolbar
# description: when is clicked on step button in app toolbar and the app is stoped
# this method would run and takes a single cycle in simulation
def step_event():
    handle_cycle()
    render_canvas()


# title: create a random condition on map
# event: clicked on random condition in app toolbar
# description: when is clicked on step button in app toolbar and the app is stoped
# this method would run and taks a single cycle in simulation
def random_condition_event():
    print("random condition")
    generate_random_condition()
    render_canvas()
    

# creating the gui
app.setStretch("both")
app.setLocation("CENTER")
app.addCanvas("map_cnv")
render_canvas()

app.addToolbarButton("start", start_event)
app.addToolbarButton("step", step_event)
app.addToolbarButton("stop", stop_event)
app.addToolbarButton("random condition", random_condition_event)
app.setToolbarButtonDisabled("stop")

app.addStatusbar(fields=4)
app.setStatusbar("Cycle: 0", 0)
app.setStatusbar("simulation not started", 1)
app.setStatusbar("station count: {}".format(sc), 2)
app.setStatusbar("conditions: 0", 3)

app.showAllSubWindows()
app.go()