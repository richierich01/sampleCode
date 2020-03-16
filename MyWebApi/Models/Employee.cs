using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyWebAPI.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Column("First_Name")]
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public int Age { get; set; }

        public string Address { get; set; }

        public string Sex { get; set; }

        [Column(TypeName = "money")]
        public decimal Salary { get; set; }
    }
}
