import React, { useState } from "react";
import Swal from 'sweetalert2';
import "./App.css";

export const Password = () => {
     const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [loading, setLoading] = useState(false);

       const handleSubmit = async (e) => {
       e.preventDefault();

           if (!email || !password || !confirmPassword) {
         Swal.fire({
           icon: 'error',
           iconColor: '#B78752',
           title: 'Campos incompletos',
           text: 'Por favor, completa todos los campos.',
           confirmButtonColor: '#B78752',
           showConfirmButton: true
         });
         return;
       }
       
       if (password !== confirmPassword) {
         Swal.fire({
           icon: 'error',
           iconColor: '#B78752',
           title: 'Contraseñas no coinciden',
           text: 'Las contraseñas no coinciden.',
           confirmButtonColor: '#B78752',
           showConfirmButton: true
         });
         return;
       }

    setLoading(true);

    try {
      console.log('Enviando petición a:', 'https://proyecto-cafeteria-lm3l.onrender.com/api/users/change-password');
      console.log('Datos enviados:', { email, password });

      // Intentar múltiples proxies CORS
      let response;
      let lastError;

      // Opción 1: corsproxy.io
      try {
        const proxyUrl = 'https://corsproxy.io/?';
        const targetUrl = 'https://proyecto-cafeteria-lm3l.onrender.com/api/users/change-password';

        response = await fetch(proxyUrl + targetUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        });
        console.log('Proxy 1 exitoso');
      } catch (error1) {
        console.log('Proxy 1 falló:', error1);
        lastError = error1;

        // Opción 2: allorigins.win
        try {
          const proxyUrl = 'https://api.allorigins.win/raw?url=';
          const targetUrl = encodeURIComponent('https://proyecto-cafeteria-lm3l.onrender.com/api/users/change-password');

          response = await fetch(proxyUrl + targetUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          });
          console.log('Proxy 2 exitoso');
        } catch (error2) {
          console.log('Proxy 2 falló:', error2);
          lastError = error2;

          // Opción 3: cors-anywhere
          try {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const targetUrl = 'https://proyecto-cafeteria-lm3l.onrender.com/api/users/change-password';

            response = await fetch(proxyUrl + targetUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Origin': window.location.origin
              },
              body: JSON.stringify({
                email: email,
                password: password
              })
            });
            console.log('Proxy 3 exitoso');
          } catch (error3) {
            console.log('Proxy 3 falló:', error3);
            throw lastError || error3;
          }
        }
      }

      console.log('Respuesta recibida:', response);
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response text:', errorText);

                 try {
           const errorData = JSON.parse(errorText);
           Swal.fire({
             icon: 'error',
             iconColor: '#B78752',
             title: 'Error del servidor',
             text: errorData.message || `Error ${response.status}: ${response.statusText}`,
             confirmButtonColor: '#B78752',
             showConfirmButton: true
           });
         } catch (parseError) {
           Swal.fire({
             icon: 'error',
             iconColor: '#B78752',
             title: 'Error del servidor',
             text: `Error ${response.status}: ${response.statusText || errorText}`,
             confirmButtonColor: '#B78752',
             showConfirmButton: true
           });
         }
         return;
      }

      const data = await response.json();
      console.log('Datos de respuesta:', data);

      // Mostrar SweetAlert2 en lugar del mensaje de éxito
      Swal.fire({
        icon: 'success',
        iconColor: '#B78752',
        title: 'Contraseña cambiada exitosamente',
        text: 'Has cambiado tu contraseña exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.',
        confirmButtonColor: '#B78752',
        timer: 1500,
        showConfirmButton: true
      });

      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {
      console.error('Error detallado:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);

             if (error.name === 'TypeError' && error.message.includes('fetch')) {
         Swal.fire({
           icon: 'error',
           iconColor: '#B78752',
           title: 'Error de conexión',
           text: 'No se pudo conectar al servidor. El servidor puede estar caído o tener problemas de CORS.',
           confirmButtonColor: '#B78752',
           showConfirmButton: true
         });
       } else if (error.name === 'TypeError' && error.message.includes('JSON')) {
         Swal.fire({
           icon: 'error',
           iconColor: '#B78752',
           title: 'Error del servidor',
           text: 'Error en la respuesta del servidor. Inténtalo de nuevo.',
           confirmButtonColor: '#B78752',
           showConfirmButton: true
         });
       } else if (error.message.includes('CORS')) {
         Swal.fire({
           icon: 'error',
           iconColor: '#B78752',
           title: 'Error de CORS',
           text: 'El servidor no permite peticiones desde este dominio.',
           confirmButtonColor: '#B78752',
           showConfirmButton: true
         });
       } else if (error.message.includes('Failed to fetch')) {
         Swal.fire({
           icon: 'error',
           iconColor: '#B78752',
           title: 'Error de conexión',
           text: 'El servidor no responde. Puede estar caído o en mantenimiento.',
           confirmButtonColor: '#B78752',
           showConfirmButton: true
         });
       } else {
         Swal.fire({
           icon: 'error',
           iconColor: '#B78752',
           title: 'Error inesperado',
           text: error.message,
           confirmButtonColor: '#B78752',
           showConfirmButton: true
         });
       }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-container">
      <div className="password-card">
        <h2 className="password-title">Bienvenido</h2>
        <p className="password-subtitle">Restablecer contraseña</p>
        <form onSubmit={handleSubmit} className="password-form">
          <label className="password-label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="password-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <label className="password-label" htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            className="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <label className="password-label" htmlFor="confirmPassword">Confirma contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            className="password-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          
          <button
            type="submit"
            className="password-button"
            disabled={loading}
          >
            {loading ? "Cambiando contraseña..." : "Cambiar contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
};

