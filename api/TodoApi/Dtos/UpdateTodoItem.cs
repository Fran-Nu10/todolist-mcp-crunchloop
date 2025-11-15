using System.ComponentModel.DataAnnotations;

namespace TodoApi.Dtos
{
   
    public class UpdateTodoItem
    {
    
        [Required]
        public string Description { get; set; } = string.Empty;
    }
}
