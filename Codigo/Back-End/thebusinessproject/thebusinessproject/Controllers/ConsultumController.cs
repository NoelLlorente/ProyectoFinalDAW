using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using thebusinessproject.DTO;
using thebusinessproject.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace thebusinessproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultumController : ControllerBase
    {
        private readonly ThebusinessjourneyContext _DBContext;

        public ConsultumController(ThebusinessjourneyContext DBContext)
        {
            _DBContext = DBContext;
        }

        [HttpGet("getConsultasUsuario")]
        public async Task<ActionResult<List<ConsultumDTO>>> consultasUsuario(string correo)
        {
            try
            {
                var consultasUsuario = await _DBContext.UsuarioConsulta.Where(u => u.IdUsuario == correo).Join(_DBContext.Consulta, uc => uc.IdConsulta,
                c => c.Id, (uc, c) => new ConsultumDTO
                {
                    Id = c.Id,
                    Descripcion = c.Descripcion,
                    Fecha = c.Fecha,
                }).ToListAsync();



                if (consultasUsuario.Count < 0)
                {
                    return NotFound();
                }
                else
                {
                    return consultasUsuario;
                }

            }
            catch (Exception ex)
            {
                return BadRequest($"Error al obtener consultas del usuario: {ex.Message}");
            }
        }

        [HttpGet("eliminarConsulta")]
        public async Task<ActionResult<bool>> EliminarConsultaUsuario(string correo, int idConsulta)
        {
            try
            {
                // Busca el ConsultumDTO con el correo y el ID coincidentes
                var consultaAEliminar = await _DBContext.UsuarioConsulta
                    .Where(uc => uc.IdUsuario == correo && uc.IdConsulta == idConsulta)
                    .FirstOrDefaultAsync();

                if (consultaAEliminar != null)
                {
                    // Elimina el ConsultumDTO de la tabla UsuarioConsulta
                    _DBContext.UsuarioConsulta.Remove(consultaAEliminar);

                    // Busca la Consulta asociada al ID
                    var consultaRelacionada = await _DBContext.Consulta
                        .Where(c => c.Id == idConsulta)
                        .FirstOrDefaultAsync();

                    if (consultaRelacionada != null)
                    {
                        // Elimina la Consulta de la tabla Consulta
                        _DBContext.Consulta.Remove(consultaRelacionada);
                    }

                    await _DBContext.SaveChangesAsync();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al eliminar consulta: {ex.Message}");
            }
        }

        [HttpGet("eliminarConsultas")]
        public async Task<ActionResult<bool>> EliminarConsultasUsuario(string correo)
        {
            try
            {
                // Busca las consultas con el correo coincidente
                var consultasAEliminar = await _DBContext.UsuarioConsulta
                    .Where(uc => uc.IdUsuario == correo)
                    .ToListAsync();

                if (consultasAEliminar.Any())
                {
                    // Elimina las consultas de la tabla UsuarioConsulta
                    _DBContext.UsuarioConsulta.RemoveRange(consultasAEliminar);

                    // Busca las consultas asociadas al ID de usuario
                    var consultasRelacionadas = await _DBContext.Consulta
                        .Where(c => consultasAEliminar.Select(uc => uc.IdConsulta).Contains(c.Id))
                        .ToListAsync();

                    if (consultasRelacionadas.Any())
                    {
                        // Elimina las consultas de la tabla Consulta
                        _DBContext.Consulta.RemoveRange(consultasRelacionadas);
                    }

                    await _DBContext.SaveChangesAsync();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al eliminar consultas: {ex.Message}");
            }
        }

        [HttpGet("crearConsulta")]
        public async Task<ActionResult<bool>> CrearConsulta(string correo, string descripcion, DateTime fecha)
        {
            try
            {

                var usuarioExiste = _DBContext.Usuarios.FirstOrDefaultAsync(u => u.Correo == correo);

                if (usuarioExiste.Result != null)
                {
                    // Crea una nueva consulta
                    var nuevaConsulta = new Consultum
                    {
                        Descripcion = descripcion,
                        Fecha = fecha,
                    };

                    // Agrega la consulta a la tabla Consulta
                    _DBContext.Consulta.Add(nuevaConsulta);
                    await _DBContext.SaveChangesAsync();

                    // Crea una nueva entrada en UsuarioConsulta
                    var nuevaEntradaUsuarioConsulta = new UsuarioConsultum
                    {
                        IdUsuario = correo,
                        IdConsulta = nuevaConsulta.Id,
                    };

                    _DBContext.UsuarioConsulta.Add(nuevaEntradaUsuarioConsulta);
                    await _DBContext.SaveChangesAsync();

                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al crear consulta: {ex.Message}");
            }
        }
    }
}
