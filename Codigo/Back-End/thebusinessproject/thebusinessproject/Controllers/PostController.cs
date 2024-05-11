using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using thebusinessproject.DTO;
using thebusinessproject.Entities;

namespace thebusinessproject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : Controller
    {
        /// <summary>
        /// Declaración del Context de la DB. Se utiliza para realizar las operaciones con la db.
        /// </summary>
        private readonly ThebusinessjourneyContext _DBContext;

        /// <summary>
        /// Constructor que inicializa el contexto de la base de datos.
        /// </summary>
        /// <param name="DBContext">Es el contexto de la base de datos</param>
        public PostController(ThebusinessjourneyContext DBContext)
        {
            _DBContext = DBContext;
        }

        /// <summary>
        /// Método para obtener todos los posts.
        /// </summary>
        /// <returns>Todos los posts de la db</returns>
        [HttpGet("cargarPosts")]
        public async Task<ActionResult<List<PostDTO>>> GetPosts()
        {
            // Se obtienen todos los posts de la db
            var posts = await _DBContext.UsuarioPosts.Join(_DBContext.Posts, up => up.IdPost, p => p.Id, (up, p) => new { up, p })
         .ToListAsync();

            // Se crean los objetos que se van a devolver en el array
            var result = posts.Select(x =>
            {
                //Se obtiene todo el contenido que hay antes de la @ en el correo
                var nombreUsuario = x.up.IdUsuario.Split("@").First();
                return new PostDTO
                {
                    Id = x.p.Id,
                    Descripcion = x.p.Descripcion,
                    Fecha = x.p.Fecha,
                    Usuario = nombreUsuario
                };
            }).ToList();

            if (result.Count < 0)
            {
                return NotFound();
            }
            else
            {
                return result;
            }
        }

        /// <summary>
        /// Método para obtener los posts de un usuario específico.
        /// </summary>
        /// <param name="correo">Es el correo del usuario</param>
        /// <returns>Los posts del usuario</returns>
        [HttpGet("cargarPostsUsuario")]
        public async Task<ActionResult<List<PostDTO>>> GetPostUsuario(string correo)
        {
            try
            {
                //Se obtienen los posts de un usuario
                var postsUsuario = await _DBContext.UsuarioPosts.Where(p => p.IdUsuario == correo).Join(_DBContext.Posts, up => up.IdPost, u => u.Id, (up, u) => new { up, u })
                    .ToListAsync();

                //Acá se crean los objetos que vamos a devolver en el array
                var result = postsUsuario.Select(x =>
                {
                    //Se obtiene todo el contenido que hay antes de la @ en el correo
                    var nombreUsuario = correo.Split("@").First();
                    return new PostDTO
                    {
                        Descripcion = x.u.Descripcion,
                        Fecha = x.u.Fecha,
                        Id = x.u.Id,
                        Usuario = nombreUsuario
                    };
                }).ToList();

                if (result.Count < 0)
                {
                    return NotFound();
                }
                else
                {
                    return result;
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al obtener posts del usuario: {ex.Message}");
            }

        }

        /// <summary>
        /// Método para eliminar un post específico de un usuario.
        /// </summary>
        /// <param name="correo">Es el correo del usuario</param>
        /// <param name="idPost">Es el id de post a eliminar</param>
        /// <returns>Se retorna true si se ha eliminado, sino false</returns>
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


        /// <summary>
        /// Método para eliminar todos los posts de un usuario.
        /// </summary>
        /// <param name="correo">Es el correo del usuario</param>
        /// <returns>True si se han eliminado todos los posts del usuario, false en caso contrario</returns>
        [HttpGet("eliminarPosts")]
        public async Task<ActionResult<bool>> EliminarPostsUsuario(string correo)
        {
            try
            {
                // Busca las consultas con el correo coincidente
                var postsEliminar = await _DBContext.UsuarioPosts
                    .Where(uc => uc.IdUsuario == correo)
                    .ToListAsync();

                if (postsEliminar.Any())
                {           
                    // Busca las consultas asociadas al ID de usuario
                    var postsRelacionados = await _DBContext.Posts
                        .Where(c => postsEliminar.Select(uc => uc.IdPost).Contains(c.Id))
                        .ToListAsync();

                    if (postsRelacionados.Any())
                    {
                        // Elimina las consultas de la tabla Consulta
                        _DBContext.Posts.RemoveRange(postsRelacionados);
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
                return BadRequest($"Error al eliminar Posts: {ex.Message}");
            }
        }

        /// <summary>
        /// Método para crear un nuevo post.
        /// </summary>
        /// <param name="correo">Es el correo del usuario</param>
        /// <param name="post">Es el nuevo post que se va a almacenar en la db</param>
        /// <returns>El nuevo post creado</returns>
        [HttpPost("crearPost")]
        public async Task<ActionResult<PostDTO>> CrearConsulta(string correo, [FromBody] PostDTO post)
        {
            try
            {
                var usuarioExiste = _DBContext.Usuarios.FirstOrDefaultAsync(u => u.Correo == correo);
                if (usuarioExiste.Result != null)
                {
                    // Crea una nueva consulta
                    var nuevoPost = new Post
                    {
                        Descripcion = post.Descripcion,
                        Fecha = post.Fecha,
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

                    var nombreUsuario = correo.Split("@")[0];

                    return new PostDTO
                    {
                        Id = nuevoPost.Id,
                        Descripcion = nuevoPost.Descripcion,
                        Fecha = nuevoPost.Fecha,
                        Usuario = nombreUsuario
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
        /// Método para actualizar un post existente.
        /// </summary>
        /// <param name="correo">Es el correo del usuario</param>
        /// <param name="idPost">Es el id del post a actualizar</param>
        /// <param name="descripcion">Es la nueva descripción del post</param>
        /// <returns>El post actualizado</returns>
        [HttpPost("actualizarPost")]
        public async Task<ActionResult<PostDTO>> ActualizarPost(string correo, int idPost, [FromBody] string descripcion)
        {
            try
            {
                // Busca el post con el correo y el ID coincidentes
                var postAActualizar = await _DBContext.UsuarioPosts
                    .Where(up => up.IdUsuario == correo && up.IdPost == idPost)
                    .Join(_DBContext.Posts, up => up.IdPost, p => p.Id, (up, p) => p)
                    .FirstOrDefaultAsync();

                if (postAActualizar != null)
                {
                    // Actualiza la descripción del post
                    postAActualizar.Descripcion = descripcion;

                    // Guarda los cambios en la base de datos
                    await _DBContext.SaveChangesAsync();

                    var nombreUsuario = correo.Split("@")[0];

                    return new PostDTO
                    {
                        Id = postAActualizar.Id,
                        Descripcion = postAActualizar.Descripcion,
                        Fecha = postAActualizar.Fecha,
                        Usuario = nombreUsuario,
                    };
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al actualizar post: {ex.Message}");
            }
        }
    }
}

