using MyWebAPI.Models;

namespace MyWebApi.Tests
{
    public static class DbContextExtension
    {
        public static void Seed(this MyDBContext dbContext)
        {
            dbContext.Employees.Add(new Employee
            {
                FirstName = "Adam",
                LastName = "Smith",
                Address = "12 Street",
                Age = 78,
                Salary = 123456.90m,
                Email = "adam@hotmail.com",
                Id = 1,
                Sex = "Male"
            });

            dbContext.Employees.Add(new Employee
            {
                FirstName = "Paul",
                LastName = "Smith",
                Address = "12 Street",
                Age = 78,
                Salary = 123456.90m,
                Email = "adam@hotmail.com",
                Id = 2,
                Sex = "Male"
            });

            dbContext.Employees.Add(new Employee
            {
                FirstName = "Janny",
                LastName = "Smith",
                Address = "12 Street",
                Age = 78,
                Salary = 123456.90m,
                Email = "adam@hotmail.com",
                Id = 3,
                Sex = "Female"
            });

            dbContext.SaveChanges();
        }
    }
}
