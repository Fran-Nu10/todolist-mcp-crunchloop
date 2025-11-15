using System.ComponentModel.DataAnnotations;
namespace TodoApi.Models
{
   
    public class TodoItem
    {
        
        public long Id { get; set; }

        public long ListId { get; set; }

        
        public TodoList? List { get; set; }

        
        [Required]
        public string Description { get; set; } = string.Empty;

        
       
        public bool IsCompleted { get; set; } = false;

       
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }
    }
}
