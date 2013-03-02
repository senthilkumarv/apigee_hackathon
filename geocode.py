import simplejson
from cgi import parse_qs, escape
import sys, os
from flup.server.fcgi import WSGIServer
from geopy import geocoders
from wsgiref.simple_server import make_server
geocoder = geocoders.Google()

def app(environ, start_response):
    d = parse_qs(environ['QUERY_STRING'])
    city = d.get('city', [''])[0]
    print city
    try:
        (place, point) = geocoder.geocode(city)
        start_response('200 OK', [('Content-Type', 'application/json')])
        yield '{"latitude": %s , "longitude": %s}' % point
    except:
        start_response('404 OK', [('Content-Type', 'application/json')])
        yield '{"latitude": null , "longitude": null}'

httpd = make_server('localhost', 8051, app)
while 1:
    httpd.handle_request()
