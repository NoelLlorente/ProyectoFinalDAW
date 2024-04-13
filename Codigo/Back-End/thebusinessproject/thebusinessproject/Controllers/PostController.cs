using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using thebusinessproject.DTO;
using thebusinessproject.Entities;

namespace thebusinessproject.Controllers
{
    public class PostController : Controller
    {
        private readonly ThebusinessjourneyContext _DBContext;

        public PostController(ThebusinessjourneyContext DBContext)
        {
            _DBContext = DBContext;
        }

        [HttpGet("cargarPosts")]
        public async Task<ActionResult<List<PostDTO>>> GetPosts()
        {
            var posts = await _DBContext.Posts.Select(p => new PostDTO
            {
                Id = p.Id,
                Descripcion = p.Descripcion,
                Fecha = p.Fecha,
            }).ToListAsync();

            if (posts.Count < 0)
            {
                return NotFound();
            }
            else
            {
                return posts;
            }
        }

        [HttpGet("cargarPostUsuario")]
        public async Task<ActionResult<List<PostDTO>>> GetPostUsuario(string correo)
        {
            try
            {
                var postsUsuario = await _DBContext.UsuarioPosts.Where(p => p.IdUsuario == correo).Join(_DBContext.Posts, up => up.IdPost, u => u.Id, (up, u) => new PostDTO
                {
                    Descripcion = u.Descripcion,
                    Fecha = u.Fecha,
                    Id = u.Id,
                }).ToListAsync();


                if (postsUsuario.Count < 0)
                {
                    return NotFound();
                }
                else
                {
                    return postsUsuario;
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al obtener posts del usuario: {ex.Message}");
            }

        }

        [HttpGet("eliminarPost")]
        public async Task<ActionResult<bool>> EliminarPostUsuario(string correo, int idPost)
        {
            try
            {
                // Busca el ConsultumDTO con el correo y el ID coincidentes
                var postAEliminar = await _DBContext.UsuarioPosts
                    .Where(uc => uc.IdUsuario == correo && uc.IdPost == idPost)
                    .FirstOrDefaultAsync();

                if (postAEliminar != null)
                {
                    // Elimina el ConsultumDTO de la tabla UsuarioConsulta
                    _DBContext.UsuarioPosts.Remove(postAEliminar);

                    // Busca la Consulta asociada al ID
                    var consultaRelacionada = await _DBContext.Posts
                        .Where(c => c.Id == idPost)
                        .FirstOrDefaultAsync();

                    if (consultaRelacionada != null)
                    {
                        // Elimina la Consulta de la tabla Consulta
                        _DBContext.Posts.Remove(consultaRelacionada);
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
                return BadRequest($"Error al eliminar post: {ex.Message}");
            }
        }

        [HttpGet("crearPost")]
        public async Task<ActionResult<bool>> CrearConsulta(string correo, string descripcion, DateTime fecha)
        {
            try
            {
                var usuarioExiste = _DBContext.Usuarios.FirstOrDefaultAsync(u => u.Correo == correo);
                if (usuarioExiste.Result != null)
                {
                    // Crea una nueva consulta
                    var nuevoPost = new Post
                    {
                        Descripcion = descripcion,
                        Fecha = fecha,
                    };

                    // Agrega la consulta a la tabla Consulta
                    _DBContext.Posts.Add(nuevoPost);
                    await _DBContext.SaveChangesAsync();

                    // Crea una nueva entrada en UsuarioConsulta
                    var nuevaEntradaUsuarioPost = new UsuarioPost
                    {
                        IdUsuario = correo,
                        IdPost = nuevoPost.Id,
                    };

                    _DBContext.UsuarioPosts.Add(nuevaEntradaUsuarioPost);
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
