using Microsoft.EntityFrameworkCore;

namespace MyWebAPI.Models
{
    public class MyDBContext : DbContext
    {
        public MyDBContext(DbContextOptions<MyDBContext> options)
             : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
    }
}
