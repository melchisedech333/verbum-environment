#!/usr/bin/env python
#
# Module: Native App
# Process module requests.
#

from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse
from socketserver import ThreadingMixIn
import subprocess, threading


class ThreadingSimpleServer(ThreadingMixIn, HTTPServer):
    pass

class handler(BaseHTTPRequestHandler):
    def send_headers(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()

    def do_GET(self):
        query = urlparse(self.path).query
        query_components = dict(qc.split("=") for qc in query.split("&"))
        p_path = query_components["path"]
        p_vnc = query_components["vnc"]
        p_id = query_components["id"]
        p_resolution = query_components["resolution"]
        p_name = query_components["name"]
        p_rfbport = query_components["rfbport"]
        p_vncport = query_components["vncport"]

        response  = "IHS\nPath: "+ p_path +"\nID: "+ p_id +"\nResolution: "
        response += p_resolution +"\nName: "+ p_name +"\nRFB: "+ p_rfbport +"\nVNC: "+ p_vncport
        response += "\nLink: http://localhost:"+ p_vncport +"/vnc.html"

        self.send_headers()
        self.wfile.write(response.encode("utf8"))

        t_task_app = threading.Thread(target=task_app, 
            args=(p_path, p_id, p_resolution, p_name, p_rfbport))
        t_task_app.start()

        t_task_vnc = threading.Thread(target=task_vnc, 
            args=(p_vnc, p_rfbport, p_vncport))
        t_task_vnc.start()


def task_app(*args):
    p_path = args[0]
    p_id = args[1]
    p_resolution = args[2]
    p_name = args[3]
    p_rfbport = args[4]

    subprocess.call([ p_path, p_resolution, p_id, p_name, p_rfbport ])


def task_vnc(*args):
    print(args)
    
    p_path = args[0]
    p_rfbport = args[1]
    p_vncport = args[2]

    subprocess.call([ p_path, '--vnc', 'localhost:'+ p_rfbport, '--listen', p_vncport])


if __name__ == "__main__":
    # httpd = HTTPServer(('localhost', 1337), handler)
    httpd = ThreadingSimpleServer(('localhost', 1337), handler)
    httpd.serve_forever()


