using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace ToDo
{
    public class dbContextFactory : IDesignTimeDbContextFactory<dbContext>
    {
        public dbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<dbContext>();
            optionsBuilder.UseSqlite("Data Source=ToDo.db");

            return new dbContext(optionsBuilder.Options);
        }
    }
}