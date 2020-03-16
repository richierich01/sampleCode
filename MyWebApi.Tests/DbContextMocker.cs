using Microsoft.EntityFrameworkCore;
using MyWebAPI.Models;

namespace MyWebApi.Tests
{
    public static class DbContextMocker
    {
        public static MyDBContext GetMyDbContext(string dbName)
        {
            // Create options for DbContext instance
            var options = new DbContextOptionsBuilder<MyDBContext>()
                .UseInMemoryDatabase(databaseName: dbName)
                .Options;

            // Create instance of DbContext
            var dbContext = new MyDBContext(options);

            // Add entities in memory
            dbContext.Seed();

            return dbContext;
        }
    }
}
