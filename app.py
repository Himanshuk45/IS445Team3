from flask import Flask, render_template
from generate_graph import generate_graph

app = Flask(__name__)

# Route to generate the graph
@app.route('/generate-graph')
def refresh_graph():
    generate_graph()  # Generate the graph
    return 'Graph generated successfully'

# Route to serve the HTML file
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
