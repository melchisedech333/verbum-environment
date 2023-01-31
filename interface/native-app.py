
#!/usr/bin/env python

from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse
from socketserver import ThreadingMixIn
import subprocess

class handler(BaseHTTPRequestHandler):
    def send_headers(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()

    def do_GET(self):
        query = urlparse(self.path).query
        query_components = dict(qc.split("=") for qc in query.split("&"))
        p_path = query_components["path"]
        p_id = query_components["id"]
        p_resolution = query_components["resolution"]
        p_name = query_components["name"]
        p_rfbport = query_components["rfbport"]

        response  = "IHS\nPath: "+ p_path +"\nID: "+ p_id +"\nResolution: "
        response += p_resolution +"\nName: "+ p_name +"\nPort: "+ p_rfbport

        self.send_headers()
        self.wfile.write(response.encode("utf8"))

        subprocess.call([ p_path, p_resolution, p_id, p_name, p_rfbport ])


class ThreadingSimpleServer(ThreadingMixIn, HTTPServer):
    pass

if __name__ == "__main__":
    # httpd = HTTPServer(('localhost', 1337), handler)
    httpd = ThreadingSimpleServer(('localhost', 1337), handler)
    httpd.serve_forever()


