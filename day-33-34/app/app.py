import time
import os
from flask import Flask
import redis
import psycopg2

app = Flask(__name__)

# Connect to Redis (Service Name used as Hostname)
cache = redis.Redis(host='cache', port=6379)

# Connect to PostgreSQL (Service Name used as Hostname)
def get_db_connection():
    conn = psycopg2.connect(
        host='db',
        database=os.environ.get('POSTGRES_DB'),
        user=os.environ.get('POSTGRES_USER'),
        password=os.environ.get('POSTGRES_PASSWORD')
    )
    return conn

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

@app.route('/')
def hello():
    count = get_hit_count()
    
    # Simple DB interaction check
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT version();')
        db_version = cursor.fetchone()
        cursor.close()
        conn.close()
        db_status = f"Connected to Postgres! Version: {db_version[0]}"
    except Exception as e:
        db_status = f"Database connection failed: {str(e)}"

    return f"<h1>Hello World!</h1><p>I have been seen {count} times.</p><p>{db_status}</p>"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
