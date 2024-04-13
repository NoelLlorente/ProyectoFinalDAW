using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using thebusinessproject.DTO;
using thebusinessproject.Entities;

namespace thebusinessproject.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class UsuarioController : ControllerBase
    {

        private readonly ThebusinessjourneyContext _DBContext;

        public UsuarioController(ThebusinessjourneyContext DBContext)
        {
            _DBContext = DBContext;
        }

        [HttpGet("getUsuarios")]
        public async Task<ActionResult<List<UsuarioDTO>>> GetUsuarios()
        {
            var lista = await _DBContext.Usuarios.Select(
                s => new UsuarioDTO
                {
                    Correo = s.Correo,
                    Nombre = s.Nombre,
                    Contraseña = s.Contraseña,
                    Fecha = s.Fecha,
                }
            ).ToListAsync();

            if (lista.Count < 0)
            {
                return NotFound();
            }
            else
            {
                return lista;
            }
        }

        [HttpGet("validarUsuario")]
        public async Task<ActionResult<bool>> ValidarUsuario(string correo, string password)
        {
            try
            {
                var usuarioEncontrado = await _DBContext.Usuarios
                    .AnyAsync(s => s.Correo == correo && s.Contraseña == password);

                return usuarioEncontrado;
            }
            catch (Exception ex)
            {
                // Manejar la excepción (por ejemplo, registrarla o devolver un error 500)
                return StatusCode(500, $"Error al validar usuario: {ex.Message}");
            }
        }

        [HttpPost("crearUsuario")]
        public async Task<ActionResult<bool>> InsertUser(string correo, string nombre, string pass, DateTime fecha)
        {
            try
            {
                var existeUsuario = _DBContext.Usuarios.FirstOrDefaultAsync(u => u.Correo == correo);

                if (existeUsuario.Result == null)
                {
                    var newUser = new Usuario()
                    {
                        Correo = correo,
                        Nombre = nombre,
                        Contraseña = pass,
                        Fecha = fecha,
                    };

                    _DBContext.Usuarios.Add(newUser);
                    await _DBContext.SaveChangesAsync();
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al crear usuario: {ex.Message}");
            }

        }


    }
}
