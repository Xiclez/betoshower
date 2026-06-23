from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
import uuid
import os

app = Flask(__name__)
# Base de datos SQLite en la misma carpeta
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///invitados.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modelo de la Base de Datos
class Invitado(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(150), nullable=False)
    token = db.Column(db.String(36), unique=True, nullable=False)
    confirmado = db.Column(db.Boolean, default=False)

# Crear tablas si no existen
with app.app_context():
    db.create_all()

# Pantalla de Administración
@app.route('/admin', methods=['GET', 'POST'])
def admin():
    if request.method == 'POST':
        nombre_invitado = request.form.get('nombre')
        if nombre_invitado:
            # Generar token único para cada invitado
            nuevo_invitado = Invitado(nombre=nombre_invitado, token=str(uuid.uuid4()))
            db.session.add(nuevo_invitado)
            db.session.commit()
        return redirect(url_for('admin'))
    
    invitados = Invitado.query.all()
    return render_template('admin.html', invitados=invitados)

# Pantalla del Sobre (Landing Inicial)
@app.route('/invitacion/<token>')
def sobre(token):
    invitado = Invitado.query.filter_by(token=token).first_or_404()
    return render_template('envelope.html', invitado=invitado)

# Pantalla de la Invitación Real
@app.route('/invitacion/<token>/ver')
def invitacion(token):
    invitado = Invitado.query.filter_by(token=token).first_or_404()
    return render_template('invitation.html', invitado=invitado)

# API para confirmar asistencia
@app.route('/api/confirmar/<token>', methods=['POST'])
def confirmar(token):
    invitado = Invitado.query.filter_by(token=token).first_or_404()
    invitado.confirmado = True
    db.session.commit()
    return jsonify({"success": True})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7007)