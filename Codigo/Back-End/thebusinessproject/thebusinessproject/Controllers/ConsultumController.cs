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
        /// <summary>
        /// Declaración del Context de la DB. Se utiliza para realizar las operaciones con la db.
        /// </summary>
        private readonly ThebusinessjourneyContext _DBContext;


        /// <summary>
        /// Constructor que inicializa el contexto de la base de datos.
        /// </summary>
        /// <param name="DBContext">Es el contexto de la db</param>
        public ConsultumController(ThebusinessjourneyContext DBContext)
        {
            _DBContext = DBContext;
        }
  
        /// <summary>
        /// Método para eliminar una consulta específica de un usuario.
        /// </summary>
        /// <param name="correo">Es el correo del usuario</param>
        /// <param name="idConsulta">Es el id de la consulta a eliminar</param>
        /// <returns>Devuelve true si se ha eliminado correctamente, sino false.</returns>
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
                    // Busca el ResultadoConsultum asociado a la Consulta
                    var resultadoAEliminar = await _DBContext.ResultadoConsulta
                        .Where(rc => rc.Idconsulta == idConsulta)
                        .FirstOrDefaultAsync();

                    if (resultadoAEliminar != null)
                    {
                        // Elimina el ResultadoConsultum de la tabla ResultadoConsultum
                        _DBContext.ResultadoConsulta.Remove(resultadoAEliminar);
                    }

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

        /// <summary>
        /// Método para eliminar todas las consultas de un usuario.
        /// </summary>
        /// <param name="correo">Es el correo del usuario</param>
        /// <returns>Devuelve true si todo ha ido bien, sino false</returns>
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
                    // Busca los ResultadoConsultum asociados a las consultas
                    var resultadosAEliminar = await _DBContext.ResultadoConsulta
                        .Where(rc => consultasAEliminar.Select(uc => uc.IdConsulta).Contains(rc.Idconsulta))
                        .ToListAsync();

                    if (resultadosAEliminar.Any())
                    {
                        // Elimina los ResultadoConsultum de la tabla ResultadoConsultum
                        _DBContext.ResultadoConsulta.RemoveRange(resultadosAEliminar);
                    }

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

        /// <summary>
        /// Método para crear una nueva consulta.
        /// </summary>
        /// <param name="correo">Es el correo del usuario</param>
        /// <param name="consulta">Es el objeto que tiene los datos de la consulta a crear</param>
        /// <returns>La consulta creado</returns>
        [HttpPost("crearConsulta")]
        public async Task<ActionResult<ConsultaDTO>?> CrearConsulta(string correo, [FromBody] ConsultaDTO consulta)
        {
            try
            {
                var usuarioExiste = await _DBContext.Usuarios.FirstOrDefaultAsync(u => u.Correo == correo);

                if (usuarioExiste != null)
                {
                    // Crea una nueva consulta
                    var nuevaConsulta = new Consultum
                    {
                        Descripcion = consulta.Descripcion,
                        Presupuesto = consulta.Presupuesto,
                        Tipo = consulta.Tipo,
                        Fecha = consulta.Fecha
                    };

                    // Agrega la consulta a la tabla Consulta
                    _DBContext.Consulta.Add(nuevaConsulta);

                    // Guarda los cambios y acepta las modificaciones de la base de datos
                    await _DBContext.SaveChangesAsync(acceptAllChangesOnSuccess: true);

                    // Crea una nueva UsuarioConsultum
                    var nuevaUsuarioConsultum = new UsuarioConsultum
                    {
                        IdUsuario = correo,
                        IdConsulta = nuevaConsulta.Id
                    };

                    // Agrega la UsuarioConsultum a la tabla UsuarioConsulta
                    _DBContext.UsuarioConsulta.Add(nuevaUsuarioConsultum);

                    // Guarda los cambios
                    await _DBContext.SaveChangesAsync();

                    // Retorna la consulta creada, incluyendo el id generado por la base de datos
                    return new ConsultaDTO
                    {
                        Id = nuevaConsulta.Id,
                        Descripcion = nuevaConsulta.Descripcion,
                        Presupuesto = nuevaConsulta.Presupuesto,
                        Tipo = nuevaConsulta.Tipo,
                        Fecha = nuevaConsulta.Fecha
                    };
                }

                return null;
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al crear consulta: {ex.Message}");
            }
        }

        /// <summary>
        /// Método para obtener todas las consultas y sus resultados de un usuario en concreto.
        /// </summary>
        /// <param name="correo">Es el correo del usuario</param>
        /// <returns>Las consultas con sus respectivos resultados</returns>
        [HttpGet("getConsultasYResultadosUsuario")]
        public async Task<ActionResult<List<ConsultaDTO>>> ConsultasYResultadosUsuario(string correo)
        {
            try
            {
                // Se obtiene las consultas de un usuario dado un correo, cada consulta con su resultado.
                var consultasUsuario =  _DBContext.UsuarioConsulta
                    .Where(u => u.IdUsuario == correo) 
                    .Join(_DBContext.Consulta, uc => uc.IdConsulta, c => c.Id, (uc, c) => c)
                    .Include(c => c.ResultadoConsultum)
                    .Select(c => new ConsultaDTO
                    {
                        Id = c.Id,
                        Descripcion = c.Descripcion,
                        Presupuesto = c.Presupuesto,
                        Tipo = c.Tipo,
                        Fecha = c.Fecha,
                        ResultadoConsulta = c.ResultadoConsultum != null ? new ResultadoConsultaDTO
                        {
                            IdresultadoConsulta = c.ResultadoConsultum.IdresultadoConsulta,
                            Resultado = c.ResultadoConsultum.Resultado,
                            Idconsulta = c.ResultadoConsultum.Idconsulta,
                        } : null
                    }).ToList();

                return consultasUsuario;
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al obtener consultas y resultados del usuario: {ex.Message}");
            }
        }
    }
}
