using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/todolists/{listId}/items")]
    public class TodoItemsController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoItemsController(TodoContext context)
        {
            _context = context;
        }

        // POST: api/todolists/{listId}/items
        [HttpPost]
        public async Task<ActionResult<TodoItem>> CreateItem(long listId, [FromBody] TodoItemCreateDto dto)
        {
            var list = await _context.TodoList.FindAsync(listId);
            if (list == null)
                return NotFound($"No existe la lista con ID {listId}");

            var item = new TodoItem
            {
                ListId = listId,
                Description = dto.Description,
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow
            };

            _context.TodoItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetItem), new { listId = listId, itemId = item.Id }, item);
        }

        // GET individual item
        [HttpGet("{itemId}")]
        public async Task<ActionResult<TodoItem>> GetItem(long listId, long itemId)
        {
            var item = await _context.TodoItems
                .FirstOrDefaultAsync(i => i.Id == itemId && i.ListId == listId);

            if (item == null)
                return NotFound();

            return Ok(item);
        }

        // PATCH: api/todolists/{listId}/items/{itemId}
        [HttpPatch("{itemId}")]
        public async Task<ActionResult<TodoItem>> UpdateItem(long listId, long itemId, [FromBody] TodoItemUpdateDto dto)
        {
            var item = await _context.TodoItems
                .FirstOrDefaultAsync(i => i.Id == itemId && i.ListId == listId);

            if (item == null)
                return NotFound();

            item.Description = dto.Description;
            item.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(item);
        }

        // POST: completar item
        [HttpPost("{itemId}/complete")]
        public async Task<ActionResult<TodoItem>> CompleteItem(long listId, long itemId)
        {
            var item = await _context.TodoItems
                .FirstOrDefaultAsync(i => i.Id == itemId && i.ListId == listId);

            if (item == null)
                return NotFound();

            item.IsCompleted = true;
            item.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(item);
        }

        // DELETE
        [HttpDelete("{itemId}")]
        public async Task<IActionResult> DeleteItem(long listId, long itemId)
        {
            var item = await _context.TodoItems
                .FirstOrDefaultAsync(i => i.Id == itemId && i.ListId == listId);

            if (item == null)
                return NotFound();

            _context.TodoItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public class TodoItemCreateDto
    {
        public string Description { get; set; } = string.Empty;
    }

    public class TodoItemUpdateDto
    {
        public string Description { get; set; } = string.Empty;
    }
}
