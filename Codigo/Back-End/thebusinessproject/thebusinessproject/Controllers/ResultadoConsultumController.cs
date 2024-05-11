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
        /// <summary>
        /// Declaración del Context de la DB. Se utiliza para realizar las operaciones con la db.
        /// </summary>
        private readonly ThebusinessjourneyContext _DBContext;

        /// <summary>
        /// Constructor que inicializa el contexto de la base de datos.
        /// </summary>
        /// <param name="DBContext">Es el contexto de la base de datos</param>
        public ResultadoConsultumController(ThebusinessjourneyContext DBContext)
        {
            _DBContext = DBContext;
        }

        /// <summary>
        /// Método para crear un resultado para una consulta.
        /// </summary>
        /// <param name="resultado">Es el objeto que contiene los datos del resultado que va a almacenar en la db</param>
        /// <returns>El resultado que se ha almacenado en la db</returns>
        [HttpPost("crearResultadoConsulta")]
        public async Task<ActionResult<ResultadoConsultaDTO>?> CrearConsulta([FromBody] ResultadoConsultaDTO resultado)
        {
            try
            {
                var consultaExiste = await _DBContext.ResultadoConsulta.FirstOrDefaultAsync(u => u.Idconsulta == resultado.Idconsulta);

                if (consultaExiste == null)
                {
                    // Crea una nueva consulta
                    var nuevoResultadoConsulta = new ResultadoConsultum
                    {
                        Resultado = resultado.Resultado,
                        Idconsulta = resultado.Idconsulta,
                    };

                    // Agrega la consulta a la tabla Consulta
                    _DBContext.ResultadoConsulta.Add(nuevoResultadoConsulta);
                    await _DBContext.SaveChangesAsync(acceptAllChangesOnSuccess: true);

                    // Se retorna un objeto DTO que contiene los datos del resultado de la consulta
                    return new ResultadoConsultaDTO
                    {
                        IdresultadoConsulta = nuevoResultadoConsulta.IdresultadoConsulta,
                        Resultado = nuevoResultadoConsulta.Resultado,
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
