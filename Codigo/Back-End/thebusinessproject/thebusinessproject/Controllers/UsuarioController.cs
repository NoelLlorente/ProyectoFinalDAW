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

        //[HttpGet("getUsuarios")]
        //public async Task<ActionResult<List<UsuarioDTO>>> GetUsuarios()
        //{
        //    var lista = await _DBContext.Usuarios.Select(
        //        s => new UsuarioDTO
        //        {
        //            Correo = s.Correo,

        //            Fecha = s.Fecha,
        //        }
        //    ).ToListAsync();

        //    if (lista.Count < 0)
        //    {
        //        return NotFound();
        //    }
        //    else
        //    {
        //        return lista;
        //    }
        //}

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
                // Manejar la excepción (por ejemplo, registrarla o devolver un error 500)
                return StatusCode(500, $"Error al validar usuario: {ex.Message}");
            }
        }

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
