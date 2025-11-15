using System.ComponentModel.DataAnnotations;

namespace TodoApi.Dtos
{
	
	public class CreateTodoItem
	{
		
		[Required]
		public string Description { get; set; } = string.Empty;
	}
}
