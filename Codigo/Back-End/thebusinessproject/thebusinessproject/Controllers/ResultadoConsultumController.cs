using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using thebusinessproject.DTO;
using thebusinessproject.Entities;

namespace thebusinessproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultadoConsultumController : Controller
    {

        private readonly ThebusinessjourneyContext _DBContext;

        public ResultadoConsultumController(ThebusinessjourneyContext DBContext)
        {
            _DBContext = DBContext;
        }


        [HttpPost("crearResultadoConsulta")]
        public async Task<ActionResult<ResultadoConsultumDTO>?> CrearConsulta([FromBody] ResultadoConsultumDTO resultado)
        {
            try
            {
                var consultaExiste = await _DBContext.ResultadoConsulta.FirstOrDefaultAsync(u => u.Idconsulta == resultado.Idconsulta);

                if (consultaExiste == null)
                {
                    // Crea una nueva consulta
                    var nuevoResultadoConsulta = new ResultadoConsultum
                    {
                        Pasos = resultado.Pasos,
                        PresupuestoEstimado = resultado.PresupuestoEstimado,
                        Probabilidad = resultado.Probabilidad,
                        Idconsulta = resultado.Idconsulta,
                    };

                    // Agrega la consulta a la tabla Consulta
                    _DBContext.ResultadoConsulta.Add(nuevoResultadoConsulta);
                    await _DBContext.SaveChangesAsync(acceptAllChangesOnSuccess: true);

                    return new ResultadoConsultumDTO
                    {
                        IdresultadoConsulta = nuevoResultadoConsulta.IdresultadoConsulta,
                        Pasos = nuevoResultadoConsulta.Pasos,
                        PresupuestoEstimado = nuevoResultadoConsulta.PresupuestoEstimado,
                        Probabilidad = nuevoResultadoConsulta.Probabilidad,
                        Idconsulta = nuevoResultadoConsulta.Idconsulta
                    };
                }

                return null;
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al crear resultado consulta: {ex.Message}");
            }
        }
    }
}
