namespace ToDo.Models
{
    /// <summary>
    /// ToDo item
    /// </summary>
    public class ToDoItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int SortOrder { get; set; }
        public bool IsDeleted { get; set; }
    }
}