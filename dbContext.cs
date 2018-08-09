using Microsoft.EntityFrameworkCore;

namespace ToDo
{
    public class dbContext : DbContext
    {
        public dbContext(DbContextOptions<dbContext> options) : base(options)
        {

        }

        public DbSet<ToDoItem> ToDoItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<ToDoItem>().ToTable("ToDoItems");
        }
    }
}