using Xunit;
using System.Threading.Tasks;
using MyWebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using MyWebAPI.Models;
using System.Linq;

namespace MyWebApi.Tests
{
    public class EmployeeControllerUnitTest
    {
       
        [Fact]
        public async void Task_GetEmployee_Return_OkResult()
        {
            //Arrange  
            var dbContext = DbContextMocker.GetMyDbContext(nameof(Task_GetEmployee_Return_OkResult));
            var controller = new EmployeesController(dbContext);

            //Act  
            var data = await controller.GetEmployees();

            //Assert  
            Assert.Equal( 3, data.Value.Count());
        }

        [Fact]
        public async void Task_GeEmployeeById_Return_OkResult()
        {
            //Arrange  
            var dbContext = DbContextMocker.GetMyDbContext(nameof(Task_GeEmployeeById_Return_OkResult));
            var controller = new EmployeesController(dbContext);
            var id = 2;

            //Act  
            var data = await controller.GetEmployee(id);

            //Assert  
            Assert.Equal(id, data.Value.Id);
        }

        [Fact]
        public async void Task_DeleteEmployeeById_Return_OkResult()
        {
            //Arrange  
            var dbContext = DbContextMocker.GetMyDbContext(nameof(Task_DeleteEmployeeById_Return_OkResult));
            var controller = new EmployeesController(dbContext);
            var id = 2;

            //Act  
            var data = await controller.DeleteEmployee(id);

            //Assert  
            Assert.Equal(id, data.Value.Id);
        }

        [Fact]
        public async void Task_Add_ValidData_Return_OkResult()
        {
            //Arrange  
            var dbContext = DbContextMocker.GetMyDbContext(nameof(Task_Add_ValidData_Return_OkResult));
            var controller = new EmployeesController(dbContext);
            var employee = new Employee() { FirstName="New", LastName="Person", Address="New Address", Age = 90, Email = "person@hotmail.com", Salary = 12345.90m, Sex="Male",  Id=4};

            //Act  
            var data = await controller.PostEmployee(employee);

            //Assert  
            //Assert.Equal(4, data.Value.Id);
            Assert.IsType<CreatedAtActionResult>(data.Result);
        }
    }
}