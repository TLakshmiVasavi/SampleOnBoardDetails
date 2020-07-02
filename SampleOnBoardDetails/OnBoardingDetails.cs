using System;

namespace SampleOnBoardDetails
{
    public class OnBoardingDetails
    {
        public int ReqId { get; set; }
            public string ReqType { get; set; }
        public string EmpId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Location { get; set; }
        public string AccType { get; set; }
        public DateTime StartDate { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
