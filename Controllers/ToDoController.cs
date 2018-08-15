using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using ToDo.Models;

namespace ToDo.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ToDoController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ToDoController> _logger;

        /// <summary>
        /// ToDo Controller
        /// </summary>
        /// <param name="context"></param>
        /// <param name="logger"></param>
        public ToDoController(ApplicationDbContext context, ILogger<ToDoController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Get all ToDo items
        /// </summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public List<ToDoItem> GetItems()
        {
            _logger.LogInformation("Get all todo items");
            List<ToDoItem> items = _context.ToDoItems
                .Where(x => !x.IsDeleted)
                .OrderBy(x => x.SortOrder)
                .ToList();
            return items;
        }

        /// <summary>
        /// Save ToDo items
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public IActionResult Save([FromBody] ToDoItem item)
        {
            _logger.LogInformation(string.Format(item.Name, item.Id, "Save item {0}({1})"));
            return UpsertItem(item);
        }

        /// <summary>
        /// Delete an item
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public IActionResult Delete([FromBody] ToDoItem item)
        {
            _logger.LogInformation(string.Format(item.Name, item.Id, "Delete item {0}({1})"));
            item.SortOrder = -1;
            return UpsertItem(item);
        }

        /// <summary>
        /// Update/Insert an item
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private IActionResult UpsertItem(ToDoItem item)
        {
            if (_context.ToDoItems.Any(x => x.Id == item.Id))
            {
                _context.Update(item);
            }
            else
            {
                item.SortOrder = _context.ToDoItems.Count();
                _context.Add(item);
            }

            try
            {

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
