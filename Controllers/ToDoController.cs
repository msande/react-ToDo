using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using ToDo;

namespace react.Controllers
{
    [Route("api/[controller]")]
    public class ToDoController : Controller
    {
        private readonly dbContext _context;
        private readonly ILogger<ToDoController> _logger;

        /// <summary>
        /// ToDo Controller
        /// </summary>
        /// <param name="context"></param>
        /// <param name="logger"></param>
        public ToDoController(dbContext context, ILogger<ToDoController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Get all ToDo items
        /// </summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public List<ToDoItem> Get()
        {
            _logger.LogInformation("Get all todo items");
            List<ToDoItem> items = _context.ToDoItems.ToList();
            return items;
        }

        /// <summary>
        /// Save ToDo items
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public IActionResult Save([FromBody] List<ToDoItem> items)
        {
            _logger.LogInformation("Save all todo items");

            try
            {
                _context.UpdateRange(items);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                _logger.LogError(ex.InnerException.ToString());
                _logger.LogError(ex.StackTrace);
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            return Ok();
        }
    }
}
