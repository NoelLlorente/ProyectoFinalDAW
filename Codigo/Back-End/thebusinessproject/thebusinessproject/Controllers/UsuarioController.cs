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
        /// <summary>
        /// Declaración del Context de la DB. Se utiliza para realizar las operaciones con la db.
        /// </summary>
        private readonly ThebusinessjourneyContext _DBContext;

        /// <summary>
        /// Constructor que inicializa el contexto de la base de datos.
        /// </summary>
        /// <param name="DBContext">Es el contexto de la db</param>
        public UsuarioController(ThebusinessjourneyContext DBContext)
        {
            _DBContext = DBContext;
        }

        /// <summary>
        /// Método para validar si un usuario existe.
        /// </summary>
        /// <param name="correo">Es el correo del usuario a validar</param>
        /// <returns>Verdadero si el usuario existe, falso en caso contrario</returns>
        [HttpGet("validarUsuario")]
        public async Task<ActionResult<bool>> ValidarUsuario([FromQuery] string correo)
        {
            try
            {
                var usuarioEncontrado = await _DBContext.Usuarios
                    .AnyAsync(s => s.Correo == correo);

                return usuarioEncontrado;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al validar usuario: {ex.Message}");
            }
        }

        /// <summary>
        /// Método para insertar un nuevo usuario.
        /// </summary>
        /// <param name="usuario">Es el usuario a insertar</param>
        /// <returns>Verdadero si el usuario se insertó con éxito, falso en caso contrario</returns>
        [HttpPost("guardarUsuario")]
        public async Task<ActionResult<bool>> InsertUser([FromBody] UsuarioDTO usuario)
        {
            try
            {
                var newUser = new Usuario()
                {
                    Correo = usuario.Correo,
                    Fecha = usuario.Fecha,
                };

                _DBContext.Usuarios.Add(newUser);
                await _DBContext.SaveChangesAsync();
                var usuarioEncontrado = await _DBContext.Usuarios
                .AnyAsync(s => s.Correo == usuario.Correo);
                if (usuarioEncontrado)
                {
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
