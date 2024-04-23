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

        //[HttpGet("getConsultasUsuario")]
        //public async Task<ActionResult<List<ConsultumDTO>>> consultasUsuario(string correo)
        //{
        //    try
        //    {
        //        var consultasUsuario = await _DBContext.UsuarioConsulta.Where(u => u.IdUsuario == correo).Join(_DBContext.Consulta, uc => uc.IdConsulta,
        //        c => c.Id, (uc, c) => new ConsultumDTO
        //        {
        //            Id = c.Id,
        //            Descripcion = c.Descripcion,
        //            Presupuesto = c.Presupuesto,
        //            Tipo = c.Tipo,
        //            Fecha = c.Fecha,
        //        }).ToListAsync();



        //        if (consultasUsuario.Count < 0)
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            return consultasUsuario;
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest($"Error al obtener consultas del usuario: {ex.Message}");
        //    }
        //}

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


        [HttpPost("crearConsulta")]
        public async Task<ActionResult<ConsultumDTO>?> CrearConsulta(string correo, [FromBody] ConsultumDTO consulta)
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
                    return new ConsultumDTO
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

        [HttpGet("getConsultasYResultadosUsuario")]
        public async Task<ActionResult<List<ConsultumDTO>>> ConsultasYResultadosUsuario(string correo)
        {
            try
            {
                var consultasUsuario = await _DBContext.UsuarioConsulta
                    .Where(u => u.IdUsuario == correo) // Asegúrate de que 'Usuario' es la propiedad correcta que tiene el correo electrónico
                    .Join(_DBContext.Consulta, uc => uc.IdConsulta, c => c.Id, (uc, c) => c)
                    .Include(c => c.ResultadoConsulta)
                    .Select(c => new ConsultumDTO
                    {
                        Id = c.Id,
                        Descripcion = c.Descripcion,
                        Presupuesto = c.Presupuesto,
                        Tipo = c.Tipo,
                        Fecha = c.Fecha,
                        ResultadoConsultum = c.ResultadoConsulta.Select(rc => new ResultadoConsultumDTO
                        {
                            IdresultadoConsulta = rc.IdresultadoConsulta,
                            Pasos = rc.Pasos,
                            PresupuestoEstimado = rc.PresupuestoEstimado,
                            Probabilidad = rc.Probabilidad,
                        }).ToList()
                    })
                    .ToListAsync();

              
                   return consultasUsuario;
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al obtener consultas y resultados del usuario: {ex.Message}");
            }
        }
    }
}
