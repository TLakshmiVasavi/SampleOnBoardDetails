using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace SampleOnBoardDetails.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private static readonly OnBoardingDetails[] onBoardingDetails = new[]
        {
            new OnBoardingDetails{ReqId=1,ReqType="CV",EmpId="1",UserName="Check",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur1",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(21)},
            new OnBoardingDetails{ReqId=2,ReqType="CV",EmpId="2",UserName="lakshmi",FirstName="Vasavi",LastName="adikamalla",Location="YPalem",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now},
            new OnBoardingDetails{ReqId=3,ReqType="CV",EmpId="3",UserName="lakshmi",FirstName="Vasavi",LastName="dikamalla",Location="Markapur3",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now},
            new OnBoardingDetails{ReqId=4,ReqType="CV",EmpId="4",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur4",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(41)},
            new OnBoardingDetails{ReqId=5,ReqType="CV",EmpId="5",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur5",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(71)},
            new OnBoardingDetails{ReqId=6,ReqType="CV",EmpId="6",UserName="lakshmi",FirstName="Vasavi",LastName="ikamalla",Location="Markapur6",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(51)},
            new OnBoardingDetails{ReqId=7,ReqType="CV",EmpId="7",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur7",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(11)},
            new OnBoardingDetails{ReqId=8,ReqType="CV",EmpId="8",UserName="lakshmi",FirstName="Vasavi",LastName="amalla",Location="Markapur8",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(61)},
            new OnBoardingDetails{ReqId=9,ReqType="CV",EmpId="9",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(13)},
            new OnBoardingDetails{ReqId=10,ReqType="CV",EmpId="10",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(31)},
            new OnBoardingDetails{ReqId=11,ReqType="CV",EmpId="11",UserName="lakshmi",FirstName="Vasavi",LastName="lla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(16)},
            new OnBoardingDetails{ReqId=12,ReqType="CV",EmpId="12",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(81)},
            new OnBoardingDetails{ReqId=13,ReqType="CV",EmpId="13",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(-91)},
            new OnBoardingDetails{ReqId=14,ReqType="CV",EmpId="14",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(91)},
            new OnBoardingDetails{ReqId=15,ReqType="CV",EmpId="15",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(10)},
            new OnBoardingDetails{ReqId=16,ReqType="CV",EmpId="16",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(31)},
            new OnBoardingDetails{ReqId=17,ReqType="CV",EmpId="17",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(61)},
            new OnBoardingDetails{ReqId=18,ReqType="CV",EmpId="18",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(12)},
            new OnBoardingDetails{ReqId=19,ReqType="CV",EmpId="19",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(16)},
            new OnBoardingDetails{ReqId=20,ReqType="CV",EmpId="20",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(19)},
            new OnBoardingDetails{ReqId=21,ReqType="CV",EmpId="21",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(16)},
            new OnBoardingDetails{ReqId=22,ReqType="CV",EmpId="22",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(51)},
            new OnBoardingDetails{ReqId=23,ReqType="CV",EmpId="23",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(18)},
            new OnBoardingDetails{ReqId=24,ReqType="CV",EmpId="24",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(15)},
            new OnBoardingDetails{ReqId=25,ReqType="CV",EmpId="25",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(10)},
            new OnBoardingDetails{ReqId=26,ReqType="CV",EmpId="26",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(-1)},
            new OnBoardingDetails{ReqId=27,ReqType="CV",EmpId="27",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(9)},
            new OnBoardingDetails{ReqId=28,ReqType="CV",EmpId="28",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur-4",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(8)},
            new OnBoardingDetails{ReqId=29,ReqType="CV",EmpId="29",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur-3",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(5)},
            new OnBoardingDetails{ReqId=30,ReqType="CV",EmpId="17",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur-2",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(3)},
            new OnBoardingDetails{ReqId=31,ReqType="CV",EmpId="17",UserName="lakshmi",FirstName="Vasavi",LastName="Tadikamalla",Location="Markapur-1",AccType="AD",StartDate=DateTime.Now ,DateCreated=DateTime.Now.AddDays(1)},
        };

        private readonly ILogger<EmployeeController> _logger;

        public EmployeeController(ILogger<EmployeeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<OnBoardingDetails> Get()
        {
            return onBoardingDetails;
        }
    }
}
